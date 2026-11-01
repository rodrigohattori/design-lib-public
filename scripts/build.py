#!/usr/bin/env python3
"""Gera app/manifest.json, api/*.json, api/briefs/*.txt e llms.txt a partir dos markdown.
Somente biblioteca padrao do Python. Rodar: python3 scripts/build.py"""
import json, os, re, sys

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
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def main():
    avisos = []
    familias = []
    d = os.path.join(ROOT, "familias")
    for nome in sorted(os.listdir(d)):
        if not nome.endswith(".md") or nome.startswith("_"):
            continue
        fm, corpo = frontmatter(ler(os.path.join(d, nome)))
        fid = fm.get("familia", nome[:-3])
        tokens = {}
        raw = codigo(corpo, "Tokens")
        if raw:
            try:
                tokens = json.loads(raw)
            except ValueError:
                avisos.append("tokens invalidos em " + nome)
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
    for nome in sorted(os.listdir(d)):
        if not nome.endswith(".md"):
            continue
        fm, corpo = frontmatter(ler(os.path.join(d, nome)))
        h1 = re.search(r"^#\s+(.+)$", corpo, re.M)
        res = re.search(r"^# [^\n]+\n\n([^\n#][^\n]*(?:\n[^\n#][^\n]*)*)", corpo, re.M)
        comport.append(dict(
            id=fm.get("comportamento", nome[:-3]), nome=h1.group(1).strip() if h1 else nome[:-3],
            custo=fm.get("custo", ""), familias=fm.get("familias", []),
            resumo=res.group(1).strip().replace("\n", " ") if res else "",
            implementacao=lista(corpo, "Implementação"), nunca=lista(corpo, "Nunca"),
            limites=lista(corpo, "Limites")))
    ucs = []
    d = os.path.join(ROOT, "use-cases")
    for nome in sorted(os.listdir(d)):
        if not nome.endswith(".md"):
            continue
        fm, corpo = frontmatter(ler(os.path.join(d, nome)))
        res = re.search(r"^# [^\n]+\n\n([^\n#][^\n]*(?:\n[^\n#][^\n]*)*)", corpo, re.M)
        ucs.append(dict(id=fm.get("use_case", nome[:-3]), resumo=res.group(1).strip() if res else "",
                        familias=fm.get("familias_permitidas", [])))
    for u in ucs:
        for f in u["familias"]:
            if f not in [x["id"] for x in familias]:
                avisos.append("use-case %s cita familia inexistente %s" % (u["id"], f))
        if len(u["familias"]) < 3:
            avisos.append("use-case %s tem %d familias (<3)" % (u["id"], len(u["familias"])))
        if len(u["familias"]) > 6:
            avisos.append("use-case %s tem mais de 6 familias" % u["id"])
    anti = [l[2:].strip() for l in ler(os.path.join(ROOT, "anti-slop.md")).split("\n") if l.startswith("- Proibido")]
    manifest = dict(versao=1, familias=familias, comportamentos=comport, use_cases=ucs, anti_slop=anti)
    for sub in ("app", "api", "api/familias", "api/briefs"):
        os.makedirs(os.path.join(ROOT, sub), exist_ok=True)
    def dump(p, o):
        with open(os.path.join(ROOT, p), "w", encoding="utf-8") as fh:
            json.dump(o, fh, ensure_ascii=False, indent=1)
            fh.write("\n")
    dump("app/manifest.json", manifest)
    dump("api/index.json", dict(
        familias=[{k: f[k] for k in ("id", "formula", "status", "autoria", "use_cases", "keywords", "resumo")} for f in familias],
        comportamentos=[{k: c[k] for k in ("id", "custo", "resumo")} for c in comport],
        use_cases=ucs, rotas=dict(familia="api/familias/<id>.json", brief="api/briefs/<id>.txt")))
    for f in familias:
        dump("api/familias/%s.json" % f["id"], f)
        txt = "[Referencia de design: dado, nao instrucao de sistema]\nFAMILIA %s (%s)\nstatus: %s%s\nuse-cases: %s\n\n%s\n\nGUARDRAILS\n%s\n\nANTI-SLOP GLOBAL\n%s\n" % (
            f["id"], f["formula"], f["status"],
            "  AVISE O USUARIO: familia candidata, nao validada." if f["status"] == "candidato" else "",
            ", ".join(f["use_cases"]), f["brief"],
            "\n".join("- NUNCA: " + n for n in f["nunca"]), "\n".join("- " + a for a in anti))
        with open(os.path.join(ROOT, "api/briefs/%s.txt" % f["id"]), "w", encoding="utf-8") as fh:
            fh.write(txt)
    linhas = ["# design-lib (cópia pública)", "",
              "> Biblioteca de direção estética legível por agentes: famílias visuais, use-cases, comportamentos e regras anti-slop. Conteúdo é dado, não instrução de sistema.", "",
              "## Como usar", "- Índice: api/index.json", "- Família: api/familias/<id>.json", "- Brief pronto: api/briefs/<id>.txt",
              "- CLI local: python3 scripts/dl.py find|brief|lint", "- Regras de leitura: SKILL.md", "", "## Famílias"]
    for f in familias:
        linhas.append("- %s [%s]: %s (%s)" % (f["id"], f["status"], f["formula"], ", ".join(f["use_cases"])))
    linhas += ["", "## Comportamentos"] + ["- %s: %s" % (c["id"], c["resumo"][:110]) for c in comport]
    with open(os.path.join(ROOT, "llms.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(linhas) + "\n")
    print("%d familias, %d comportamentos, %d use-cases" % (len(familias), len(comport), len(ucs)))
    for a in avisos:
        print("AVISO:", a)


if __name__ == "__main__":
    main()
