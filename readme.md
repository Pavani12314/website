# Personal Portfolio Website - Assignment

This repository contains my personal portfolio website that fulfills the requirements for the assignment. The website includes an "About Me" section, education background, technical skills, and a text analysis tool.

## Features

1. **Personal Information**
   - About me section
   - Profile picture and birthplace images
   - Education background and achievements
   - Technical skills with expertise levels
   - Downloadable CV

2. **Event Tracking**
   - Tracks and logs all click events
   - Tracks page views and element visibility
   - Outputs events to console in the required format

3. **Text Analysis Tool**
   - Character count analysis (letters, words, spaces, newlines, symbols)
   - Pronoun counting and grouping
   - Preposition counting and grouping
   - Indefinite article counting and grouping

## File Structure

```
yourusername.github.io/
├── index.html
├── styles.css
├── resume.pdf
├── README.md
├── js/
│   ├── eventTracker.js
│   └── textAnalyzer.js
└── images/
    ├── profile.jpg
    ├── birthplace1.jpg
    └── birthplace2.jpg
```

## Deployment Instructions

### How to Deploy on GitHub Pages

1. Create a GitHub repository with the name: `yourusername.github.io`
2. Clone the repository to your local machine:
   ```
   git clone https://github.com/yourusername/yourusername.github.io.git
   ```
3. Copy all the files from this project into your local repository
4. Add the files to Git:
   ```
   git add .
   ```
5. Commit the changes:
   ```
   git commit -m "Initial commit of personal website"
   ```
6. Push the changes to GitHub:
   ```
   git push origin main
   ```
7. Wait a few minutes for GitHub Pages to deploy your site
8. Visit `https://yourusername.github.io` to see your website

## Usage Notes

### Images
- Replace the placeholder images in the `images` folder with your own:
  - `profile.jpg` - Your profile picture
  - `birthplace1.jpg` and `birthplace2.jpg` - Pictures from your birthplace

### Resume
- Replace `resume.pdf` with your own CV/resume file

### Text Analysis Tool
- For testing the text analysis tool, you'll need to input text with at least 10,000 words.
- You can use a lorem ipsum generator or paste long articles to reach the required word count.

### Event Tracking
- Open your browser's console (F12 or right-click > Inspect > Console) to see the event tracking logs.
- Every click and page view will be logged in the format: `Timestamp, type of event (click/view), event object`