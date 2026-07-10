import re
import xml.etree.ElementTree as ET
from pathlib import Path

src = Path(
    r"c:\Users\ferslk\OneDrive - IFS\Desktop\Project105\Logo\13606987_5305477.svg"
)
dest = Path(
    r"c:\Users\ferslk\OneDrive - IFS\Desktop\Project105\wedding-invite\public\backgrounds\invitation-card-frame.svg"
)

content = src.read_text(encoding="utf-8")
content = re.sub(
    r'<g id="BACKGROUND">.*?</g>\s*',
    "",
    content,
    count=1,
    flags=re.DOTALL,
)

dest.parent.mkdir(parents=True, exist_ok=True)
dest.write_text(content, encoding="utf-8")
ET.parse(dest)
print(f"Wrote {dest} ({dest.stat().st_size // 1024} KB)")
