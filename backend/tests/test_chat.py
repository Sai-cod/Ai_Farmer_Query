from app.services.chat_service import ChatService

chat = ChatService()

question = "सोयाबीन बियाण्यांवर बीजोपचार कसा करावा?"

result = chat.ask(question)

print("\nQuestion:")
print(question)

print("\nRetrieved Context:\n")

for i, doc in enumerate(result["context"], start=1):
    print("=" * 60)
    print(f"Chunk {i}")
    print(doc.page_content[:400])

print("\nFinal Answer:\n")
print(result["answer"])
