import requests, urllib.parse

SITEMAP = "https://iamgaurav.netlify.app/sitemap.xml"
INDEXNOW_KEY = "your_32_char_key"  # set in Netlify env

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
        # ...all 17 URLs
    ]
})
