# Image Assets

Drop your images here, then reference them in the admin panel using the path `/images/your-file.jpg`.

## Folder Structure

```
public/images/
├── profile.jpg              ← your headshot (referenced as /images/profile.jpg)
├── projects/                ← project screenshots
│   ├── media-platform.png
│   ├── sentiment-pipeline.png
│   └── ...
└── certificates/            ← certificate images
    ├── powerbi.png
    ├── ai-deep-learning.png
    └── ...
```

## How to Use

1. **Copy your image** to the appropriate folder
2. **Open** http://localhost:3000/admin (login)
3. **Navigate** to the section (About, Projects, or Certificates)
4. **In the Image field**, type the path:
   - Profile photo: `/images/profile.jpg`
   - Project: `/images/projects/sales-dashboard.png`
   - Certificate: `/images/certificates/ibm-sql.png`

## Image Recommendations

| Section | Aspect Ratio | Recommended Size |
|---|---|---|
| Profile photo | 4:5 portrait | 400 × 500 px |
| Project snapshot | 16:9 landscape | 600 × 340 px |
| Certificate | 3:2 landscape | 400 × 260 px |
| Tool icon | 1:1 square | 64 × 64 px (SVG preferred) |

## Two Ways to Set an Image

### Option A: Drop files here + reference by path (recommended)
- ✅ Tiny `localStorage` footprint
- ✅ Same image used for desktop/mobile
- ✅ Cached by browser
- ✅ Works after deployment

### Option B: Upload via admin panel (file picker)
- ✅ Zero filesystem access needed
- ✅ Image stored as base64 in localStorage
- ⚠️ Counts toward browser's ~5MB localStorage quota
- ⚠️ Lost if user clears browser data (export JSON backup regularly!)

You can mix both approaches per image.
