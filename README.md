# 🔗 ShortLink — URL Shortener

<p align="center">

### ⚡ Fast • Secure • Smart URL Shortening

A full-stack URL shortening platform built with a modern **Frontend + REST API + MongoDB** architecture.

Convert long URLs into short, shareable links and manage them through a clean web interface.

<p align="center">
  <a href="https://url-shortner-nine-gray.vercel.app/">
    <strong>🚀 Live Demo</strong>
  </a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/Prashant-Dayal/URL-Shortner">
    <strong>💻 Source Code</strong>
  </a>
</p>

<p align="center">

![GitHub repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge\&logo=github)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Backend](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![API](https://img.shields.io/badge/API-Express.js-000000?style=for-the-badge\&logo=express)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Deployment](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge\&logo=vercel)
![Deployment](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge\&logo=render\&logoColor=black)

</p>

---



# ✨ Features

<table>
<tr>
<td width="50%">

### 🔗 URL Shortening

Convert long URLs into compact, easy-to-share short links.

</td>

<td width="50%">

### ⚡ Fast Redirection

Short links redirect users to their original destination.

</td>
</tr>

<tr>
<td>

### 👤 User Authentication

Users can authenticate and access user-specific functionality.

</td>

<td>

### 📋 URL Management

Keep track of shortened URLs associated with your account.

</td>
</tr>

<tr>
<td>

### 🗄️ Persistent Storage

URL information is stored in MongoDB instead of temporary browser storage.

</td>

<td>

### 🌐 REST API

Frontend and backend communicate through RESTful API requests.

</td>
</tr>

<tr>
<td>

### 🔐 Environment Configuration

Sensitive credentials and deployment configuration are handled through environment variables.

</td>

<td>

### ☁️ Cloud Deployment

Frontend and backend are deployed independently using Vercel and Render.

</td>
</tr>
</table>

---

# 🎯 Why ShortLink?

Long URLs are difficult to read, share, and manage.

ShortLink provides a simple workflow:

```text
Long URL
   │
   ▼
┌────────────────────┐
│     ShortLink      │
│   URL Generator    │
└─────────┬──────────┘
          │
          ▼
   Short URL Created
          │
          ▼
      Share Link
          │
          ▼
   Original Website
```

### Example

```text
Original URL

https://example.com/products/electronics/smartphones/product-details

                         ↓

Short URL

https://your-domain.com/aB92x
```

When the short URL is opened, the backend finds the corresponding original URL and redirects the user.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       USER          │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │   REACT FRONTEND    │
                         │       Vercel        │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │   EXPRESS SERVER    │
                         │      Node.js        │
                         │       Render        │
                         └──────────┬──────────┘
                                    │
                          ┌─────────┴─────────┐
                          │                   │
                          ▼                   ▼
                ┌─────────────────┐  ┌─────────────────┐
                │  Authentication │  │ URL Controller  │
                │    Middleware   │  │  & Shortener    │
                └─────────────────┘  └────────┬────────┘
                                               │
                                               ▼
                                     ┌──────────────────┐
                                     │     MongoDB      │
                                     │    Database      │
                                     └──────────────────┘
```

---

# 🔄 How It Works

## 1. Enter URL

The user enters a long URL through the frontend.

```text
User
 │
 ▼
Long URL
```

---

## 2. Frontend Request

The React application sends the URL to the backend API.

```text
React Frontend
      │
      │ POST Request
      ▼
Express REST API
```

---

## 3. URL Processing

The backend validates the request and generates a unique short identifier.

```text
Original URL
     │
     ▼
Validation
     │
     ▼
Generate Short Code
```

---

## 4. Database Storage

The URL mapping is stored in MongoDB.

```text
┌───────────────┬───────────────────────────────┐
│ Short Code    │ Original URL                  │
├───────────────┼───────────────────────────────┤
│ aB92x         │ https://example.com/long-url  │
└───────────────┴───────────────────────────────┘
```

---

## 5. Short URL Response

The backend returns the generated short URL.

```text
Backend
   │
   ▼
Short URL
   │
   ▼
Frontend
```

---

## 6. Redirect

When a user visits the short URL:

```text
Short URL
    │
    ▼
Backend
    │
    ▼
Find Short Code
    │
    ▼
MongoDB
    │
    ▼
Original URL
    │
    ▼
HTTP Redirect
    │
    ▼
Destination Website
```

---

# 🔐 Authentication Flow

The application supports authenticated user functionality.

```text
             USER
               │
               ▼
        Register / Login
               │
               ▼
        Authentication API
               │
               ▼
        Verify Credentials
               │
               ▼
       Authentication Token
               │
               ▼
       Protected Operations
               │
               ▼
       User-specific URLs
```

Authentication allows URL information to be associated with the appropriate user.

---

# 🧩 Tech Stack

## Frontend

| Technology    | Purpose           |
| ------------- | ----------------- |
| ⚛️ React      | User interface    |
| JavaScript    | Application logic |
| HTML5         | Page structure    |
| CSS3          | Styling           |
| Axios / Fetch | API communication |

## Backend

| Technology    | Purpose                             |
| ------------- | ----------------------------------- |
| 🟢 Node.js    | JavaScript runtime                  |
| 🚂 Express.js | REST API server                     |
| JavaScript    | Backend logic                       |
| Middleware    | Request processing & authentication |

## Database

| Technology | Purpose                 |
| ---------- | ----------------------- |
| 🍃 MongoDB | Persistent data storage |
| Mongoose   | MongoDB object modeling |

## Deployment

| Platform   | Component |
| ---------- | --------- |
| ▲ Vercel   | Frontend  |
| 🚀 Render  | Backend   |
| 🍃 MongoDB | Database  |

---

# 📡 API Documentation

> **Note:** Update the endpoint paths below to exactly match the routes implemented in the current backend.

## Base URL

```text
https://<your-render-backend-domain>
```

---

## 🔗 Create Short URL

### `POST /api/<shorten-route>`

Creates a new shortened URL.

### Request

```json
{
  "url": "https://example.com/very-long-url"
}
```

### Response

```json
{
  "success": true,
  "shortUrl": "https://your-domain.com/aB92x"
}
```

### Workflow

```text
Client
  │
  │ POST URL
  ▼
Backend
  │
  ├── Validate URL
  │
  ├── Generate Short Code
  │
  └── Save Mapping
        │
        ▼
      MongoDB
        │
        ▼
  Short URL Response
```

---

## 🔀 Redirect Short URL

### `GET /<short-code>`

Redirects the user to the original URL.

### Example

```text
GET /aB92x
```

### Server workflow

```text
/aB92x
   │
   ▼
Find aB92x
   │
   ▼
MongoDB
   │
   ▼
Original URL
   │
   ▼
Redirect
```

---

## 👤 Register User

### `POST /api/<register-route>`

Creates a new user account.

### Example Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "********"
}
```

---

## 🔑 Login User

### `POST /api/<login-route>`

Authenticates an existing user.

### Example Request

```json
{
  "email": "john@example.com",
  "password": "********"
}
```

---

## 📋 Get User URLs

### `GET /api/<user-url-route>`

Retrieves URLs associated with the authenticated user.

Example response:

```json
{
  "success": true,
  "urls": [
    {
      "shortCode": "aB92x",
      "originalUrl": "https://example.com"
    }
  ]
}
```

---

# 📂 Project Structure

```text
URL-Shortner/
│
├── BACKEND/
│   │
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── FRONTEND/
│   │
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── package.json
│   └── .env
│
├── screenshots/
│   ├── home.png
│   ├── login.png
│   ├── shorten-url.png
│   └── dashboard.png
│
├── .gitignore
└── README.md
```

---

# 🚀 Local Development

## Prerequisites

Install:

* Node.js
* npm
* MongoDB or MongoDB Atlas
* Git

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Prashant-Dayal/URL-Shortner.git

cd URL-Shortner
```

---

## 2️⃣ Backend Setup

```bash
cd BACKEND
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

Open another terminal:

```bash
cd FRONTEND
npm install
```

Configure the backend API URL:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

# ☁️ Deployment Architecture

The application uses independent frontend and backend deployments.

```text
                     INTERNET
                         │
                         ▼
              ┌─────────────────────┐
              │       Vercel        │
              │ React Frontend      │
              └──────────┬──────────┘
                         │
                         │ HTTPS API
                         ▼
              ┌─────────────────────┐
              │       Render        │
              │ Node + Express API  │
              └──────────┬──────────┘
                         │
                         │ MongoDB Driver
                         ▼
              ┌─────────────────────┐
              │      MongoDB        │
              │ Persistent Storage  │
              └─────────────────────┘
```

### Production URLs

**Frontend**

```text
https://url-shortner-nine-gray.vercel.app/
```

**Backend**

```text
Your Render backend URL
```

---

# 🔑 Environment Variables

## Backend

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

## Frontend

```env
VITE_API_URL=your_backend_url
```

### Security

Never commit:

```text
.env
.env.local
.env.production
```

to GitHub.

Never expose:

```text
MongoDB credentials
JWT secrets
API keys
Private tokens
Database passwords
```

---

# 🧪 Example End-to-End Flow

```text
┌───────────────────────────────────────────┐
│ 1. User enters a long URL                 │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 2. React sends request to Express API     │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 3. Backend validates the URL              │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 4. Generate unique short code             │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 5. Save URL mapping in MongoDB            │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 6. Return short URL                       │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 7. User shares short URL                  │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 8. Backend resolves short code            │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│ 9. Redirect to original destination       │
└───────────────────────────────────────────┘
```

---

# 📊 Core Data Model

A typical URL record can be represented as:

```text
URL Document
│
├── originalUrl
├── shortCode
├── createdBy
├── createdAt
└── updatedAt
```

User information can be represented as:

```text
User Document
│
├── name
├── email
├── password / password hash
└── createdAt
```

> Keep this section synchronized with the actual Mongoose schemas in the project.

---

# ⚙️ Engineering Highlights

This project demonstrates practical full-stack engineering concepts:

* Component-based React development
* REST API design
* Client-server communication
* CRUD operations
* MongoDB database integration
* Mongoose data modeling
* Authentication
* Middleware
* URL validation
* Dynamic URL redirection
* Environment-based configuration
* Production deployment
* Frontend/backend separation
* Cloud deployment architecture

---

# 🛡️ Security Considerations

The application is designed around several basic security practices:

### Environment Protection

Sensitive credentials are stored through environment variables rather than hard-coded into source files.

### Authentication

Protected operations can be restricted to authenticated users.

### Input Validation

Submitted URLs should be validated before being stored or processed.

### Database Security

Production database credentials should remain private and should never be committed to the repository.

---

# 📈 Future Improvements

Potential enhancements for future versions include:

* 📊 Click analytics
* 📈 URL performance dashboard
* 📱 QR-code generation
* 🎨 Custom short aliases
* ⏳ Expiring links
* 🔒 Password-protected links
* 🗑️ URL deletion
* ✏️ Custom URL editing
* 🌍 Custom domains
* 📅 Link creation history
* 🌙 Dark mode
* 📤 Social sharing
* 🚦 Rate limiting
* 🧪 Automated testing
* 🔄 CI/CD pipeline

---

# 💼 Portfolio Highlights

### What this project demonstrates

```text
                    FULL-STACK DEVELOPMENT
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
         Frontend          Backend         Database
          React           Node/Express     MongoDB
            │                │                │
            └────────────────┼────────────────┘
                             │
                             ▼
                       REST APIs
                             │
                             ▼
                     Authentication
                             │
                             ▼
                         Deployment
                       Vercel + Render
```

This project demonstrates the ability to build, connect, and deploy a complete full-stack application rather than only an isolated frontend or backend.

---

# 🌐 Live Application

<p align="center">

<a href="https://url-shortner-nine-gray.vercel.app/">

<img src="https://img.shields.io/badge/🚀%20OPEN%20LIVE%20DEMO-URL%20SHORTNER-000000?style=for-the-badge" alt="Live Demo"/>

</a>

</p>

**Live:** https://url-shortner-nine-gray.vercel.app/

---

# 💻 Repository

<p align="center">

<a href="https://github.com/Prashant-Dayal/URL-Shortner">

<img src="https://img.shields.io/badge/VIEW%20SOURCE%20CODE-GitHub-181717?style=for-the-badge&logo=github" alt="GitHub Repository"/>

</a>

</p>

---

# 👨‍💻 Author

## Prashant Dayal

**Full-Stack Developer**

Building web applications using modern JavaScript technologies and full-stack development practices.

---

# ⭐ Show Your Support

If you found this project useful or interesting, consider giving the repository a ⭐.

<p align="center">

### 🔗 Short URLs. Simple Sharing. Full-Stack Engineering.

</p>

---

## 📄 License

This project is intended for learning, development, and portfolio purposes.

