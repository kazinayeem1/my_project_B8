from fastapi import FastAPI, UploadFile, File, Query

from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os
import numpy as np


app = FastAPI()
allow_origins=["http://localhost:3000", "https://your-frontend-domain.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "models/random_forest_model.pkl"

@app.post("/learn")
async def learn(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)
    X = df.iloc[:, :-1]  # Features
    y = df.iloc[:, -1]   # Target
    model = RandomForestClassifier()
    model.fit(X, y)
    joblib.dump(model, model_path)
    return {"message": "Model trained and saved successfully"}

@app.get("/ask")
def ask(q: str = Query(...)):
    if not os.path.exists(model_path):
        return {"error": "Model not found. Please train the model first."}
    
    model = joblib.load(model_path)
    
    try:
        features = np.array([float(x) for x in q.split(",")]).reshape(1, -1)
    except:
        return {"error": "Invalid input format. Send comma-separated feature values."}

    prediction = model.predict(features)
    return {"prediction": prediction.tolist()}
