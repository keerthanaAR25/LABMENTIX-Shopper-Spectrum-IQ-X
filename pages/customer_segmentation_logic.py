"""
Customer Segmentation Logic
Handles RFM analysis and customer segment prediction
"""

import numpy as np
import pandas as pd
import joblib
import pickle
import os

# Model paths
SCALER_PATH = 'scaler.pkl'
KMEANS_PATH = 'kmeans_model.pkl'
CLUSTER_MAPPING_PATH = 'cluster_mapping.pkl'

def load_models():
    """Load all required models"""
    try:
        scaler = joblib.load(SCALER_PATH)
        kmeans = joblib.load(KMEANS_PATH)
        
        with open(CLUSTER_MAPPING_PATH, 'rb') as f:
            cluster_mapping = pickle.load(f)
        
        return scaler, kmeans, cluster_mapping
    
    except FileNotFoundError as e:
        raise Exception(f"Model file not found: {str(e)}")
    except Exception as e:
        raise Exception(f"Error loading models: {str(e)}")

def predict_customer_segment(recency, frequency, monetary):
    """
    Predict customer segment based on RFM values
    
    Parameters:
    - recency: days since last purchase (0-500)
    - frequency: number of purchases (1-100)
    - monetary: total spending in USD (0-100000)
    
    Returns:
    - Dictionary with segment info
    """
    
    try:
        # Load models
        scaler, kmeans, cluster_mapping = load_models()
        
        # Create input dataframe
        rfm_data = pd.DataFrame({
            'Recency': [recency],
            'Frequency': [frequency],
            'Monetary': [monetary]
        })
        
        # Scale the input
        rfm_scaled = scaler.transform(rfm_data)
        
        # Predict cluster
        cluster_id = kmeans.predict(rfm_scaled)[0]
        
        # Map cluster to segment name
        segment_name = cluster_mapping.get(cluster_id, "Unknown")
        
        return {
            'segment': segment_name,
            'cluster_id': cluster_id,
            'recency': recency,
            'frequency': frequency,
            'monetary': monetary,
            'success': True
        }
    
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def get_segment_description(segment_name):
    """Get detailed description for a segment"""
    
    descriptions = {
        "Champions": "Highest value customers with frequent purchases and strong engagement. These are your VIP customers who generate the most revenue. They purchase frequently, have made recent transactions, and spend significantly.",
        
        "VIP Customers": "High spending customers with excellent purchase activity. They are valuable and show strong commitment to your brand. They represent the top tier of your customer base.",
        
        "Loyal Customers": "Consistent repeat customers with steady engagement. They provide reliable revenue and are great for upselling. They maintain regular purchase patterns.",
        
        "Regular Customers": "Average purchasing behavior with moderate engagement. They represent your core customer base with significant growth potential. They are stable contributors to revenue.",
        
        "Lost Customers": "Inactive customers with low engagement and spending. They haven't purchased recently and may require win-back campaigns. Consider special offers or re-engagement strategies."
    }
    
    return descriptions.get(segment_name, "No description available")

def get_segment_metrics(segment_name):
    """Get typical metrics for each segment"""
    
    metrics = {
        "Champions": {
            "avg_recency": "15-30 days",
            "avg_frequency": "30-50 purchases",
            "avg_monetary": "$5,000-$50,000"
        },
        "VIP Customers": {
            "avg_recency": "30-60 days",
            "avg_frequency": "20-30 purchases",
            "avg_monetary": "$2,000-$5,000"
        },
        "Loyal Customers": {
            "avg_recency": "60-120 days",
            "avg_frequency": "10-20 purchases",
            "avg_monetary": "$500-$2,000"
        },
        "Regular Customers": {
            "avg_recency": "120-180 days",
            "avg_frequency": "5-10 purchases",
            "avg_monetary": "$100-$500"
        },
        "Lost Customers": {
            "avg_recency": "180-365+ days",
            "avg_frequency": "1-5 purchases",
            "avg_monetary": "$0-$100"
        }
    }
    
    return metrics.get(segment_name, {})
