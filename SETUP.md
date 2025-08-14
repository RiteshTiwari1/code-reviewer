# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Set API Key
```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your OpenAI API key:
OPENAI_API_KEY=sk-your-openai-key-here
```

## 3. Build & Run
```bash
# Build
npm run build

# Run with example
npm run start example-input.json
```

## 4. Test Different Models
```bash
# Use different model
npm run start example-input.json --model gpt-3.5-turbo

# Or set in .env
OPENAI_MODEL=gpt-4o
```

## Expected Output
The tool will generate a Markdown report with empathetic feedback for each harsh comment.