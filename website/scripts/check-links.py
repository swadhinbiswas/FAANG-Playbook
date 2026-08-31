import os, re, json, sys

dist = 'dist'
pages = []
for root, dirs, files in os.walk(dist):
    for f in files:
        if f.endswith('.html'):
            pages.append(os.path.join(root, f))

# Build map of valid paths (without trailing index.html)
valid = set()
for root, dirs, files in os.walk(dist):
    for f in files:
        p = os.path.join(root, f).replace('\\','/')
        rel = '/' + p[len(dist)+1:]
        valid.add(rel)
        if f == 'index.html':
            valid.add('/' + root[len(dist)+1:])
            if root[len(dist)+1:] == '':
                valid.add('/')
        else:
            valid.add(rel)

broken = {}
link_count = 0
skip_ext = ('.png','.jpg','.jpeg','.svg','.webp','.ico','.gif','.webmanifest','.xml','.csv','.json','.txt','.pdf')
for page in pages:
    html = open(page, encoding='utf-8', errors='ignore').read()
    src = '/' + page[len(dist)+1:].replace('/index.html','').replace('index.html','') or '/'
    for m in re.finditer(r'href="([^"]+)"', html):
        href = m.group(1)
        if href.startswith(('http://','https://','mailto:','tel:','javascript:','data:')):
            continue
        if href.startswith('#'):
            continue
        link_count += 1
        path = href.split('#')[0].split('?')[0]
        if not path:
            continue
        if path.endswith(skip_ext):
            continue
        if path.startswith('//'):
            continue
        if not path.startswith('/'):
            path = os.path.normpath(os.path.join(os.path.dirname(src), path))
        # normalize trailing slash
        candidate = path if path.endswith('/') else path
        ok = candidate in valid or path in valid
        if not ok:
            broken.setdefault(src, []).append(href)

print(f"pages: {len(pages)}  links checked: {link_count}")
if not broken:
    print("NO BROKEN LINKS")
else:
    for src, links in sorted(broken.items()):
        for l in sorted(set(links)):
            print(f"{src} -> {l}")
    print(f"TOTAL BROKEN: {sum(len(set(v)) for v in broken.values())} on {len(broken)} pages")
