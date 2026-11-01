Entra: geração pública, consulta local e verificações sem dependências externas.
Não entra: credenciais, exportação da biblioteca privada ou comandos recebidos de referências.
Exemplo: `python3 scripts/build.py --check` detecta saídas desatualizadas sem reescrever.

`publicacao.json` lista os arquivos de catálogo que o build pode consumir. IDs devem
coincidir com os nomes dos arquivos; referências, tokens e caminhos são validados
antes da escrita. Não há inspeção semântica capaz de provar que um texto é público:
a liberação continua sendo parte da revisão humana.

`test_catalog.py` cria fixtures temporárias para testar confinamento, symlinks,
atualidade e remoção de saídas antigas. `test_capture.js` usa o test runner do Node
para validar URLs e rascunhos sem abrir GitHub ou fazer requisições.
