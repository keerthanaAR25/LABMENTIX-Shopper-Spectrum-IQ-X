#!/bin/bash
# Run SHOPPER SPECTRUM IQ X Streamlit Application

echo "======================================"
echo "SHOPPER SPECTRUM IQ X"
echo "AI-Powered Customer Segmentation & Recommendation System"
echo "======================================"
echo ""

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Check if dependencies are installed
if [ ! -d ".venv/lib/python"*/site-packages/streamlit ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Check if model files exist
if [ ! -f "scaler.pkl" ] || [ ! -f "kmeans_model.pkl" ] || [ ! -f "cluster_mapping.pkl" ] || [ ! -f "similarity_df.pkl" ]; then
    echo "Generating model files..."
    python generate_models.py
fi

echo ""
echo "Starting Streamlit application..."
echo "Access the app at: http://localhost:8501"
echo ""

# Run the Streamlit app
streamlit run app.py
