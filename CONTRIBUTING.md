# Contributing to PostIt

Thank you for your interest in contributing to PostIt! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/post-it.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Open a Pull Request

## Development Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

## Code Style

- Use meaningful variable and function names
- Write comments for complex logic
- Follow existing code style and patterns
- Keep functions small and focused
- Add error handling where appropriate

## Commit Messages

Please write clear commit messages:
- Use present tense ("Add feature" not "Added feature")
- First line should be concise (< 50 chars)
- Add detailed description if needed

## Testing

Before submitting a PR, please:
- Test your changes thoroughly
- Ensure the code runs without errors
- Check that existing functionality still works

## Reporting Issues

When reporting issues, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)

## Feature Requests

Feature requests are welcome! Please open an issue with:
- Clear description of the feature
- Use case or problem it solves
- Possible implementation approach (if you have ideas)

## Questions?

Feel free to open an issue for any questions or discussions.

