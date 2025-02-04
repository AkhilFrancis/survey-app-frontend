# Survey Management Frontend

This is the frontend application for the Survey Management System. It is built using React and interacts with the Survey Management backend API.

## Features

- View list of available surveys.
- View survey details and submit responses.
- View submitted responses for a survey.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/akhilfrancis/survey-management-frontend.git
cd survey-management-frontend
\`\`\`

2. Install the dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Running the Application

To run the application in development mode, use:

\`\`\`bash
npm start
# or
yarn start
\`\`\`

The application will start on `http://localhost:3000`.

### Building for Production

To build the application for production, use:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

The build output will be located in the `build` directory.

### Running Tests

To run the tests, use:

\`\`\`bash
npm test
# or
yarn test
\`\`\`

## Project Structure

- \`src/components\`: Contains React components.
- \`src/services\`: Contains API service functions.
- \`src/App.js\`: Main application component.
- \`src/index.js\`: Entry point for the React application.

## Environment Variables

Create a `.env` file in the root directory to define environment variables:

\`\`\`
REACT_APP_API_URL=http://localhost:4000/api
\`\`\`

Replace `http://localhost:4000/api` with the URL of your backend API.
