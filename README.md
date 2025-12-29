# mgd-gi | محرك المعرفة المكاني

> "Knowledge is not a list, it's a space. Thought is not a sequence, it's navigation."
> 
> "المعرفة ليست قائمة، إنها مساحة. الفكر ليس تسلسلاً، إنه توجيه."

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-2.1.0-brightgreen.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

**mgd-gi** is an experimental research project exploring the boundaries of spatial intelligence and knowledge representation. It transforms the traditional web interface into a boundless, zoomable canvas where information exists as spatial entities.

## 📱 Available Versions

### 🌐 Web Version
- **Tech**: HTML5, Canvas API, JavaScript
- **Features**: Pan, Zoom, Grid, Content Embedding
- **Try it**: [Live Demo](https://mgdwork12119241-wq.github.io/mgd-gi/)

### 📱 Mobile Version (NEW!)
- **Tech**: React Native, Expo, TypeScript
- **Features**: Spatial Canvas, YouTube/Vimeo, Full Arabic (RTL) Support
- **Platforms**: iOS 13+, Android 8+
- **Docs**: [Read mobile/MOBILE_README.md](./mobile/MOBILE_README.md)

## 🚀 Features

- **Infinite Spatial Canvas**: Smooth pan, zoom, and rotation navigation.
- **Dynamic Resizing**: Resize any spatial entity (Web, Video, Concept) directly in the space.
- **Interactive Toolbar**: Quick access to selection, panning, and view resetting.
- **Modular Architecture**: Clean separation between the engine, entities, and knowledge layers.
- **Multi-Entity Support**:
  - **Concept Nodes**: Abstract ideas and labels.
  - **Web Screens**: Embedded live websites via iframes.
  - **Video Screens**: Integrated YouTube/Vimeo players.
  - **Image Nodes**: Visual assets.
- **Intelligent Embedding**: Automatic URL parsing and content detection.
- **Full Arabic Support**: Complete RTL support for Arabic users.
- **Vanilla Tech Stack**: Built with pure HTML5, CSS3, and JavaScript for maximum performance.

## 🛠 Architecture

### Web Version
- `/engine`: Core systems (Camera, RenderEngine, InputHandler).
- `/entities`: Spatial object definitions and behaviors.
- `/knowledge`: Data structures for storing and linking information.
- `/utils`: Helper functions and math utilities.

### Mobile Version
- `/mobile/app`: React Native screens and navigation.
- `/mobile/components`: Reusable UI components.
- `/mobile/lib/spatial`: Spatial engine for mobile.
- `/mobile/hooks`: Custom React hooks for state management.

## 📖 Research Philosophy

This project explores:

1. **Knowledge as Space**: How distance and proximity affect our understanding of information.
2. **Thought as Navigation**: Moving through ideas instead of clicking through pages.
3. **Links as Distances**: The strength of a relationship represented by spatial coordinates.

## 🛠 Development

### Web Version
1. Clone the repository.
2. Open `index.html` in any modern browser.
3. Use a local server (like `npx serve`) for full iframe support.

### Mobile Version
```bash
cd mobile
pnpm install
pnpm dev:metro
```

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

*A research collaboration between Human Intelligence and Manus AI.*

⭐ If you like this project, please give it a star!
