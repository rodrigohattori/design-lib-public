"""Explicit public inputs and confined, deterministic generated outputs."""
import hashlib
import json
from pathlib import Path
import re

SLUG = re.compile(r'[a-z][a-z0-9]*(?:-[a-z0-9]+)*\Z')
GROUPS = {'familias': 'familias', 'comportamentos': 'comportamentos', 'use_cases': 'use-cases'}


def slug(value):
    if not isinstance(value, str) or not SLUG.fullmatch(value):
        raise ValueError('invalid catalog identifier')
    return value


def local(root, relative):
    root = Path(root)
    rel = Path(relative)
    if rel.is_absolute() or '..' in rel.parts:
        raise ValueError('path outside catalog')
    path = root
    for part in rel.parts:
        path = path / part
        if path.is_symlink():
            raise ValueError('symlink is not a public source or generated output')
    if not path.resolve().is_relative_to(root.resolve()):
        raise ValueError('path outside catalog')
    return path


def policy(root):
    data = json.loads(local(root, 'publicacao.json').read_text())
    if data.get('schema_version') != 1 or data.get('classification') != 'public':
        raise ValueError('public publication policy required')
    for key in GROUPS:
        values = data.get(key)
        if not isinstance(values, list) or not values or any(not isinstance(v, str) for v in values):
            raise ValueError('invalid public source list')
        if len(values) != len(set(values)):
            raise ValueError('duplicate public identifier')
        for value in values:
            slug(value)
    return data


def sources(root, group):
    data = policy(root)
    return [value + '.md' for value in sorted(data[group])]


def digest(root):
    data = policy(root)
    names = ['publicacao.json', 'anti-slop.md']
    names += [f'{folder}/{value}.md' for key, folder in GROUPS.items() for value in data[key]]
    result = hashlib.sha256()
    for name in sorted(names):
        content = local(root, name).read_bytes()
        result.update(name.encode() + b'\0' + str(len(content)).encode() + b'\0' + content)
    return result.hexdigest()


def identifier(meta, key, filename):
    value = slug(meta.get(key, filename[:-3]))
    if value != filename[:-3]:
        raise ValueError('identifier must match its public filename')
    return value


def token_values(tokens):
    if not isinstance(tokens, dict):
        raise ValueError('tokens must be an object')
    for key, value in tokens.items():
        if key in {'bg', 'surface', 'ink', 'muted', 'accent', 'accent2', 'line'}:
            if not isinstance(value, str) or not re.fullmatch(r'#[0-9a-fA-F]{6}', value):
                raise ValueError('invalid color token')
        elif key in {'display', 'body', 'mono'}:
            if not isinstance(value, str) or not re.fullmatch(r'''[A-Za-z0-9 ,"'\-]+''', value):
                raise ValueError('invalid font token')
        elif key in {'radius', 'base'}:
            if type(value) not in (float, int) or not 0 <= value <= 100:
                raise ValueError('invalid numeric token')
        elif key not in {'mood', 'derived'}:
            raise ValueError('unknown token')


def generated(root, outputs, check=False):
    # Preflight every path before any mutation. Only these API folders are pruned.
    targets = {name: local(root, name) for name in outputs}
    stale = []
    for folder, suffix in [('api/familias', '.json'), ('api/briefs', '.txt')]:
        directory = local(root, folder)
        if directory.exists():
            for path in directory.iterdir():
                if path.suffix == suffix:
                    slug(path.stem)
                    local(root, str(path.relative_to(root)))
                    if not path.is_file():
                        raise ValueError('invalid generated file')
                    if str(path.relative_to(root)) not in outputs:
                        stale.append(path)
    different = [name for name, path in targets.items() if not path.is_file() or path.read_text() != outputs[name]]
    if check:
        if different or stale:
            raise ValueError('generated catalog is stale; run scripts/build.py')
        return
    for name, path in targets.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(outputs[name], encoding='utf-8')
    for path in stale:
        path.unlink()
