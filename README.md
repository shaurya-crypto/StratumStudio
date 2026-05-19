<div align="center">

<img src="https://img.shields.io/badge/Stratum-Studio-blue?style=for-the-badge&logo=electron&logoColor=white" alt="Stratum Studio IDE" />

# ⚡ Stratum Studio

### AI-Powered Desktop IDE for Embedded Systems Development

[![Electron](https://img.shields.io/badge/Electron-Latest-47848F?style=flat-square&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-Latest-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red?style=flat-square)](https://github.com/)

<br />

> **Stratum Studio** is a free, open-source, AI-integrated desktop IDE built specifically for embedded systems developers. Write, debug, and deploy code to your microcontrollers — with an intelligent AI assistant by your side at every step.

<br />

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Supported Microcontrollers](#-supported-microcontrollers)
- [AI Integration](#-ai-integration)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🚀 About the Project

Stratum Studio is a **VS Code-style desktop application** designed from the ground up for embedded systems developers. Whether you're a beginner experimenting with MicroPython or a professional building IoT solutions, Stratum Studio gives you a clean, powerful, and AI-enhanced coding environment — no browser required.

Built with **Electron + React + TypeScript**, it brings the familiarity of modern code editors into the world of microcontrollers, with deep AI integration that helps you write better code, debug faster, and learn along the way.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 **AI Code Assistant** | Integrated AI with your custom API key — ask questions, get code suggestions, debug errors |
| 🎛️ **Multi-MCU Support** | Full support for Raspberry Pi Pico, ESP32, Arduino, and more |
| 🖥️ **VS Code-like Interface** | Familiar editor layout powered by **Monaco Editor** |
| 🌐 **Multi-Language Support** | C/C++, MicroPython, CircuitPython, Python — based on your microcontroller |
| 🎨 **Clean UI** | Minimal, distraction-free interface with a gorgeous default dark mode |
| 📦 **Open Source** | Fully open source — contribute, fork, and build on top of it |
| ⚡ **Electron-Powered** | Cross-platform desktop app for Windows, macOS, and Linux |

---

## 🎛️ Supported Microcontrollers

| Microcontroller | Language(s) | Status |
|---|---|---|
| **Raspberry Pi Pico / Pico W** | MicroPython / CircuitPython | ✅ Supported |
| **ESP32 / ESP8266** | C / C++ / MicroPython | ✅ Supported |
| **Arduino Uno / Nano / Mega** | C / C++ | ✅ Supported |
| **STM32** | C / C++ | ✅ Supported |

> More microcontrollers will be added in future releases. Community contributions are welcome!

---

## 🧠 AI Integration

Stratum Studio gives you the power to choose your own AI backend. Simply add your API key in settings and the AI assistant is ready to:

- ✅ Generate code for your specific microcontroller
- ✅ Explain errors and suggest fixes
- ✅ Answer embedded systems questions in context
- ✅ Help you understand libraries and peripherals
- ✅ Write and optimize logic on demand

**Supported AI Providers:**
- Google Gemini
- OpenAI (GPT-4)
- Anthropic (Claude)

> Your API key is stored locally on your machine and never sent to any external server by Stratum Studio.

---

## 🛠️ Tech Stack

```
Frontend     → React + TypeScript + Vanilla CSS
Editor       → Monaco Editor (VS Code engine)
Desktop App  → Electron
Package Mgr  → npm
Build Tool   → Vite
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) `v9+`
- [Git](https://git-scm.com/)

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/shaurya-crypto/stratum-studio.git

# 2. Navigate into the project directory
cd stratum-studio

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Build for Production

```bash
# Build for your current platform
npm run build
```

---

## 🖥️ Usage

1. **Launch Stratum Studio** from the desktop or via dev environment
2. **Select your microcontroller** from the toolbar
3. **Choose your language** (auto-detected based on MCU)
4. **Write your code** in the Monaco-powered editor
5. **Ask the AI** anything — paste errors, request snippets, or ask for explanations
6. **Flash / Upload** your code to the connected device

---

## 📁 Project Structure

```
stratum-studio/
├── src/
│   ├── main/             # Electron main process
│   ├── renderer/         # React UI application
│   └── preload/          # Electron bridge
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
├── package.json
└── README.md
```

---

## 🤝 Contributing

Contributions are what make the open-source community amazing. All contributions are welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Shaurya Prabhakar**

[![GitHub](https://img.shields.io/badge/GitHub-shaurya--crypto-181717?style=flat-square&logo=github)](https://github.com/shaurya-crypto)

---

<div align="center">

Made with ❤️ for the embedded systems community

⭐ **Star this repo** if you find it useful!

</div>
