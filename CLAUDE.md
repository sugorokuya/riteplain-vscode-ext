# RitePlain VSCode Extension Development Guide

## Build Commands
- `npm run compile` - Compile TypeScript using webpack
- `npm run watch` - Watch for changes and recompile
- `npm run package` - Build for production
- `npm run lint` - Run ESLint on TypeScript files
- `npm run test` - Run all tests
- `npm run test -- -g "test name"` - Run specific test by pattern

## Code Style Guidelines
- **Formatting**: Use 2-space indentation
- **Types**: Always use TypeScript types for function parameters and returns
- **Functions**: Keep functions small and focused on a single responsibility
- **Error Handling**: Check for null/undefined values before use (e.g., `if (!editor) return`)
- **Naming**: 
  - Use camelCase for variables and functions
  - Use descriptive names that reflect purpose
- **Comments**: Add comments for utility functions and complex logic
- **UI Messages**: Support both English and Japanese where appropriate

## Project Structure
- `/src` - TypeScript source code
- `/syntaxes` - Grammar definitions
- `/snippets` - Code snippets
- Commands follow pattern: `riteplain.commandName`