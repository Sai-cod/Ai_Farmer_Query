import pymupdf
from pathlib import Path
doc = pymupdf.open("pdfs/01_ICAR_Sugarcane_Package_of_Practices.pdf")

pdf_folder = Path("pdfs")
output_folder = Path("extracted_text")
pdf_files = sorted(pdf_folder.glob("*.pdf"))
print("PDF files found:", len(pdf_files))

for pdf_path in pdf_files:
    print(f"Processing:{pdf_path.name}")
    output_path = output_folder / f"{pdf_path.stem}.txt"
    doc = pymupdf.open(pdf_path)
    with open(output_path, "w", encoding="utf-8") as output_file:
        for page in doc:
            text = page.get_text("text", sort=True)
            output_file.write(text)
            output_file.write(f"\n\n--- PAGE END ---\n\n")

    doc.close()
    print(f"Completed : {output_path.name}")
    print("All PDFs processed successfully!")
