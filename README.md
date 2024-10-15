# Tictactrip API

## Description

Tictactrip API is a RESTful API built with TypeScript and Node.js that justifies a given text based on a specified line length. It features token-based authentication and rate limiting.

## Features

- **Text Justification**: Adjusts text to a specified line length.
- **Token-based Authentication**: Secure access via JWT.
- **Rate Limiting**: 80,000 words per token per day.
- **Deployment**: Hosted on Vercel.

## Requirements

- Node.js (version 14 or later)
- npm (Node Package Manager)

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MazenSghaier/Tictactrip.git
   cd Tictactrip
2. Install dependencies:
   ```bash
   npm install
3. Environment Variables
Create a .env file in the root of the project and add the following line:
   ```bash
   JWT_SECRET=your_secret_key_here
4. Running the Development Server
   4.1 Start the server in development mode:
      ```bash
      npm run dev
Access the server at http://localhost:3000.

### API Endpoints
   1. Generate Token
   Endpoint: POST /api/token
   Request Body:
      ```bash
      {
        "email": "your_email@example.com"
      }
   Response:
      ```bash
      {
        "token": "your_jwt_token_here"
      }
2. Justify Text
Endpoint: POST /api/justify
Request Body: Plain text (Content-Type: text/plain).
Headers:
makefile
Copy code
Authorization: Bearer your_jwt_token_here
Response: Justified text in plain text format.
## Rate Limiting
Tokens are limited to 80,000 words per day. Exceeding this limit will return:
      ```bash
      {
        "error": "Payment required: daily limit exceeded"
      }

## Deployment
The API is deployed at:

Production URL: https://tictaptrip-c0nbsden1-mazen-sghaiers-projects.vercel.app
Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the ISC License.

python
Copy code

### Customization

You can modify the project description, installation instructions, or any other sections to match your project details. Let me know if you need any more changes or additions!
