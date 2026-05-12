from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from pdf_loader import load_pdf
from chunker import chunk_text
from vector_store import create_vector_store
from chatbot import generate_answer

app = FastAPI()

# Enable CORS (VERY IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and prepare data ONCE
data = load_pdf("company_data.pdf")
chunks = chunk_text(data)
db = create_vector_store(chunks)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    query = req.message

    results = db.similarity_search(query, k=3)
    context = " ".join([r.page_content for r in results])

    answer = generate_answer(query, context)

    return {"reply": answer}