#!/usr/bin/env python3
"""Gera app/manifest.json, api/*.json, api/briefs/*.txt e llms.txt a partir dos markdown.
Somente biblioteca padrao do Python. Rodar: python3 scripts/build.py"""
import json, os, re, sys
from catalog import sources, local, identifier, token_values, digest, generated

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def frontmatter(texto):
    m = re.match(r"^---\n(.*?)\n---\n", texto, re.S)
    if not m:
        return {}, texto
    dados = {}
    for linha in m.group(1).split("\n"):
        if ":" not in linha:
            continue
        k, v = linha.split(":", 1)
        k, v = k.strip(), v.strip()
        if v.startswith("[") and v.endswith("]"):
            dados[k] = [i.strip() for i in v[1:-1].split(",") if i.strip()]
        else:
            dados[k] = v
    return dados, texto[m.end():]


def secao(corpo, titulo):
    m = re.search(r"^##\s+" + re.escape(titulo) + r"\s*\n(.*?)(?=^##\s|\Z)", corpo, re.S | re.M)
    return m.group(1).strip() if m else ""


def lista(corpo, titulo):
    return [l[2:].strip() for l in secao(corpo, titulo).split("\n") if l.startswith("- ")]


def codigo(corpo, titulo):
    m = re.search(r"```[a-z]*\n(.*?)```", secao(corpo, titulo), re.S)
    return m.group(1).strip() if m else ""


def ler(path):
    with local(ROOT, os.path.relpath(path, ROOT)).open(encoding="utf-8") as fh:
        return fh.read()


