from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from pdf_loader import load_pdf
from chunker import chunk_text
from vector_store import create_vector_store
from chatbot import generate_answer

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚀 Global DB variable
db = None


class ChatRequest(BaseModel):
    message: str


# 🚀 Load DB only when needed
def get_db():
    global db

    if db is None:
        data = load_pdf("company_data.pdf")
        chunks = chunk_text(data)
        db = create_vector_store(chunks)

    return db


@app.get("/")
def home():
    return {"message": "SaarthX API running successfully"}


@app.post("/chat")
def chat(req: ChatRequest):

    query = req.message

    db_instance = get_db()

    results = db_instance.similarity_search(query, k=3)

    context = " ".join([r.page_content for r in results])

    answer = generate_answer(query, context)

    return {"reply": answer}