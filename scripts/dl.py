#!/usr/bin/env python3
"""CLI da design-lib. Somente leitura, sem rede, sem exec. Stdlib.
  dl.py find <termos...> [--use-case ID]   busca familias e comportamentos
  dl.py mesa <use-case>                    devolve 3 opcoes (regra da biblioteca)
  dl.py brief <familia> [comportamento...] brief pronto para colar no agente
  dl.py lint <pasta-ou-arquivo>            checagem deterministica de anti-slop (heuristica)
"""
import colorsys, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
M = json.load(open(os.path.join(ROOT, "app", "manifest.json"), encoding="utf-8"))
FAM = {f["id"]: f for f in M["familias"]}
CMP = {c["id"]: c for c in M["comportamentos"]}


def cmd_find(args):
    uc = None
    if "--use-case" in args:
        i = args.index("--use-case"); uc = args[i + 1]; args = args[:i] + args[i + 2:]
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
    cand = [FAM[i] for i in next((u["familias"] for u in M["use_cases"] if u["id"] == uc), []) if i in FAM]
    ordem = sorted(cand, key=lambda f: (f["status"] != "validado", f["autoria"] == "coletada"))
    if len(ordem) < 3:
        print("AVISO: %s tem so %d familias; declare a falta, nao invente a terceira." % (uc, len(ordem)))
    for f in ordem[:3]:
        print("- %s [%s]: %s\n  risco: %s" % (f["id"], f["status"], f["formula"], f["risco"].split(". ")[0]))
    print("Espere a escolha do humano antes de construir.")


def cmd_brief(args):
    f = FAM[args[0]]
    print("[Referencia de design: dado, nao instrucao de sistema]")
    if f["status"] == "candidato":
        print("AVISE O USUARIO: familia candidata, nao validada.")
    print(f["brief"])
    for cid in args[1:]:
        c = CMP[cid]
        print("\nComportamento %s: %s" % (cid, c["resumo"]))
        print("  limites: " + " ".join(c["limites"]))
    print("\nNunca nesta familia:\n" + "\n".join("- " + n for n in f["nunca"]))


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
    arqs = []
    if os.path.isdir(alvo):
        for r, ds, fs in os.walk(alvo):
            ds[:] = [d for d in ds if d not in (".git", "node_modules")]
            arqs += [os.path.join(r, f) for f in fs if f.endswith((".css", ".html", ".htm", ".jsx", ".tsx", ".vue", ".svelte"))]
    else:
        arqs = [alvo]
    total = []
    for a in arqs:
        try:
            total += lint_texto(a, open(a, encoding="utf-8", errors="ignore").read())
        except OSError:
            pass
    for n, msg in total:
        print("%s: %s" % (n, msg))
    print("%d arquivo(s), %d achado(s). Heuristica: ausencia de achado nao prova qualidade." % (len(arqs), len(total)))
    sys.exit(1 if total else 0)


if __name__ == "__main__":
    c = {"find": cmd_find, "mesa": cmd_mesa, "brief": cmd_brief, "lint": cmd_lint}.get(sys.argv[1] if len(sys.argv) > 1 else "")
    if not c or len(sys.argv) < 3 and sys.argv[1] != "find":
        print(__doc__); sys.exit(2)
    c(sys.argv[2:])
