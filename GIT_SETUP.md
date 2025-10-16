# Git Setup Instructions for MOM Pharmacy Landing Page

## Prerequisites
1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Or use: `winget install Git.Git` (Windows Package Manager)

## Step-by-Step Setup

### 1. Configure Git (Run these commands in PowerShell/Command Prompt)
```bash
git config --global user.name "pr571968-byte"
git config --global user.email "pr571968@gmail.com"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `mom-pharmacy-landing-page`
3. Description: `MOM Pharmacy landing page - A responsive healthcare delivery platform website with interactive features`
4. Set to **Public**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 3. Initialize Local Repository
```bash
# Navigate to your project folder
cd C:\Users\DELL\cursor\mom-pharmacy

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: MOM Pharmacy landing page with all interactive features"
```

### 4. Connect to GitHub Repository
```bash
# Add remote origin (replace with your actual repository URL)
git remote add origin https://github.com/pr571968-byte/mom-pharmacy-landing-page.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Project Files Included
- ✅ `index.html` - Main landing page
- ✅ `styles.css` - Complete styling
- ✅ `script.js` - Interactive functionality
- ✅ `assets/` - All images and icons
- ✅ `about.html` - About Us page
- ✅ `team.html` - Our Team page
- ✅ `careers.html` - Careers page
- ✅ `investors.html` - For Investors page
- ✅ `contact.html` - Contact Us page
- ✅ `contactus.html` - Ask MOM contact form
- ✅ `download.html` - Download App page
- ✅ `prescription.html` - Prescription upload form
- ✅ `confirm.html` - Order confirmation page
- ✅ `results.html` - Search results page
- ✅ `product.html` - Product details page
- ✅ `track.html` - Order tracking page
- ✅ `README.md` - Comprehensive documentation
- ✅ `LICENSE` - MIT License

## Features Implemented
- 🎨 Pixel-perfect Figma design implementation
- 🔍 Interactive search flow (Search → Results → Product → Order)
- 📋 Prescription upload with patient details
- ✅ Order confirmation with contact form
- 📦 Order tracking with status timeline
- 🌐 Multi-language support (Google Translate)
- 💬 "Ask MOM" chat functionality
- 📱 Social media integration (LinkedIn, Instagram)
- 📄 Multi-page navigation
- ❓ Interactive FAQ with dropdown answers
- 🎯 Download app page with Google Play Store link

## Next Steps After Upload
1. **Enable GitHub Pages** (optional):
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Your site will be live at: `https://pr571968-byte.github.io/mom-pharmacy-landing-page/`

2. **Share your repository**:
   - Repository URL: `https://github.com/pr571968-byte/mom-pharmacy-landing-page`

## Troubleshooting
- If you get authentication errors, use GitHub CLI: `gh auth login`
- If files are too large, use Git LFS: `git lfs track "*.png" "*.jpg"`
- For HTTPS issues, use SSH: `git remote set-url origin git@github.com:pr571968-byte/mom-pharmacy-landing-page.git`

---

**Your MOM Pharmacy landing page is ready to be shared with the world! 🚀**
