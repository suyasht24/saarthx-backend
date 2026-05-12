from pdf_loader import load_pdf
from chunker import chunk_text
from vector_store import create_vector_store
from chatbot import generate_answer

data = load_pdf("company_data.pdf")

chunks = chunk_text(data)

db = create_vector_store(chunks)

query = "What are payment terms?"

results = db.similarity_search(query, k=3)

context = " ".join([r.page_content for r in results])

answer = generate_answer(query, context)

print("\nFINAL ANSWER:\n")
print(answer)