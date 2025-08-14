# Empathetic Code Reviewer

**Tagline:** *Transforming Critical Feedback into Constructive Growth*

An AI-powered CLI tool that transforms harsh, critical code review comments into empathetic, educational feedback that encourages growth and learning.

## 🎯 Mission

This tool addresses the communication gap in code reviews by acting as a bridge between critical feedback and supportive mentorship. It helps create a more positive learning environment for developers at all levels.

## 🏗️ Problem-Solving Approach

### **Hackathon Mission**: Empathetic Code Reviewer
**Goal**: Transform harsh code review comments into empathetic, educational feedback using AI.

### **Technical Strategy**:
1. **Input Processing**: Parse JSON with code snippets and review comments
2. **AI Integration**: Use OpenAI's GPT models with sophisticated prompt engineering  
3. **Output Generation**: Create structured Markdown reports with empathetic feedback
4. **Architecture**: Clean TypeScript CLI tool with modular design

### **Key Design Decisions**:
- **Prompt Engineering**: Crafted specific prompts to ensure empathetic, educational responses
- **Fallback Handling**: Graceful error recovery with default responses
- **Flexibility**: Support for different AI models via environment variables
- **User Experience**: Clean CLI with progress feedback and clear error messages

## ✨ Features

- **Empathetic Rephrasing**: Transforms harsh comments into encouraging feedback
- **Educational Explanations**: Provides clear "why" behind each suggestion
- **Code Improvements**: Offers concrete examples of better implementations
- **Holistic Summary**: Generates encouraging overall assessment
- **Professional Output**: Clean Markdown reports ready for sharing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (get from https://platform.openai.com/account/api-keys)

### Installation

```bash
# Clone and setup
cd empathetic-code-reviewer
npm install
npm run build
```

### Usage

```bash
# Method 1: Using .env file (recommended)
cp .env.example .env
# Edit .env and add your OpenAI API key: OPENAI_API_KEY=your_openai_key

# Run the tool
npm run start input.json

# Method 2: Environment variable
export OPENAI_API_KEY="sk-your-openai-key"
npm run start input.json

# Method 3: CLI argument
npm run start input.json --api-key "sk-your-openai-key"

# Development mode
npm run dev input.json
```

### Input Format

Create a JSON file with your code snippet and review comments:

```json
{
  "code_snippet": "def get_active_users(users):\n  results = []\n  for u in users:\n    if u.is_active == True and u.profile_complete == True:\n      results.append(u)\n  return results",
  "review_comments": [
    "This is inefficient. Don't loop twice conceptually.",
    "Variable 'u' is a bad name.", 
    "Boolean comparison '== True' is redundant."
  ]
}
```

### Example Output

```markdown
# Empathetic Code Review Analysis

### Analysis 1: "This is inefficient. Don't loop twice conceptually."

**✨ Positive Rephrasing:** Great start on the logic here! For better performance, especially with large user lists, we can make this more efficient by combining the checks.

**🔍 The 'Why':** Iterating through a list and performing checks can become slow as the list grows. By using more direct methods like list comprehensions, we can often achieve the same result with cleaner and faster code.

**💡 Suggested Improvement:** Consider using a list comprehension to filter users in a single pass, which is both more readable and performant.

**📝 Code Example:**
```python
def get_active_users(users):
    return [user for user in users if user.is_active and user.profile_complete]
```

---

## 📁 Project Structure

```
empathetic-code-reviewer/
├── src/
│   ├── index.ts          # Main CLI entry point
│   ├── types.ts          # TypeScript interfaces
│   ├── ai-client.ts      # OpenAI integration
│   └── formatter.ts      # Markdown output generation
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev input.json

# Clean build artifacts
npm run clean
```

## 🧪 Testing the Application

### **Step 1: Setup**
```bash
git clone <your-repo-url>
cd empathetic-code-reviewer
npm install
npm run build
```

### **Step 2: Configure API Key**
```bash
# Copy environment template
cp .env.example .env

# Edit .env file and add your OpenAI API key:
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-4o-mini
```

### **Step 3: Test with Example**
```bash
# Run with provided example
npm run start example-input.json

# Expected: Empathetic Markdown report with 3 transformed comments
```

### **Step 4: Test with Custom Input**
Create your own JSON file:
```json
{
  "code_snippet": "your code here",
  "review_comments": ["harsh comment 1", "harsh comment 2"]
}
```

```bash
npm run start your-file.json
```

## 🔧 API Configuration Details

### **AI Model Used**: OpenAI GPT Models
- **Primary Model**: `gpt-4o-mini` (cost-effective, high quality)
- **Alternative Models**: `gpt-4o`, `gpt-3.5-turbo`
- **API Provider**: OpenAI (https://platform.openai.com)

### **API Key Requirements**:
- **Source**: OpenAI Platform (https://platform.openai.com/account/api-keys)
- **Cost**: Pay-per-use (gpt-4o-mini is most cost-effective)
- **Setup**: Add to `.env` file or pass via CLI argument

### **Environment Variables**
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_MODEL`: AI model to use (optional, defaults to gpt-4o-mini)

### **CLI Options**
- `-k, --api-key <key>`: Specify API key directly
- `-m, --model <model>`: Specify AI model to use
- `-h, --help`: Show help information
- `-V, --version`: Show version number

## 📋 Requirements Met

✅ **Input**: Processes JSON with `code_snippet` and `review_comments`  
✅ **Output**: Generates well-formatted Markdown reports  
✅ **Positive Rephrasing**: Transforms harsh feedback empathetically  
✅ **Technical Explanations**: Provides clear "why" for each suggestion  
✅ **Code Examples**: Shows concrete improvements  
✅ **Holistic Summary**: Encouraging overall assessment  


## 📝 License

MIT License - Feel free to use and modify for your projects.

---

*🤖 Built for the "Freedom from Mundane: AI for a Smarter Life" hackathon*