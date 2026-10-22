#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Construit une démo du site en UN SEUL fichier HTML (pour l'aperçu en ligne)."""

import base64
import glob
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
MAIN = os.path.join(ROOT, "src", "main.jsx")
DIST = os.path.join(ROOT, "dist")
OUT = os.path.join(ROOT, "demo-prestige-tours.html")

original = open(MAIN, encoding="utf-8").read()
try:
    patched = original.replace("BrowserRouter", "HashRouter")
    open(MAIN, "w", encoding="utf-8").write(patched)
    env = {**os.environ, "ARTIFACT": "1"}
    subprocess.run(["npm", "run", "build:client"], cwd=ROOT, check=True,
                   stdout=subprocess.DEVNULL, env=env)
finally:
    open(MAIN, "w", encoding="utf-8").write(original)

css = "".join(open(f, encoding="utf-8").read() for f in glob.glob(os.path.join(DIST, "assets", "*.css")))
js = "".join(open(f, encoding="utf-8").read() for f in glob.glob(os.path.join(DIST, "assets", "*.js")))

# ---- images -> data URI ----------------------------------------------------
imgmap = {}
for path in glob.glob(os.path.join(DIST, "images", "*.svg")):
    name = os.path.basename(path)
    data = base64.b64encode(open(path, "rb").read()).decode()
    imgmap[f"/images/{name}"] = f"data:image/svg+xml;base64,{data}"
for name in ("logo-badge.png", "logo-badge@2x.png"):
    p = os.path.join(DIST, name)
    if os.path.exists(p):
        data = base64.b64encode(open(p, "rb").read()).decode()
        imgmap[f"/{name}"] = f"data:image/png;base64,{data}"

import json
IMGMAP = json.dumps(imgmap)

shim = """
<script>
(function () {
  var MAP = __IMGMAP__;
  function fix(img) {
    var s = img.getAttribute('src') || '';
    // le .jpg n'existe pas dans la demo : on bascule tout de suite sur le .svg
    if (s.indexOf('/images/') === 0 && /\\.jpg$/.test(s)) s = s.replace(/\\.jpg$/, '.svg');
    if (MAP[s]) { img.src = MAP[s]; img.removeAttribute('srcset'); }
  }
  function sweep(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.tagName === 'IMG') fix(node);
    var list = node.querySelectorAll ? node.querySelectorAll('img') : [];
    for (var i = 0; i < list.length; i++) fix(list[i]);
  }
  new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'attributes') fix(m.target);
      for (var j = 0; j < m.addedNodes.length; j++) sweep(m.addedNodes[j]);
    }
  }).observe(document.documentElement, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['src']
  });
  document.addEventListener('DOMContentLoaded', function () { sweep(document.body); });
  sweep(document.documentElement);
})();
</script>
""".replace("__IMGMAP__", IMGMAP)

theme = """
<script>
try {
  var saved = localStorage.getItem("ptm-theme");
  var dark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (dark) { document.documentElement.classList.add("dark"); document.documentElement.style.colorScheme = "dark"; }
} catch (e) {}
</script>
"""

html = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    + theme
    + "<style>\n" + css + "\n</style>\n"
    + shim
    + '<div id="root"></div>\n'
    + '<script type="module">\n' + js + "\n</script>\n"
)

open(OUT, "w", encoding="utf-8").write(html)
print(f"{OUT}  —  {len(html)/1024:.0f} Ko")
