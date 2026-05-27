# Octofit Tracker

## Overview

The Octofit Tracker is a multi-tier application designed to help users track their fitness activities, manage teams, and receive personalized workout suggestions. The application consists of a backend built with Node.js and Express, and a frontend developed using React.

## Features

- User authentication and profiles
- Activity logging and tracking
- Team creation and management
- Competitive leaderboard
- Personalized workout suggestions

## Project Structure

```plaintext
octofit-tracker/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   └── models/
│   │       └── user.ts
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── routes/
    │       └── index.tsx
    ├── package.json
    └── tsconfig.json
```

## Setup Instructions

### Prerequisites

- Node.js (LTS)
- MongoDB (`mongodb-org`)
- npm or yarn

### Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the MongoDB service:

   ```bash
   sudo service mongod start
   ```

4. Run the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

## Usage

- Access the frontend application at `http://localhost:5173`.
- The backend API can be accessed at `http://localhost:8000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.