from langchain_text_splitters import RecursiveCharacterTextSplitter


class TextChunker:
    def __init__(self, chunk_size=500, chunk_overlap=100):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=["\n\n", "\n", ". ", " ", ""]
        )

    def chunk_documents(self, documents):
        chunks = []

        for document in documents:
            split_text = self.splitter.split_text(document["content"])

            for chunk in split_text:
                chunks.append({
                    "filename": document["filename"],
                    "content": chunk
                })

        return chunks
