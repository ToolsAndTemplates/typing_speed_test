# TypeMaster - Typing Speed Test

A modern, responsive typing speed test application built with Next.js, TypeScript, and Tailwind CSS.

![TypeMaster](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

## Features

- **Real-time WPM Calculation** - Accurate words per minute tracking based on correct characters
- **Accuracy Tracking** - Monitor your typing precision with percentage-based accuracy
- **Multiple Text Modes**:
  - Common Words - Everyday vocabulary for general practice
  - Programming - Technical terms and coding keywords
  - Quotes - Inspirational quotes for varied typing practice
- **Configurable Time Limits** - Choose from 15s, 30s, 60s, or 120s sessions
- **Visual Feedback** - Real-time character highlighting (green for correct, red for errors)
- **Beautiful Results Modal** - Performance rating with detailed statistics breakdown
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ismat-Samadov/typing_speed_test.git
cd typing_speed_test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## How It Works

### WPM Calculation
- Standard word = 5 characters
- WPM = (correct characters / 5) / minutes elapsed
- Raw WPM includes all typed characters (correct + incorrect)

### Scoring System
| WPM Range | Rating |
|-----------|--------|
| 80+ | Outstanding |
| 60-79 | Excellent |
| 40-59 | Good |
| 25-39 | Keep Practicing |
| 0-24 | Getting Started |

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and custom CSS
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main game page
│   └── icon.svg         # Favicon
├── components/
│   ├── TypingArea.tsx   # Text display with character highlighting
│   ├── StatsDisplay.tsx # WPM, accuracy, timer display
│   ├── ModeSelector.tsx # Mode and time selection
│   └── ResultsModal.tsx # End-game results popup
├── data/
│   └── words.ts         # Word lists and text generation
└── hooks/
    └── useTypingGame.ts # Core game logic hook
```

## Keyboard Shortcuts

- **Tab + Enter** - Restart the test
- **Enter** (on results screen) - Start a new test

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Node.js

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using Next.js and Tailwind CSS