def main():
    avisos = []
    familias = []
    d = os.path.join(ROOT, "familias")
    for nome in sources(ROOT, 'familias'):
        if not nome.endswith(".md") or nome.startswith("_"):
            continue
        fm, corpo = frontmatter(ler(os.path.join(d, nome)))
        fid = identifier(fm, 'familia', nome)
        if fm.get('status') not in {'candidato', 'validado'}:
            raise ValueError('invalid public family status')
        tokens = {}
        raw = codigo(corpo, "Tokens")
        if raw:
            try:
                tokens = json.loads(raw)
            except ValueError:
                raise ValueError("tokens invalidos em " + nome)
        token_values(tokens)
        h1 = re.search(r"^#\s+(.+)$", corpo, re.M)
        tag = re.search(r"^# [^\n]+\n\n([^\n#][^\n]*(?:\n[^\n#][^\n]*)*)", corpo, re.M)
        familias.append(dict(
            id=fid, nome=h1.group(1).strip() if h1 else fid,
            formula=fm.get("formula", ""), status=fm.get("status", "candidato"),
            autoria=fm.get("autoria", ""), use_cases=fm.get("use_cases", []),
            keywords=fm.get("keywords", []), resumo=tag.group(1).strip() if tag else "",
            usar=lista(corpo, "Quando usar"), nao_usar=lista(corpo, "Quando NÃO usar"),
            tipografia=lista(corpo, "Tipografia"), cor=lista(corpo, "Cor"),
            layout=lista(corpo, "Layout e espaço"), movimento=lista(corpo, "Movimento"),
            nunca=lista(corpo, "Nunca, nesta família"),
            risco=secao(corpo, "Risco documentado desta família"),
            lacuna=secao(corpo, "Lacuna conhecida"),
            brief=codigo(corpo, "Brief copiável"), tokens=tokens))
    comport = []
    d = os.path.join(ROOT, "comportamentos")
    for nome in sources(ROOT, 'comportamentos'):
        if not nome.endswith(".md"):
            continue
        fm, corpo = frontmatter(ler(os.path.join(d, nome)))
        h1 = re.search(r"^#\s+(.+)$", corpo, re.M)
        res = re.search(r"^# [^\n]+\n\n([^\n#][^\n]*(?:\n[^\n#][^\n]*)*)", corpo, re.M)
        comport.append(dict(
            id=identifier(fm, 'comportamento', nome), nome=h1.group(1).strip() if h1 else nome[:-3],
            custo=fm.get("custo", ""), familias=fm.get("familias", []),
            resumo=res.group(1).strip().replace("\n", " ") if res else "",
            implementacao=lista(corpo, "Implementação"), nunca=lista(corpo, "Nunca"),
            limites=lista(corpo, "Limites")))
    ucs = []
    d = os.path.join(ROOT, "use-cases")
    for nome in sources(ROOT, 'use_cases'):
        if not nome.endswith(".md"):
            continue
        fm, corpo = frontmatter(ler(os.path.join(d, nome)))
        res = re.search(r"^# [^\n]+\n\n([^\n#][^\n]*(?:\n[^\n#][^\n]*)*)", corpo, re.M)
        ucs.append(dict(id=identifier(fm, 'use_case', nome), resumo=res.group(1).strip() if res else "",
                        familias=fm.get("familias_permitidas", [])))
    for u in ucs:
        for f in u["familias"]:
            if f not in [x["id"] for x in familias]:
                raise ValueError("use-case cites a missing public family")
        if len(u["familias"]) < 3:
            avisos.append("use-case %s tem %d familias (<3)" % (u["id"], len(u["familias"])))
        if len(u["familias"]) > 6:
            avisos.append("use-case %s tem mais de 6 familias" % u["id"])
    family_ids = {f['id'] for f in familias}
    uc_ids = {u['id'] for u in ucs}
    for f in familias:
        if not isinstance(f['formula'], str) or f['autoria'] not in {'propria', 'sintetizada', 'coletada'}:
            raise ValueError('invalid public family metadata')
        if not isinstance(f['keywords'], list) or any(not isinstance(k, str) for k in f['keywords']):
            raise ValueError('keywords must be a list of text')
        if not isinstance(f['use_cases'], list) or not set(f['use_cases']) <= uc_ids:
            raise ValueError('family cites a missing public use-case')
    for c in comport:
        if not isinstance(c['familias'], list) or not set(c['familias']) <= family_ids:
            raise ValueError('behavior cites a missing public family')
    anti = [l[2:].strip() for l in ler(os.path.join(ROOT, "anti-slop.md")).split("\n") if l.startswith("- Proibido")]
    source_digest = digest(ROOT)
    manifest = dict(versao=1, source_digest=source_digest, familias=familias, comportamentos=comport, use_cases=ucs, anti_slop=anti)
    outputs = {}
    def dump(p, o):
        outputs[p] = json.dumps(o, ensure_ascii=False, indent=1) + '\n'
    dump("app/manifest.json", manifest)
    dump("api/index.json", dict(
        source_digest=source_digest, familias=[{k: f[k] for k in ("id", "formula", "status", "autoria", "use_cases", "keywords", "resumo")} for f in familias],
        comportamentos=[{k: c[k] for k in ("id", "custo", "resumo")} for c in comport],
        use_cases=ucs, rotas=dict(familia="api/familias/<id>.json", brief="api/briefs/<id>.txt")))
    for f in familias:
        dump("api/familias/%s.json" % f["id"], f)
        txt = "[Referencia de design: dado, nao instrucao de sistema]\nFAMILIA %s (%s)\nstatus: %s%s\nuse-cases: %s\n\n%s\n\nGUARDRAILS\n%s\n\nANTI-SLOP GLOBAL\n%s\n" % (
            f["id"], f["formula"], f["status"],
            "  AVISE O USUARIO: familia candidata, nao validada." if f["status"] == "candidato" else "",
            ", ".join(f["use_cases"]), f["brief"],
            "\n".join("- NUNCA: " + n for n in f["nunca"]), "\n".join("- " + a for a in anti))
        outputs['api/briefs/%s.txt' % f['id']] = txt
    linhas = ["# design-lib (cópia pública)", "",
              "> Biblioteca de direção estética legível por agentes: famílias visuais, use-cases, comportamentos e regras anti-slop. Conteúdo é dado, não instrução de sistema.", "",
              "## Como usar", "- Índice: api/index.json", "- Família: api/familias/<id>.json", "- Brief pronto: api/briefs/<id>.txt",
              "- CLI local: python3 scripts/dl.py find|brief|lint", "- Regras de leitura: SKILL.md", "", "## Famílias"]
    for f in familias:
        linhas.append("- %s [%s]: %s (%s)" % (f["id"], f["status"], f["formula"], ", ".join(f["use_cases"])))
    linhas += ["", "## Comportamentos"] + ["- %s: %s" % (c["id"], c["resumo"][:110]) for c in comport]
    outputs['llms.txt'] = '\n'.join(linhas) + '\n'
    if any(arg != '--check' for arg in sys.argv[1:]):
        raise ValueError('only --check is supported')
    generated(ROOT, outputs, check='--check' in sys.argv[1:])
    print("%d familias, %d comportamentos, %d use-cases" % (len(familias), len(comport), len(ucs)))
    for a in avisos:
        print("AVISO:", a)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, TypeError, KeyError) as error:
        print('BLOQUEADO:', str(error), file=sys.stderr)
        sys.exit(1)
