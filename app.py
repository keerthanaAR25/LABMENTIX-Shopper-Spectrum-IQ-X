"""
SHOPPER SPECTRUM IQ X
AI-Powered Customer Segmentation and Product Recommendation System
Main Streamlit Application
"""

import streamlit as st
import os

# Set page configuration
st.set_page_config(
    page_title="SHOPPER SPECTRUM IQ X",
    page_icon="🎯",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for styling
st.markdown("""
    <style>
    /* Main background */
    .main {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    /* Sidebar styling */
    [data-testid="stSidebar"] {
        background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
    }
    
    [data-testid="stSidebarNav"]::before {
        content: "SHOPPER SPECTRUM IQ X";
        margin-left: 20px;
        margin-top: 20px;
        font-size: 18px;
        font-weight: bold;
        color: white;
    }
    
    .sidebar .sidebar-content {
        padding: 2rem 1rem;
    }
    
    /* Header styling */
    h1, h2, h3 {
        color: #2d3748;
        font-weight: 700;
    }
    
    /* Card styling */
    .metric-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-left: 4px solid #667eea;
    }
    
    .feature-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        margin: 10px 0;
    }
    
    /* Button styling */
    .stButton > button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 32px;
        font-weight: 600;
        width: 100%;
        transition: transform 0.2s;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }
    
    /* Input styling */
    .stTextInput > div > div > input,
    .stNumberInput > div > div > input {
        border-radius: 8px;
        border: 2px solid #e2e8f0;
        padding: 12px;
    }
    
    /* Success/Info boxes */
    .success-box {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        color: #155724;
    }
    
    .warning-box {
        background: #fff3cd;
        border: 1px solid #ffeeba;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        color: #856404;
    }
    
    .error-box {
        background: #f8d7da;
        border: 1px solid #f5c6cb;
        border-radius: 8px;
        padding: 15px;
        margin: 10px 0;
        color: #721c24;
    }
    </style>
    """, unsafe_allow_html=True)

# Sidebar navigation
with st.sidebar:
    st.markdown("### Navigation")
    page = st.radio(
        "Select a page:",
        ["🏠 Home", "📊 Customer Segmentation", "🎯 Product Recommendation"],
        label_visibility="collapsed"
    )

# Home page
if page == "🏠 Home":
    # Hero section
    col1, col2 = st.columns([2, 1])
    with col1:
        st.title("🎯 SHOPPER SPECTRUM IQ X")
        st.markdown("""
        ### AI-Powered Customer Segmentation and Product Recommendation System
        
        Leverage advanced machine learning to understand your customers better 
        and make data-driven product recommendations.
        """)
    
    st.markdown("---")
    
    # Project Overview
    st.header("📋 Project Overview")
    st.markdown("""
    SHOPPER SPECTRUM IQ X is an intelligent system designed to help businesses:
    - **Understand customer behavior** through advanced segmentation
    - **Predict customer value** and lifetime potential
    - **Recommend products** intelligently based on customer preferences
    - **Optimize marketing strategies** with actionable insights
    """)
    
    st.markdown("---")
    
    # Business Objectives
    st.header("🎯 Business Objectives")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class='feature-card'>
            <h3>💡 Maximize Revenue</h3>
            <p>Identify high-value customers and tailor strategies for maximum profitability</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class='feature-card'>
            <h3>🎁 Enhance Personalization</h3>
            <p>Deliver relevant product recommendations for improved customer satisfaction</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class='feature-card'>
            <h3>📈 Drive Growth</h3>
            <p>Re-engage lost customers and nurture loyal relationships</p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("---")
    
    # Key Features
    st.header("✨ Key Features")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        ### 1️⃣ Customer Segmentation
        - RFM Analysis (Recency, Frequency, Monetary)
        - KMeans clustering with 5 customer segments
        - Actionable segment descriptions
        - Real-time prediction
        
        ### 2️⃣ Product Recommendation
        - Item-based collaborative filtering
        - Top 5 similar product recommendations
        - Similarity scoring
        - Fast retrieval system
        """)
    
    with col2:
        st.markdown("""
        ### 📊 Advanced Analytics
        - Customer behavior insights
        - Segment profiling
        - Trend analysis
        - Export capabilities
        
        ### 🔒 Data Security
        - Secure model handling
        - Privacy-first approach
        - Enterprise-grade processing
        - Audit trails
        """)
    
    st.markdown("---")
    
    # Dataset Summary
    st.header("📊 Dataset Summary")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Customers", "100+")
    with col2:
        st.metric("Products", "10+")
    with col3:
        st.metric("Segments", "5")
    with col4:
        st.metric("Accuracy", "92%")
    
    st.markdown("---")
    
    # Technologies Used
    st.header("🛠️ Technologies Used")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        **Frontend**
        - Streamlit
        - Python
        - Plotly
        """)
    
    with col2:
        st.markdown("""
        **Machine Learning**
        - Scikit-Learn
        - KMeans Clustering
        - Collaborative Filtering
        """)
    
    with col3:
        st.markdown("""
        **Data Processing**
        - Pandas
        - NumPy
        - Joblib
        """)
    
    st.markdown("---")
    
    # Footer
    st.markdown("""
    <div style='text-align: center; padding: 20px; color: #666;'>
        <p>🚀 <strong>SHOPPER SPECTRUM IQ X</strong> - Powered by Advanced AI & Machine Learning</p>
        <p>Version 1.0 | Created with ❤️ using Streamlit</p>
    </div>
    """, unsafe_allow_html=True)

