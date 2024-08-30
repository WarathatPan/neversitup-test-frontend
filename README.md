# My Todo App Project

## Overview

This project is a Next.js application that demonstrates the usage of React, TypeScript, and various other libraries to create a functional web application. The project includes features such as CRUD operations, custom layouts, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [License](#license)

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/WarathatPan/neversitup-test-frontend.git
   cd neversitup-test-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project and add the following:

   ```plaintext
   NEXT_PUBLIC_API_URL=<Your API URL>
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

This project includes several key features, including:

1. **CRUD Operations**:
   - You can create, read, update, and delete records via the provided UI.

2. **Custom Layouts**:
   - The project uses custom layouts for different pages, implemented in `Layouts`.

3. **React Hooks**:
   - Utilizes custom hooks for managing data fetching and other side effects.

## Project Structure

The project is organized as follows:

```plaintext
├── public/                     
├── src/                        
│   ├── __tests__/              
│   ├── assets/                 
│   │   ├── icons/
│   │   │   └── ...            
│   │   ├── images/  
│   │   │   └── ...           
│   ├── components/     
│   │    └── ...         
│   ├── context/                
│   ├── hooks/                  
│   ├── layouts/      
│   │    └── ...           
│   ├── pages/                  
│   │   ├── _app.tsx            
│   │   ├── _document.tsx       
│   │   └── ...          
│   ├── services/ 
│   │   └── ...          
│   ├── styles/ 
│   │   └── ...          
│   ├── types/                  
│   │   └── ...          
│   └── utils/                  
│       └── ...          
├── .env                        
├── .eslintrc.json             
├── .gitignore                  
├── next.config.mjs             
├── package.json                
├── README.md                   
└── tsconfig.json               
```

## Available Scripts

- **`npm run dev`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm run start`**: Starts the production build of the app.
- **`npm run lint`**: Lints the codebase using ESLint.
- **`npm run test`**: Runs tests for the application.

## Features

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: The React framework for production, featuring SSR and static site generation.
- **TypeScript**: Adds static typing to JavaScript, improving code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
