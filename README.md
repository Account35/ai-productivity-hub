# AI Workplace Productivity Assistant

## Project Overview

**AI Workplace Productivity Assistant** is a modern, responsive web application designed to help professionals complete common workplace tasks using artificial intelligence.

The application provides AI-powered tools for generating professional emails, researching and summarising information, and interacting with an AI workplace assistant. It is designed with a clean SaaS-style interface and focuses on making everyday workplace tasks faster and easier.

The application is built as a **frontend-focused project** without a traditional backend or database.

---

## Features Implemented

### Smart Email Generator

* Generate professional workplace emails using AI.
* Support multiple writing tones:

  * Formal
  * Friendly
  * Persuasive
* Users can provide the purpose and details of the email.
* Generated responses can be edited.
* Copy generated emails to the clipboard.

### AI Research Assistant

* Enter a research topic or question.
* Paste article or website content for analysis.
* Summarise provided information using AI.
* Generate key insights and important points.
* Provide practical recommendations.
* Edit and copy AI-generated research results.

### AI Workplace Chatbot

* Interactive AI chat interface.
* Users can enter workplace-related questions and prompts.
* AI generates responses dynamically.
* Conversation-style interface.
* Responses can be copied and edited where applicable.

### Dashboard

* Modern SaaS-style dashboard.
* Sidebar navigation.
* Quick access to AI productivity tools.
* Responsive layout for desktop and mobile devices.
* Clean light-grey, white, and dark visual design.

### Responsible AI

* Includes a responsible AI disclaimer.
* Reminds users to review AI-generated information before using it professionally.
* Designed to support users rather than replace professional judgement.

---

## Technologies and Tools Used

* **React** – Frontend application framework
* **TypeScript** – Type-safe application development
* **Vite** – Development server and build tool
* **Tailwind CSS** – Responsive styling and UI design
* **AI API** – AI-generated workplace responses
* **Lucide Icons** – Interface icons
* **Git & GitHub** – Version control and project hosting
* **Lovable** – Application development and prototyping

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-workplace-productivity-assistant.git
```

### 2. Navigate to the Project

```bash
cd ai-workplace-productivity-assistant
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

If the application requires an AI API key, create a `.env` file in the project root:

```env
VITE_AI_API_KEY=your_api_key_here
```

Do not commit API keys or other sensitive credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite, usually:

```text
http://localhost:5173
```

### 6. Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

---

## Project Structure

```text
ai-workplace-productivity-assistant/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## Usage

After starting the application, users can:

1. Open the dashboard.
2. Select **Email Generator** to create professional emails.
3. Select **Research Assistant** to analyse topics or content.
4. Select **AI Chat** to interact with the workplace assistant.
5. Edit, copy, and review AI-generated outputs before using them.

---

## Responsible AI Notice

AI-generated content may contain errors, incomplete information, or inappropriate recommendations. Users should review and verify AI-generated outputs before using them for important workplace, professional, legal, financial, or business decisions.

---

## Author

**Lwando Ntlemeza**

GitHub: `https://workmate-buddy-67.lovable.app/`

---

## License

This project is intended for educational, demonstration, and portfolio purposes.
