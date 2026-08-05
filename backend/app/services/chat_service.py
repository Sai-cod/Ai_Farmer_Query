from app.core.config import VECTORSTORE_PATH, TOP_K
from app.rag.embeddings import EmbeddingModel
from app.rag.prompt import RAG_PROMPT
from app.rag.retriever import Retriever
from app.services.llm_service import LLMService
from app.services.translation_service import TranslationService


class ChatService:
    def __init__(self):
        # Load Embedding Model
        embedding_model = EmbeddingModel().get_embedding_model()

        # Load Retriever
        self.retriever = Retriever(embedding_model)
        self.retriever.load_vectorstore(str(VECTORSTORE_PATH))

        # Load LLM
        self.llm = LLMService()

        # Load Translator
        self.translator = TranslationService()

    def ask(self, question: str):
        # Translate Marathi question to English
        english_question = self.translator.marathi_to_english(question)

        print(f"\nTranslated Question: {english_question}")

        # Retrieve relevant chunks
        documents = self.retriever.search(
            english_question,
            k=TOP_K
        )

        # Build Context
        context = "\n\n".join(
            [doc.page_content for doc in documents]
        )

        # Build Prompt
        prompt = RAG_PROMPT.format(
            context=context,
            question=english_question
        )

        # Generate English Answer
        english_answer = self.llm.invoke(prompt)

        # Translate Answer to Marathi
        marathi_answer = self.translator.english_to_marathi(
            english_answer
        )

        return {
            "question": question,
            "translated_question": english_question,
            "answer": marathi_answer,
            "context": documents
        }
