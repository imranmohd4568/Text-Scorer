from transformers import pipeline
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import TextAnalysisLog

router = APIRouter(prefix="/api", tags=["analysis"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


try:
    gibberish_detector = pipeline(
        "text-classification", model="wajidlinux99/gibberish-text-detector"
    )
    education_classifier = pipeline(
        "text-classification", model="HuggingFaceFW/fineweb-edu-classifier"
    )
except Exception as e:
    print(f"Error loading models: {e}")
    gibberish_detector, education_classifier = None, None


# request body schema
class AnalyzeRequest(BaseModel):
    text: str


# Analyze endpoint
@router.post("/analyze")
async def analyze_text(request: AnalyzeRequest, db: Session = Depends(get_db)):
    text = request.text

    if not gibberish_detector or not education_classifier:
        raise HTTPException(
            status_code=500,
            detail="Hugging Face models failed to load. Check your internet connection or model paths.",
        )

    print(f"Received text: {text}")

    try:
        gibberish_result = gibberish_detector(text)
        education_result = education_classifier(text)

        gibberish_score = gibberish_result[0]["score"]
        education_score = education_result[0]["score"]
        log = TextAnalysisLog(
            text=text, gibberish_score=gibberish_score, education_score=education_score
        )
        db.add(log)
        db.commit()
        db.refresh(log)

        return {
            "text": text,
            "gibberish_score": gibberish_score,
            "education_score": education_score,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during analysis: {e}")


# History endpoint
@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    logs = db.query(TextAnalysisLog).all()
    return [
        {
            "id": log.id,
            "text": log.text,
            "gibberish_score": log.gibberish_score,
            "education_score": log.education_score,
            "timestamp": log.timestamp,
        }
        for log in logs
    ]


# Delete endpoint
@router.delete("/delete/{log_id}")
async def delete_record(log_id: int, db: Session = Depends(get_db)):
    print(f"Received log_id: {log_id}")
    log = db.query(TextAnalysisLog).filter(TextAnalysisLog.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Record not found")

    db.delete(log)
    db.commit()
    return {"message": f"Record with ID {log_id} deleted successfully"}
