<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# The System Inspector

**From Coder to Inspector: Navigating the AI-Generated Code Era**

A modern web application exploring the shift in software engineering from writing code to inspecting and approving AI-generated systems.

🔗 **Read the original blog post:** [The System Inspector - We need to approve the code](https://dev.to/suckup_de/the-system-inspector-we-need-to-approve-the-code-5agc)

🚀 **Live Demo:** [https://voku.github.io/TheSystemInspector/](https://voku.github.io/TheSystemInspector/)

## Overview

This interactive web experience demonstrates how AI code generation is changing the role of software engineers. As LLMs make code generation virtually free, the bottleneck shifts from implementation to verification. This application explores this paradigm shift through both AI and human perspectives.

## Features

- 🎭 **Dual Perspective**: Toggle between AI and Human viewpoints
- 📊 **Interactive Case Studies**: Real examples of AI-generated code challenges
- 🎨 **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- 🚀 **Performance Optimized**: Smooth scrolling, animations, and responsive design
- 📱 **Mobile-First**: Fully responsive across all devices

## Run Locally

**Prerequisites:** Node.js 18+

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voku/TheSystemInspector.git
   cd TheSystemInspector
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons
- **GitHub Pages** - Deployment

## Project Structure

```
TheSystemInspector/
├── components/          # React components
│   ├── Typewriter.tsx  # Animated text effect
│   ├── CodeBlock.tsx   # Syntax-highlighted code display
│   └── CaseStudy.tsx   # Interactive case study component
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── types.ts            # TypeScript type definitions
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## Key Files Detector Helper Prompt

When working with this codebase, use this prompt to quickly identify the most relevant files for your task:

```
I'm working on [describe your task/feature/bug]. 
Based on this project structure, which files should I focus on?

Project: TheSystemInspector - Interactive web app about AI code generation
Tech: React 19 + TypeScript + Vite + Tailwind CSS

Key areas:
- UI Components: components/
- Main App: App.tsx
- Configuration: vite.config.ts
- Deployment: .github/workflows/
```

## Deployment

This project is automatically deployed to GitHub Pages via GitHub Actions. Every push to the `main` branch triggers a new deployment.

To deploy manually:
1. Ensure `base` path in `vite.config.ts` matches your repository name
2. Push changes to the `main` branch
3. GitHub Actions will automatically build and deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Repository:** [https://github.com/voku/TheSystemInspector](https://github.com/voku/TheSystemInspector)

## License

This project is open source and available under the MIT License.

## Author

**Lars Moelleken** - [@suckup_de](https://dev.to/suckup_de)

## Acknowledgments

- Inspired by the evolving role of software engineers in the age of AI
- Built to demonstrate the "System Inspector" philosophy
- Special thanks to the dev community for feedback and insights

---

<div align="center">
  <strong>Remember:</strong> We are no longer writing code line by line. We are approving systems that outlast individuals.
</div>

