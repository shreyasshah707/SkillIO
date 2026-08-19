from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id=Column(Integer, primary_key=True, index=True)
    full_name=Column(String, nullable=False)
    email=Column(String, unique=True, index=True, nullable=False)
    hashed_password=Column(String, nullable=False)
    created_at=Column(DateTime, default=datetime.datetime.utcnow)

    analyses=relationship("Analysis", back_populates="owner")

class Analysis(Base):
    __tablename__ = "analyses"

    id=Column(Integer, primary_key=True, index=True)
    user_id=Column(Integer, ForeignKey("users.id"))
    job_role=Column(String, nullable=False)
    recommendations_json=Column(Text, nullable=False)
    created_at=Column(DateTime, default=datetime.datetime.utcnow)

    owner=relationship("User", back_populates="analyses")