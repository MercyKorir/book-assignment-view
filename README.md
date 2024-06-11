# Book Assignment View

The Book Assignment View is a web application built with React, TypeScript, and Material-UI (MUI) Components that allows teachers to assign books to students. It is part of the web viewer product.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Deployment](#deployment)

## Features

1. **Search Bar:** Users can search for books by title using a search bar.
2. **Search Results:** A list of search results displays the book title, author, and a button to add the book to a student's reading list.
3. **Student List:** Teachers can view a list of their students.
4. **Student Reading List:** Each student has their own reading list where teachers can add or remove books.
5. **Responsive Design:** The application is designed to be responsive and accessible on various devices and screen sizes.

## Technologies

- ReactJS
- TypeScript
- Material-UI (MUI)
- GraphQL

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository: `git clone https://github.com/MercyKorir/book-assignment-view.git`
2. Install backend dependencies: `cd backend && npm install`
3. Start the GraphQL server: `npm start`
4. Install frontend dependencies: `cd ../frontend && npm install`
5. Open
   `../frontend/src/apolloClient.ts`
   replace the uri with:
   `uri: "http://localhost:4000/",`
6. Start the React development server: `npm start`
7. Open the application in your browser: `http://localhost:3000`

## Deployment

The Book Assignment View application is deployed and accessible at [[book-assignment-view](https://book-assignment-view.netlify.app/)]. You can explore the live application and its features directly.
