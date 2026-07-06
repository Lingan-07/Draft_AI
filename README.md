# AI Draft Assistant

AI Draft Assistant is a full-stack web application that helps users generate professional emails and messages using Google Gemini AI. It provides AI-powered writing assistance, draft version history, reusable drafts, template management, authentication, and role-based access control.

---

## Features

### User Features

- User Registration & Login (JWT Authentication)
- Create Drafts
- AI Draft Generation
- Rewrite Existing Drafts
- Improve Draft
- Expand Draft
- Shorten Draft
- Change Tone
- Manual Draft Editing
- Copy Generated Draft
- Version History
- Search Drafts
- Reuse Previous Drafts
- Profile Management
- Dashboard Statistics

### Admin Features

- Admin Login
- Dashboard
- Create Templates
- Update Templates
- Delete Templates
- Activate/Deactivate Templates
- View All Templates

---

# Tech Stack

## Frontend

- React.js
- Material UI
- React Router DOM
- Axios
- React Hook Form
- React Hot Toast
- Context API

## Backend

- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Pydantic
- JWT Authentication

## AI

- Google Gemini 2.5 Flash

---

# Project Architecture

## Frontend

```
React
│
├── Components
├── Pages
├── Context
├── Hooks
├── API
├── Routes
└── Layouts
```

## Backend

```
Router
    │
    ▼
Dependency
(Authentication)
    │
    ▼
Service Layer
(Business Logic)
    │
    ▼
Repository Layer
(Database Queries)
    │
    ▼
SQLAlchemy Models
    │
    ▼
PostgreSQL
```

---

# Folder Structure

## Frontend

```
src/
├── api/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── theme/
└── utils/
```

## Backend

```
app/
├── core/
├── dependencies/
├── models/
├── repositories/
├── routers/
├── schemas/
├── services/
└── utils/
```

---

# Database Tables

### Users

Stores registered users.

| Column |
|---------|
| id |
| name |
| email |
| password |
| role |

---

### Drafts

Stores the latest version of each draft.

| Column |
|---------|
| id |
| user_id |
| title |
| message_type |
| tone |
| rough_points |
| subject |
| body |
| status |

---

### Draft Versions

Stores all previous versions of drafts.

| Column |
|---------|
| id |
| draft_id |
| version_no |
| tone |
| subject |
| body |

---

### AI Generation Logs

Stores AI generation history.

| Column |
|---------|
| id |
| draft_id |
| user_id |
| input_text |
| output_text |
| model_name |

---

### Message Templates

Stores predefined prompt templates.

| Column |
|---------|
| id |
| template_name |
| message_type |
| default_tone |
| prompt_text |
| is_active |

---

# Authentication Flow

```
User Login
      │
      ▼
FastAPI
      │
      ▼
JWT Token Generated
      │
      ▼
React Stores Token
(Local Storage)
      │
      ▼
Axios Interceptor
      │
      ▼
Authorization Header
      │
      ▼
Protected APIs
```

---

# AI Generation Flow

```
User Creates Draft
        │
        ▼
Generate Button
        │
        ▼
FastAPI Router
        │
        ▼
Draft Service
        │
        ▼
Prompt Builder
        │
        ▼
Google Gemini 2.5 Flash
        │
        ▼
JSON Response
        │
        ▼
Save Draft
        │
        ▼
Create Version
        │
        ▼
Save AI Log
        │
        ▼
Display Result
```

---

# API Modules

### Authentication

- Register
- Login
- Current User

### Draft

- Create Draft
- Get All Drafts
- Get Draft
- Update Draft
- Delete Draft
- Search Drafts
- Reuse Draft
- Version History

### AI Operations

- Generate
- Rewrite
- Improve
- Expand
- Shorten
- Change Tone

### Dashboard

- User Dashboard
- Admin Dashboard

### Templates

- Create Template
- Update Template
- Delete Template
- List Templates

---

# Frontend Components

Reusable components include:

- AppTextField
- AppTextArea
- AppSelect
- Loader
- EmptyState
- SearchBar
- StatusChip
- PageHeader
- PrimaryButton
- SecondaryButton
- ThemeToggle

---

# Design Patterns Used

- Layered Architecture
- Repository Pattern
- Dependency Injection
- Context API
- Reusable Component Pattern

---

# Security

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Protected Routes
- Admin Route Protection
- Request Validation using Pydantic

---

# AI Features

- Professional Email Generation
- Grammar Improvement
- Content Expansion
- Content Shortening
- Tone Modification
- Rewrite Draft
- Prompt Engineering
- JSON Response Validation

---

# Version Control

Every time a user:

- Generates
- Rewrites
- Improves
- Expands
- Shortens
- Changes Tone
- Manually Edits

A new draft version is automatically created.

---

# Search

Users can search drafts by:

- Title
- Subject
- Body

---

# Future Enhancements

- Send Emails Directly
- Rich Text Editor
- AI Chat Assistant
- Multi-language Support
- PDF Export
- Email Scheduling
- Team Collaboration
- AI Suggestions
- Auto Save
- Refresh Tokens
- HttpOnly Cookie Authentication

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ai-draft-assistant.git
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

Swagger Documentation:

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

Backend

```
DATABASE_URL=

SECRET_KEY=

ALGORITHM=

ACCESS_TOKEN_EXPIRE_MINUTES=

GEMINI_API_KEY=
```

Frontend

```
VITE_API_BASE_URL=http://localhost:8000
```

---

# Developed By

**Lingan**


AI Draft Assistant using React, FastAPI, PostgreSQL and Google Gemini AI.
