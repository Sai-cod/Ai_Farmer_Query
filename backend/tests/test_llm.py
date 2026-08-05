from app.services.llm_service import LLMService

llm = LLMService()

response = llm.invoke("Introduce yourself in one sentence.")

print("\nGemma Response:\n")
print(response)
