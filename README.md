# AI Workplace Productivity Assistant

An AI-powered workplace productivity tool designed to help professionals complete everyday tasks faster and more efficiently.

The application provides a simple, modern SaaS-style interface for generating professional emails, researching and summarising information, and interacting with an AI workplace assistant.

> **Note:** This project is frontend-only and does not require user authentication, a backend, or a database.

---

## 🚀 Project Overview

The **AI Workplace Productivity Assistant** brings common workplace productivity tasks into one application.

Users can:

* Generate professional workplace emails.
* Choose different email tones.
* Research and summarise topics or provided content.
* Extract key insights and recommendations.
* Interact with an AI workplace chatbot.
* Edit and copy AI-generated responses.

The application focuses on providing a clean and intuitive user experience while keeping the technical architecture lightweight.

---

## ✨ Features Implemented

### 📧 Smart Email Generator

* Generate professional workplace emails.
* Supports three tones:

  * Formal
  * Friendly
  * Persuasive
* Editable AI-generated output.
* Copy generated email content.
* Regenerate responses.
* Clear input and output.

### 🔎 AI Research Assistant

* Enter a topic, question, or article content.
* Generate summaries.
* Extract key insights.
* Generate recommendations.
* Edit generated content.
* Copy results.
* Regenerate responses.

### 💬 AI Workplace Chatbot

* Interactive workplace AI assistant.
* Chat-based user interface.
* Responds to workplace productivity prompts.
* Suggested prompts for common tasks.
* Clear conversation functionality.

### 🎨 User Interface

* Modern SaaS-style dashboard.
* Responsive design.
* Sidebar navigation.
* Light grey and dark colour palette.
* Clean and professional interface.
* Editable AI outputs.
* Responsive layouts for different screen sizes.
* Responsible AI disclaimer.

---

## 🛠️ Technologies and Tools Used

| Technology / Tool              | Purpose                             |
| ------------------------------ | ----------------------------------- |
| **React**                      | Frontend application development    |
| **JavaScript / TypeScript**    | Application logic                   |
| **HTML5**                      | Application structure               |
| **CSS**                        | Styling and responsive design       |
| **Lovable**                    | AI-assisted application development |
| **AI API / Mock AI Responses** | AI functionality                    |
| **Git**                        | Version control                     |
| **GitHub**                     | Source code hosting                 |

---

## 📋 Requirements

Before running the project locally, make sure you have:

* [Node.js](https://nodejs.org/) installed.
* npm installed.
* Git installed.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd ai-workplace-productivity-assistant
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

After starting the development server, open the local URL displayed in your terminal.

Typically:

```text
http://localhost:5173
```

---

## 🔐 Application Architecture

This application is intentionally designed without:

* ❌ Backend services
* ❌ Database
* ❌ User authentication
* ❌ Login or registration
* ❌ User accounts
* ❌ Payment systems

The application runs primarily on the frontend and is designed to remain lightweight and suitable for development using the free Lovable plan.

---

## 🤖 AI Functionality

The application can use AI-generated responses for its productivity tools.

Where an external AI API is not configured, **mock responses** can be used to demonstrate and test the application's functionality.

If an AI API is connected, API credentials should be stored securely and should **never be committed directly to the GitHub repository**.

---

## 🧠 Responsible AI

AI-generated content should always be reviewed by the user before being used for important workplace communications, research, or decisions.

The AI Workplace Productivity Assistant is intended to support productivity and does not replace human judgement or professional expertise.

---

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The interface adapts to different screen sizes while maintaining usability and accessibility.

---

## 📂 Project Structure

```text
ai-workplace-productivity-assistant/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── assets/
│   ├── App.*
│   └── main.*
│
├── package.json
├── README.md
└── ...
```

> The exact project structure may vary depending on the Lovable-generated application.

---

## 🌐 Deployment

The application can be deployed using frontend hosting platforms such as:

* Lovable
* Netlify
* Vercel
* GitHub Pages

No dedicated backend server is required for the frontend-only version.

---

## 📄 License

This project was created as a workplace productivity application and learning project.
