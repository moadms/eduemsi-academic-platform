#!/usr/bin/env python3
"""
Render all PUML files in docs/uml/functional/ to PNG via Kroki.io API
"""
import os
import glob
import urllib.request
import time
import sys

BASE_DIR = r"c:\Users\hp\Documents\Emsi-project"
FUNCTIONAL_DIR = os.path.join(BASE_DIR, "docs", "uml", "functional")
ASSETS_DIR = os.path.join(BASE_DIR, "assets", "diagrams")
KROKI_URL = "https://kroki.io/plantuml/png"

os.makedirs(ASSETS_DIR, exist_ok=True)
os.makedirs(FUNCTIONAL_DIR, exist_ok=True)

files = sorted(glob.glob(os.path.join(FUNCTIONAL_DIR, "*.puml")))
print(f"Found {len(files)} PUML files to render")
print("=" * 60)

success = 0
failed = []

for puml_path in files:
    name = os.path.splitext(os.path.basename(puml_path))[0]
    out_local = os.path.join(FUNCTIONAL_DIR, name + ".png")
    out_global = os.path.join(ASSETS_DIR, name + ".png")
    
    print(f"  [RENDER] {name} ...", end=" ", flush=True)
    
    try:
        with open(puml_path, "rb") as f:
            content = f.read()
        
        req = urllib.request.Request(
            KROKI_URL,
            data=content,
            headers={
                "Content-Type": "text/plain; charset=utf-8",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "image/png"
            }
        )
        
        with urllib.request.urlopen(req, timeout=30) as resp:
            png_data = resp.read()
        
        with open(out_local, "wb") as f:
            f.write(png_data)
        with open(out_global, "wb") as f:
            f.write(png_data)
        
        size_kb = len(png_data) // 1024
        print(f"OK ({size_kb}KB)")
        success += 1
        time.sleep(0.8)  # Rate limit courtesy
        
    except Exception as e:
        print(f"FAILED: {e}")
        failed.append((name, str(e)))
        time.sleep(1.0)

print()
print("=" * 60)
print(f"Success: {success}/{len(files)}")
if failed:
    print(f"Failed: {len(failed)}")
    for name, err in failed:
        print(f"   - {name}: {err}")
else:
    print("All diagrams rendered OK!")

print("\nFiles saved to:")
print(f"  Local: {FUNCTIONAL_DIR}")
print(f"  Global: {ASSETS_DIR}")
