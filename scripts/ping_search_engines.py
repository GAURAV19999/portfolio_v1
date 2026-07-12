import requests, urllib.parse

SITEMAP = "https://iamgaurav.netlify.app/sitemap.xml"
INDEXNOW_KEY = "de3831afcee143568850db37481697d5"  # set in Netlify env

# Google (only requires sitemap URL)
requests.get(f"https://www.google.com/ping?sitemap={urllib.parse.quote(SITEMAP)}")

# Bing/Yandex via IndexNow
requests.post("https://api.indexnow.org/indexnow", json={
    "host": "iamgaurav.netlify.app",
    "key": INDEXNOW_KEY,
    "urlList": [
      "https://iamgaurav.netlify.app/",
      "https://iamgaurav.netlify.app/case-studies",
      "https://iamgaurav.netlify.app/blog",
      "https://iamgaurav.netlify.app/faq",
      "https://iamgaurav.netlify.app/case-studies/patrakaar-ai-media-intelligence",
      "https://iamgaurav.netlify.app/case-studies/political-campaign-election-analytics",
      "https://iamgaurav.netlify.app/case-studies/sentiment-analysis-predictive-forecasting",
      "https://iamgaurav.netlify.app/case-studies/ecommerce-sales-analytics-dashboard",
      "https://iamgaurav.netlify.app/case-studies/supply-chain-sprint-tracking-powerbi",
      "https://iamgaurav.netlify.app/blog/power-bi-dax-patterns-2026",
      "https://iamgaurav.netlify.app/blog/freelance-data-analyst-europe-guide",
      "https://iamgaurav.netlify.app/in",
      "https://iamgaurav.netlify.app/uk",
      "https://iamgaurav.netlify.app/de",
      "https://iamgaurav.netlify.app/nl",
      "https://iamgaurav.netlify.app/downloads/PowerBI-DAX-Quickstart-Pack.pdf",
      "https://iamgaurav.netlify.app/downloads/Gaurav-Vishvakarma-Service-Deck.pdf"
    ]
})
