import fitz
from pathlib import Path


class PDFLoader:
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir).resolve()

    def load_pdfs(self):
        documents = []

        print(f"Searching PDFs in: {self.data_dir}")

        if not self.data_dir.exists():
            print("Directory does not exist!")
            return documents

        pdf_files = list(self.data_dir.glob("*.pdf"))

        print(f"Found {len(pdf_files)} PDF(s)")

        for pdf_file in pdf_files:
            print(f"Loading: {pdf_file.name}")

            doc = fitz.open(pdf_file)

            text = ""

            for page in doc:
                text += page.get_text()

            doc.close()

            documents.append({
                "filename": pdf_file.name,
                "content": text
            })

        return documents
