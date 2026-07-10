import re
import xml.etree.ElementTree as ET
from pathlib import Path

src = Path(
    r"c:\Users\ferslk\OneDrive - IFS\Desktop\Project105\Logo\419081365_4ab137b1-c3a4-442b-aeb7-5cfdaaa86717.svg"
)
dest = Path(
    r"c:\Users\ferslk\OneDrive - IFS\Desktop\Project105\wedding-invite\public\backgrounds\invitation-card-bg.svg"
)

content = src.read_text(encoding="utf-8")

# Remove the whole placeholder layer: monogram, outlined names, and editable text.
marker = (
    "          <g>\n"
    "            <g>\n"
    "              <g style=\"opacity: .28;\">\n"
    "                <path d=\"M457.081,888.502"
)
start = content.find(marker)
if start == -1:
    raise SystemExit("Placeholder content block not found")

end = content.find("          </g>\n        </g>\n      </g>", start)
if end == -1:
    raise SystemExit("Closing tags for placeholder block not found")
end += len("          </g>\n")

content = content[:start] + content[end:]
content = re.sub(r"<text\b[^>]*>.*?</text>", "", content, flags=re.DOTALL)

dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(content, encoding="utf-8")

try:
    ET.parse(dest)
except ET.ParseError as exc:
    raise SystemExit(f"Generated SVG is invalid XML: {exc}") from exc

print(f"Wrote {dest} ({dest.stat().st_size // 1024} KB)")
print("Remaining text nodes:", len(re.findall(r"<text\b", content)))