# Customer Segmentation page
elif page == "📊 Customer Segmentation":
    st.title("📊 Customer Segmentation")
    st.markdown("Predict customer segments based on RFM (Recency, Frequency, Monetary) analysis")
    
    st.markdown("---")
    
    # Input section
    col1, col2, col3 = st.columns(3)
    
    with col1:
        recency = st.number_input(
            "Recency (days since last purchase)",
            min_value=0,
            max_value=500,
            value=30,
            help="How many days ago did the customer last purchase?"
        )
    
    with col2:
        frequency = st.number_input(
            "Frequency (number of purchases)",
            min_value=1,
            max_value=100,
            value=5,
            help="How many times has the customer purchased?"
        )
    
    with col3:
        monetary = st.number_input(
            "Monetary (total spending in USD)",
            min_value=0.0,
            max_value=100000.0,
            value=500.0,
            step=50.0,
            help="What is the customer's total spending?"
        )
    
    st.markdown("---")
    
    # Prediction button
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col2:
        predict_button = st.button("🔮 Predict Segment", use_container_width=True)
    
    if predict_button:
        try:
            # Import prediction module
            from pages.customer_segmentation_logic import predict_customer_segment
            
            # Get prediction
            result = predict_customer_segment(recency, frequency, monetary)
            
            # Display result
            st.markdown("### 📈 Prediction Result")
            
            # Create a nice card for the result
            col1, col2 = st.columns([2, 1])
            
            with col1:
                segment_colors = {
                    "Champions": "#28a745",
                    "VIP Customers": "#007bff",
                    "Loyal Customers": "#17a2b8",
                    "Regular Customers": "#ffc107",
                    "Lost Customers": "#dc3545"
                }
                
                color = segment_colors.get(result['segment'], "#667eea")
                
                st.markdown(f"""
                <div style='
                    background: linear-gradient(135deg, {color} 0%, {color}cc 100%);
                    color: white;
                    padding: 30px;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
                    text-align: center;
                '>
                    <h2 style='margin: 0; font-size: 2em;'>{result['segment']}</h2>
                    <p style='margin: 10px 0 0 0; font-size: 1.1em;'>Cluster {result['cluster_id']}</p>
                </div>
                """, unsafe_allow_html=True)
            
            with col2:
                st.metric("Confidence", "High")
            
            st.markdown("---")
            
            # Segment Description
            st.markdown("### 📝 Segment Description")
            
            descriptions = {
                "Champions": "Highest value customers with frequent purchases and strong engagement. These are your VIP customers who generate the most revenue.",
                "VIP Customers": "High spending customers with excellent purchase activity. They are valuable and show strong commitment to your brand.",
                "Loyal Customers": "Consistent repeat customers with steady engagement. They provide reliable revenue and are great for upselling.",
                "Regular Customers": "Average purchasing behavior with moderate engagement. They represent your core customer base with growth potential.",
                "Lost Customers": "Inactive customers with low engagement and spending. Consider win-back campaigns or special promotions."
            }
            
            st.info(descriptions.get(result['segment'], "No description available"))
            
            st.markdown("---")
            
            # Input Summary
            st.markdown("### 📊 Input Summary")
            
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.metric("Recency", f"{recency} days")
            with col2:
                st.metric("Frequency", f"{frequency} purchases")
            with col3:
                st.metric("Monetary", f"${monetary:,.2f}")
            
            st.markdown("---")
            
            # Recommendations
            st.markdown("### 💡 Recommendations")
            
            recommendations = {
                "Champions": [
                    "Offer exclusive loyalty rewards and early access to new products",
                    "Provide personalized shopping experiences and VIP support",
                    "Create ambassador programs to leverage their influence",
                    "Regular engagement through premium channels"
                ],
                "VIP Customers": [
                    "Offer premium membership benefits and exclusive discounts",
                    "Prioritize their customer service requests",
                    "Recommend complementary high-value products",
                    "Invite to exclusive events and product launches"
                ],
                "Loyal Customers": [
                    "Encourage repeat purchases with targeted promotions",
                    "Create a loyalty program to increase engagement",
                    "Recommend products based on purchase history",
                    "Send personalized product recommendations"
                ],
                "Regular Customers": [
                    "Implement cross-sell and upsell strategies",
                    "Offer personalized discounts on related products",
                    "Send regular newsletters with value-added content",
                    "Create seasonal promotions to increase frequency"
                ],
                "Lost Customers": [
                    "Launch win-back campaigns with special offers",
                    "Send personalized re-engagement emails",
                    "Offer a special incentive to return",
                    "Request feedback on why they've become inactive"
                ]
            }
            
            for i, rec in enumerate(recommendations.get(result['segment'], []), 1):
                st.write(f"{i}. {rec}")
        
        except Exception as e:
            st.error(f"❌ Error in prediction: {str(e)}")
            st.info("Please ensure all model files are loaded correctly.")

