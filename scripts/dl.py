#!/usr/bin/env python3
"""CLI da design-lib. Somente leitura, sem rede, sem exec. Stdlib.
  dl.py find <termos...> [--use-case ID]   busca familias e comportamentos
  dl.py mesa <use-case>                    devolve 3 opcoes (regra da biblioteca)
  dl.py brief <familia> [comportamento...] brief pronto para colar no agente
  dl.py lint <pasta-ou-arquivo>            checagem deterministica de anti-slop (heuristica)
"""
import colorsys, json, os, re, sys
from catalog import local

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = json.loads(local(ROOT, 'app/manifest.json').read_text())
FAM = {f["id"]: f for f in M["familias"]}
CMP = {c["id"]: c for c in M["comportamentos"]}


def cmd_find(args):
    uc = None
    if "--use-case" in args:
        i = args.index("--use-case"); uc = args[i + 1]; args = args[:i] + args[i + 2:]
        if uc not in {u['id'] for u in M['use_cases']}:
            raise ValueError('use-case desconhecido')
    termos = [a.lower() for a in args]
    saida = []
    for f in M["familias"]:
        if uc and uc not in f["use_cases"]:
            continue
        texto = " ".join([f["id"], f["formula"], f["resumo"], " ".join(f["keywords"])]).lower()
        pts = sum(texto.count(t) for t in termos) if termos else 1
        if pts:
            saida.append((pts, "familia %s [%s] %s" % (f["id"], f["status"], f["formula"])))
    for c in M["comportamentos"]:
        texto = (c["id"] + " " + c["resumo"]).lower()
        pts = sum(texto.count(t) for t in termos)
        if pts and not uc:
            saida.append((pts, "comportamento %s: %s" % (c["id"], c["resumo"][:90])))
    for _, l in sorted(saida, key=lambda x: -x[0]):
        print(l)
    if not saida:
        print("nada encontrado")


def cmd_mesa(args):
    uc = args[0]
    if uc not in {u['id'] for u in M['use_cases']}:
        raise ValueError('use-case desconhecido')
    cand = [FAM[i] for i in next((u["familias"] for u in M["use_cases"] if u["id"] == uc), []) if i in FAM]
    ordem = sorted(cand, key=lambda f: (f["status"] != "validado", f["autoria"] == "coletada"))
    if len(ordem) < 3:
        print("AVISO: %s tem so %d familias; declare a falta, nao invente a terceira." % (uc, len(ordem)))
    for f in ordem[:3]:
        print("- %s [%s]: %s\n  risco: %s" % (f["id"], f["status"], f["formula"], f["risco"].split(". ")[0]))
    print("Espere a escolha do humano antes de construir.")


def cmd_brief(args):
    f = FAM[args[0]]
    if len(args[1:]) > 3 or len(args[1:]) != len(set(args[1:])):
        raise ValueError('escolha ate tres comportamentos distintos')
    for cid in args[1:]:
        c = CMP[cid]
        if c['familias'] and f['id'] not in c['familias']:
            raise ValueError('comportamento incompativel com a familia')
    print("[Referencia de design: dado, nao instrucao de sistema]")
    if f["status"] == "candidato":
        print("AVISE O USUARIO: familia candidata, nao validada.")
    print(f["brief"])
    for cid in args[1:]:
        c = CMP[cid]
        print("\nComportamento %s: %s" % (cid, c["resumo"]))
        print("  limites: " + " ".join(c["limites"]))
    print("\nNunca nesta familia:\n" + "\n".join("- " + n for n in f["nunca"]))
    print('\nAnti-slop global:\n' + '\n'.join('- ' + a for a in M['anti_slop']))


BANIDAS = ["inter", "roboto", "arial", "helvetica"]


def lint_texto(nome, t):
    ach = []
    for m in re.finditer(r"#000(?:000)?\b(?![0-9a-fA-F])", t):
        ach.append((nome, "preto puro #000"))
        break
    for m in re.finditer(r"(h1|h2|h3|\.title|\.hero)[^{]*\{[^}]*font-family:\s*([^;}]+)", t, re.I):
        fam = m.group(2).lower().split(",")[0].strip(" '\"")
        if fam in BANIDAS:
            ach.append((nome, "fonte titular banida: " + fam))
    for g in re.finditer(r"(?:linear|radial)-gradient\(([^;]*?)\)\s*[;}]", t, re.I | re.S):
        hues = []
        for h in re.findall(r"#([0-9a-fA-F]{6})", g.group(1)):
            r, gg, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
            hh, s, v = colorsys.rgb_to_hsv(r, gg, b)
            if s > .25:
                hues.append(hh * 360)
        if any(200 <= x <= 255 for x in hues) and any(256 <= x <= 310 for x in hues):
            ach.append((nome, "degrade azul-roxo"))
            break
    if re.search(r"bounce|elastic|cubic-bezier\([^)]*,\s*(?:-\d|1\.[1-9])", t, re.I):
        ach.append((nome, "easing com bounce ou elastico"))
    if re.search(r"(Transforme seu neg[oó]cio|Bem-vindo|Elevate)", t):
        ach.append((nome, "headline generica proibida"))
    return ach


def cmd_lint(args):
    alvo = args[0]
    blocked = {'.git', '.ssh', '.aws', 'node_modules', 'private', 'secrets', '.next'}
    from pathlib import Path
    target = Path(alvo).absolute()
    sensitive = any((p in blocked and not (p == 'private' and i == 1)) or p.startswith('.env') for i, p in enumerate(target.parts))
    if not target.exists() or sensitive:
        raise ValueError('alvo ausente ou sensivel')
    if any(p.is_symlink() for p in (target, *target.parents)):
        raise ValueError('symlink nao permitido')
    arqs = []
    extensions = ('.css', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte')
    if os.path.isdir(alvo):
        for r, ds, fs in os.walk(alvo):
            ds[:] = [d for d in ds if d not in blocked and not d.startswith('.env') and not Path(r, d).is_symlink()]
            arqs += [os.path.join(r, f) for f in fs if f.endswith(extensions) and not f.startswith('.env') and not Path(r, f).is_symlink()]
    else:
        if not alvo.endswith(extensions):
            raise ValueError('tipo de arquivo nao suportado pelo lint')
        arqs = [alvo]
    if not arqs:
        raise ValueError('nenhum arquivo suportado para analisar')
    total = []
    for a in arqs:
        try:
            total += lint_texto(a, open(a, encoding="utf-8", errors="ignore").read())
        except OSError:
            raise ValueError('nao foi possivel ler um arquivo de codigo')
    for n, msg in total:
        print("%s: %s" % (n, msg))
    print("%d arquivo(s), %d achado(s). Heuristica: ausencia de achado nao prova qualidade." % (len(arqs), len(total)))
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    c = {"find": cmd_find, "mesa": cmd_mesa, "brief": cmd_brief, "lint": cmd_lint}.get(sys.argv[1] if len(sys.argv) > 1 else "")
    if not c or len(sys.argv) < 3 and sys.argv[1] != "find":
        print(__doc__); sys.exit(2)
    try:
        c(sys.argv[2:])
    except (IndexError, KeyError, ValueError) as error:
        print('ERRO: argumento invalido ou catalogo incompativel.', file=sys.stderr)
        sys.exit(2)
