from pathlib import Path

from app.preprocessing.pdf_loader import PDFLoader


BASE_DIR = Path(__file__).resolve().parent.parent

PDF_FOLDER = BASE_DIR / "data" / "raw" / "pdf"

print("PDF Folder:", PDF_FOLDER)

loader = PDFLoader(str(PDF_FOLDER))

documents = loader.load_pdfs()

print(f"\nTotal PDFs Loaded: {len(documents)}")

for doc in documents:
    print("=" * 50)
    print("Filename :", doc["filename"])
    print("Characters:", len(doc["content"]))
    print("Preview:")
    print(doc["content"][:300])
