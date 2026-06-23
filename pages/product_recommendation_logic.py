"""
Product Recommendation Logic
Handles item-based collaborative filtering recommendations
"""

import pandas as pd
import numpy as np
import pickle

# Model path
SIMILARITY_MATRIX_PATH = 'similarity_df.pkl'

def load_similarity_matrix():
    """Load the similarity matrix"""
    try:
        similarity_df = pd.read_pickle(SIMILARITY_MATRIX_PATH)
        return similarity_df
    except FileNotFoundError:
        raise Exception(f"Similarity matrix file not found: {SIMILARITY_MATRIX_PATH}")
    except Exception as e:
        raise Exception(f"Error loading similarity matrix: {str(e)}")

def get_recommendations(product_name, n_recommendations=5):
    """
    Get product recommendations based on collaborative filtering
    
    Parameters:
    - product_name: Name of the product to get recommendations for
    - n_recommendations: Number of recommendations to return (default: 5)
    
    Returns:
    - Dictionary with recommendations
    """
    
    try:
        # Load similarity matrix
        similarity_df = load_similarity_matrix()
        
        # Convert product name to uppercase for matching
        product_name_upper = product_name.upper().strip()
        
        # Check if product exists in the database
        if product_name_upper not in similarity_df.index:
            # Try to find partial matches
            possible_matches = [p for p in similarity_df.index if product_name_upper in p or p in product_name_upper]
            
            if possible_matches:
                product_name_upper = possible_matches[0]
            else:
                return {
                    'success': False,
                    'message': f"Product '{product_name}' not found in database. Please check the product name and try again.",
                    'available_products': similarity_df.index.tolist()
                }
        
        # Get similarity scores for the product
        similarity_scores = similarity_df.loc[product_name_upper]
        
        # Sort by similarity and exclude the product itself
        similar_products = similarity_scores.drop(product_name_upper).sort_values(ascending=False)
        
        # Get top N recommendations
        top_recommendations = similar_products.head(n_recommendations)
        
        # Format recommendations
        recommendations = [
            (product, float(score))
            for product, score in top_recommendations.items()
        ]
        
        return {
            'success': True,
            'product': product_name_upper,
            'recommendations': recommendations,
            'count': len(recommendations)
        }
    
    except Exception as e:
        return {
            'success': False,
            'message': f"Error getting recommendations: {str(e)}"
        }

def get_available_products():
    """Get list of all available products"""
    try:
        similarity_df = load_similarity_matrix()
        return similarity_df.index.tolist()
    except Exception as e:
        return []

def get_product_similarity_stats(product_name):
    """Get similarity statistics for a product"""
    try:
        similarity_df = load_similarity_matrix()
        
        product_name_upper = product_name.upper().strip()
        
        if product_name_upper not in similarity_df.index:
            return None
        
        similarity_scores = similarity_df.loc[product_name_upper]
        
        return {
            'product': product_name_upper,
            'avg_similarity': float(similarity_scores.mean()),
            'max_similarity': float(similarity_scores.max()),
            'min_similarity': float(similarity_scores.min()),
            'std_similarity': float(similarity_scores.std())
        }
    
    except Exception as e:
        return None

def get_product_pairs_by_similarity(min_similarity=0.7):
    """Get product pairs with high similarity"""
    try:
        similarity_df = load_similarity_matrix()
        
        pairs = []
        for i in range(len(similarity_df)):
            for j in range(i+1, len(similarity_df)):
                score = similarity_df.iloc[i, j]
                if score >= min_similarity:
                    pairs.append({
                        'product_1': similarity_df.index[i],
                        'product_2': similarity_df.index[j],
                        'similarity': float(score)
                    })
        
        # Sort by similarity
        pairs.sort(key=lambda x: x['similarity'], reverse=True)
        
        return pairs
    
    except Exception as e:
        return []
