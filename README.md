# String Analyzer Service

A RESTful API service that analyzes strings and stores their computed properties.

## Quick Setup from Scratch

```bash
# 1. Create project directory
mkdir string-analyzer-service
cd string-analyzer-service

# 2. Initialize npm project
npm init -y

# 3. Install dependencies
npm install express cors helmet dotenv

# 4. Install dev dependencies
npm install -D typescript @types/node @types/express @types/cors ts-node-dev

# 5. Create tsconfig.json
npx tsc --init

# 6. Create folder structure
mkdir -p src/{controllers,middleware,routes,storage,types,utils}

# 7. Create all the files from the artifact
# Copy each file section into its respective location

# 8. Update package.json scripts section with:
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}

# 9. Run the development server
npm run dev
```

## Setup

```bash
# Install dependencies (if cloning existing project)
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### 1. Create/Analyze String
```
POST /api/strings
Content-Type: application/json

{
  "value": "string to analyze"
}
```

### 2. Get Specific String
```
GET /api/strings/{string_value}
```

### 3. Get All Strings with Filtering
```
GET /api/strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a
```

### 4. Natural Language Filtering
```
GET /api/strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings
```

### 5. Delete String
```
DELETE /api/strings/{string_value}
```

## Example Usage

```bash
# Create a string
curl -X POST http://localhost:3000/api/strings \
  -H "Content-Type: application/json" \
  -d '{"value": "racecar"}'

# Get all palindromes
curl "http://localhost:3000/api/strings?is_palindrome=true"

# Natural language query
curl "http://localhost:3000/api/strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings"

# Delete a string
curl -X DELETE "http://localhost:3000/api/strings/racecar"
```

## Project Structure

```
src/
├── controllers/      # Request handlers
├── middleware/       # Express middleware
├── routes/          # API routes
├── storage/         # Data storage layer
├── types/           # TypeScript interfaces
├── utils/           # Helper functions
└── index.ts         # Application entry point
```

## Technologies

- **Express.js**: Web framework
- **TypeScript**: Type-safe development
- **Node.js**: Runtime environment
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing