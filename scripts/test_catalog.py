"""Behavioral checks for public boundaries and generated catalog integrity."""
import json
import contextlib
import io
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch
import build


class CatalogTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='public-catalog-test-')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        for folder in ['familias', 'comportamentos', 'use-cases']:
            (self.root/folder).mkdir()
        self.policy = {'schema_version': 1, 'classification': 'public', 'familias': ['alpha'],
                       'comportamentos': ['focus'], 'use_cases': ['webapps']}
        (self.root/'publicacao.json').write_text(json.dumps(self.policy))
        (self.root/'anti-slop.md').write_text('- Proibido: exemplo fictício.\n')
        self.family = self.root/'familias/alpha.md'
        self.family.write_text('''---
familia: alpha
formula: tipo x espaço
status: candidato
autoria: propria
use_cases: [webapps]
keywords: [tipo, espaço]
---
# Alpha

Referência fictícia.

## Tokens
```json
{"bg":"#eeeeee","display":"Georgia,serif","radius":2}
```
''')
        (self.root/'comportamentos/focus.md').write_text('---\ncomportamento: focus\nfamilias: [alpha]\n---\n# Focus\n\nFixture.\n')
        (self.root/'use-cases/webapps.md').write_text('---\nuse_case: webapps\nfamilias_permitidas: [alpha]\n---\n# Webapps\n\nFixture.\n')

    def generate(self, check=False):
        with patch.object(build, 'ROOT', str(self.root)), patch('sys.argv', ['build.py'] + (['--check'] if check else [])):
            with contextlib.redirect_stdout(io.StringIO()):
                build.main()

    def test_digest_is_reproducible_and_changes_with_source(self):
        self.generate()
        initial = (self.root/'api/index.json').read_bytes()
        self.generate(check=True)
        self.generate()
        self.assertEqual(initial, (self.root/'api/index.json').read_bytes())
        self.family.write_text(self.family.read_text() + '\nNova observação fictícia.\n')
        with self.assertRaises(ValueError):
            self.generate(check=True)
        self.assertEqual(initial, (self.root/'api/index.json').read_bytes())
        self.generate()
        self.assertNotEqual(initial, (self.root/'api/index.json').read_bytes())

    def test_undeclared_markdown_is_not_published(self):
        (self.root/'familias/not-selected.md').write_text('Não é fonte autorizada.\n')
        self.generate()
        self.assertFalse((self.root/'api/familias/not-selected.json').exists())

    def test_identifier_traversal_is_rejected_before_outputs(self):
        self.family.write_text(self.family.read_text().replace('familia: alpha', 'familia: ../outside'))
        with self.assertRaises(ValueError):
            self.generate()
        self.assertFalse((self.root/'app').exists())

    def test_duplicate_policy_is_rejected(self):
        self.policy['familias'].append('alpha')
        (self.root/'publicacao.json').write_text(json.dumps(self.policy))
        with self.assertRaises(ValueError):
            self.generate()

    def test_source_symlink_is_rejected(self):
        fixture = self.root/'outside.md';fixture.write_text('Fixture.\n')
        self.family.unlink();self.family.symlink_to(fixture)
        with self.assertRaises(ValueError):
            self.generate()

    def test_output_symlink_is_not_overwritten(self):
        (self.root/'app').mkdir()
        outside=self.root/'outside.txt';outside.write_text('Keep fixture.\n')
        (self.root/'app/manifest.json').symlink_to(outside)
        with self.assertRaises(ValueError):
            self.generate()
        self.assertEqual(outside.read_text(), 'Keep fixture.\n')

    def test_stale_generated_family_is_removed_only_on_build(self):
        self.generate()
        stale=self.root/'api/familias/old.json';stale.write_text('{}')
        keep=self.root/'api/familias/note.md';keep.write_text('Keep fixture.\n')
        with self.assertRaises(ValueError):
            self.generate(check=True)
        self.assertTrue(stale.exists())
        self.generate()
        self.assertFalse(stale.exists())
        self.assertTrue(keep.exists())

    def test_invalid_tokens_and_cross_references_fail_closed(self):
        original=self.family.read_text()
        self.family.write_text(original.replace('#eeeeee', 'url(example)'))
        with self.assertRaises(ValueError):
            self.generate()
        self.family.write_text(original.replace('use_cases: [webapps]', 'use_cases: [missing]'))
        with self.assertRaises(ValueError):
            self.generate()


class LintBoundaryTests(unittest.TestCase):
    def test_lint_missing_sensitive_and_symlink_targets(self):
        cli=Path(__file__).with_name('dl.py')
        with tempfile.TemporaryDirectory(prefix='lint-boundary-test-') as temp:
            root=Path(temp).resolve()
            allowed=root/'example.css';allowed.write_text('h1{color:#123456}')
            secret=root/'.env.fixture';secret.write_text('fictional fixture')
            link=root/'link.css';link.symlink_to(allowed)
            for target, expected in [(root/'missing.css',2),(secret,2),(link,2),(allowed,0)]:
                p=subprocess.run(['python3',str(cli),'lint',str(target)],capture_output=True)
                self.assertEqual(p.returncode,expected)


if __name__=='__main__':
    unittest.main()
