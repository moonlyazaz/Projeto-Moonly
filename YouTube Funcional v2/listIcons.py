# -*- coding: utf-8 -*-
import re

with open('frontend/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

icons = re.findall(r'class="(fa-\w+ fa-[\w-]+)"', html)
for ic in set(icons):
    print(ic)
