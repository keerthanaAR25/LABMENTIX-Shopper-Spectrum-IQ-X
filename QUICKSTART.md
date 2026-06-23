# SHOPPER SPECTRUM IQ X - Quick Start Guide

## ⚡ 5-Minute Setup

### Option 1: Using the Run Script (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/keerthanaAR25/LABMENTIX-Shopper-Spectrum-IQ-X.git
cd LABMENTIX-Shopper-Spectrum-IQ-X

# 2. Run the application (handles everything automatically)
chmod +x run.sh
./run.sh
```

The app will automatically:
- Create a virtual environment
- Install dependencies
- Generate model files if needed
- Start the Streamlit server

### Option 2: Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/keerthanaAR25/LABMENTIX-Shopper-Spectrum-IQ-X.git
cd LABMENTIX-Shopper-Spectrum-IQ-X

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Generate model files (first time only)
python generate_models.py

# 5. Run the application
streamlit run app.py
```

## 🌐 Accessing the App

Once running, open your browser and go to:
```
http://localhost:8501
```

## 📖 Using the Application

### Home Page (🏠)
- Learn about the project
- View business objectives
- See available features
- Check technologies used

### Customer Segmentation (📊)
**How to use:**
1. Enter customer RFM values:
   - **Recency**: Days since last purchase (0-500)
   - **Frequency**: Number of purchases (1-100)
   - **Monetary**: Total spending in USD (0-100000)
2. Click "Predict Segment"
3. View the predicted segment and recommendations

**Example:**
- Recency: 30 days
- Frequency: 20 purchases
- Monetary: $2,500
- **Result**: VIP Customers segment

### Product Recommendation (🎯)
**How to use:**
1. Enter a product name
2. Click "Get Recommendations"
3. View the top 5 similar products with similarity scores

**Example Products to Try:**
- GREEN VINTAGE SPOT BEAKER
- BLUE VINTAGE SPOT BEAKER
- POTTING SHED CANDLE CITRONELLA
- PANTRY CHOPPING BOARD

## 📊 Customer Segments Explained

| Segment | Recency | Frequency | Monetary | Action |
|---------|---------|-----------|----------|--------|
| **Champions** | 0-30 days | 30-50 | $5K-$50K | Exclusive rewards |
| **VIP Customers** | 30-60 days | 20-30 | $2K-$5K | Premium benefits |
| **Loyal Customers** | 60-120 days | 10-20 | $500-$2K | Increase frequency |
| **Regular Customers** | 120-180 days | 5-10 | $100-$500 | Upsell opportunities |
| **Lost Customers** | 180+ days | 1-5 | $0-$100 | Win-back campaigns |

## 🔧 Troubleshooting

### Issue: "Model files not found"
**Solution:**
```bash
python generate_models.py
```

### Issue: "ImportError for streamlit"
**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: Port 8501 already in use
**Solution:**
```bash
streamlit run app.py --server.port 8502
```

### Issue: Virtual environment not activating
**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

## 📁 Project Structure

```
LABMENTIX-Shopper-Spectrum-IQ-X/
├── app.py                          # Main Streamlit app
├── requirements.txt                # Dependencies
├── generate_models.py              # Model generation script
├── run.sh                          # Quick start script
├── README.md                       # Full documentation
├── QUICKSTART.md                   # This file
│
├── scaler.pkl                      # Trained scaler
├── kmeans_model.pkl                # KMeans model
├── cluster_mapping.pkl             # Cluster names
├── similarity_df.pkl               # Product similarities
│
└── pages/
    ├── customer_segmentation_logic.py
    └── product_recommendation_logic.py
```

## 📚 Key Features

✅ **Real-time Predictions** - Get instant customer segments and recommendations
✅ **Modern UI** - Beautiful, responsive interface with Streamlit
✅ **Machine Learning** - Scikit-Learn models for segmentation
✅ **Collaborative Filtering** - Smart product recommendations
✅ **Error Handling** - Robust error management and validation
✅ **Actionable Insights** - Detailed descriptions and recommendations

## 🚀 What's Working

- ✓ Home page with project overview
- ✓ Customer segmentation with 5 segments
- ✓ RFM analysis and KMeans clustering
- ✓ Product recommendation system
- ✓ Similarity scoring
- ✓ Error handling and validation
- ✓ Modern responsive UI
- ✓ Real-time predictions

## 🔗 Test Cases

### Test Customer Segmentation:
```
Input: Recency=20, Frequency=35, Monetary=5000
Expected: High-value customer segment
```

```
Input: Recency=300, Frequency=2, Monetary=50
Expected: Lost customer segment
```

### Test Product Recommendation:
```
Input: GREEN VINTAGE SPOT BEAKER
Expected: 5 similar products with similarity scores
```

## 📞 Support

For issues or questions:
1. Check the full README.md
2. Review the code comments
3. Open an issue on GitHub

## 🎯 Next Steps

1. **Explore the app** - Try different inputs
2. **Review the results** - Understand the predictions
3. **Customize** - Modify the app as needed
4. **Deploy** - Push to production when ready

## 📝 Notes

- All model files (.pkl) are automatically generated
- No external API calls required
- Works offline after initial setup
- Data is processed locally for privacy

---

**Ready to use!** 🎉

Questions? Check the full README.md or open an issue on GitHub.

**Created with ❤️ using Streamlit and Python**
