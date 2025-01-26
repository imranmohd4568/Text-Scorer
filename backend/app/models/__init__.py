from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timedelta
from ..database import Base


def get_ist_time():
    return datetime.utcnow() + timedelta(hours=5, minutes=30)


class TextAnalysisLog(Base):
    __tablename__ = "text_analysis_logs"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    gibberish_score = Column(Float, nullable=True)
    education_score = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=get_ist_time)
