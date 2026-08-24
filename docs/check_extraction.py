from pathlib import Path

text_folder = Path("extracted_text")
text_files = sorted(text_folder.glob("*.txt"))
print("TXT files found:", len(text_files))
for text_file in text_files:
    text = text_file.read_text(encoding="utf-8")
    print(
        f"{text_file.name} -> "
        f"{len(text):,} characters"
    )
