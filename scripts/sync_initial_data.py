"""
Sync portfolioData.json → initialData.js

The React app actually imports initialData.js (bundled at build time).
The .json file is used for reference and GitHub-published deployments.
Whenever you edit portfolioData.json, run this to regenerate initialData.js.

Usage:
    python scripts/sync_initial_data.py
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(HERE, "..", "src", "data", "portfolioData.json")
JS_PATH = os.path.join(HERE, "..", "src", "data", "initialData.js")


def main():
    if not os.path.exists(JSON_PATH):
        print(f"❌ Not found: {JSON_PATH}")
        sys.exit(1)

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    js = "// AUTO-GENERATED from portfolioData.json — do not edit manually\n"
    js += "// Regenerate with: python scripts/sync_initial_data.py\n\n"
    js += "export const initialData = "
    js += json.dumps(data, indent=2, ensure_ascii=False)
    js += ";\n"

    with open(JS_PATH, "w", encoding="utf-8") as f:
        f.write(js)

    print(f"✅ Synced: portfolioData.json → initialData.js")
    print(f"   Sections: {list(data.keys())}")
    print(f"   Size: {len(js):,} chars")


if __name__ == "__main__":
    main()