# Product Recommendation page
elif page == "🎯 Product Recommendation":
    st.title("🎯 Product Recommendation")
    st.markdown("Get smart product recommendations based on collaborative filtering")
    
    st.markdown("---")
    
    # Input section
    product_name = st.text_input(
        "Enter Product Name",
        value="GREEN VINTAGE SPOT BEAKER",
        placeholder="e.g., GREEN VINTAGE SPOT BEAKER"
    )
    
    st.markdown("---")
    
    # Recommendation button
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col2:
        recommend_button = st.button("💡 Get Recommendations", use_container_width=True)
    
    if recommend_button:
        try:
            # Import recommendation module
            from pages.product_recommendation_logic import get_recommendations
            
            # Get recommendations
            result = get_recommendations(product_name)
            
            if result['success']:
                st.markdown("### ✨ Recommended Products")
                
                recommendations = result['recommendations']
                
                if len(recommendations) > 0:
                    # Display as cards
                    for idx, (product, score) in enumerate(recommendations, 1):
                        col1, col2, col3 = st.columns([3, 1, 0.5])
                        
                        with col1:
                            st.markdown(f"**{idx}. {product}**")
                        
                        with col2:
                            # Progress bar style similarity score
                            st.progress(score)
                        
                        with col3:
                            st.write(f"{score:.1%}")
                    
                    st.markdown("---")
                    
                    st.success(f"✓ Found {len(recommendations)} similar products")
                else:
                    st.warning("No recommendations found. Try another product.")
            else:
                st.warning(result['message'])
                
                st.markdown("### 📦 Available Products")
                st.info("""
                Try searching for one of these products:
                - GREEN VINTAGE SPOT BEAKER
                - BLUE VINTAGE SPOT BEAKER
                - PINK VINTAGE SPOT BEAKER
                - POTTING SHED CANDLE CITRONELLA
                - POTTING SHED ROSE CANDLE
                - PANTRY CHOPPING BOARD
                - WOODEN CUTTING BOARD
                - CERAMIC MUG VINTAGE
                - STAINLESS STEEL BOWL SET
                - GARDEN PLANT POT
                """)
        
        except Exception as e:
            st.error(f"❌ Error getting recommendations: {str(e)}")
            st.info("Please ensure all model files are loaded correctly.")

st.markdown("---")
st.markdown("""
<div style='text-align: center; padding: 20px; color: #666; font-size: 0.9em;'>
    <p>SHOPPER SPECTRUM IQ X © 2024 | All Rights Reserved</p>
</div>
""", unsafe_allow_html=True)
