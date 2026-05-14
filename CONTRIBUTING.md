# Contributing to SARKIN MOTA

Thank you for your interest in contributing to the SARKIN MOTA Luxury Cars App! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and professional in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sarkin-mota-app.git
   cd sarkin-mota-app
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/bagthanigeria/sarkin-mota-app.git
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Before You Start
- Check [Issues](https://github.com/bagthanigeria/sarkin-mota-app/issues) for similar problems
- Read existing documentation in `/docs`
- Understand the project structure

### 2. Making Changes

#### Backend (Node.js)
```bash
cd backend
npm install
npm run lint  # Check code style
npm run test  # Run tests
npm run dev   # Start development server
```

#### iOS (Swift)
```bash
cd ios
pod install
# Open in Xcode and follow Swift style guide
```

#### Android (Kotlin)
```bash
cd android
./gradlew build
./gradlew lint
./gradlew test
```

### 3. Commit Guidelines

Use descriptive commit messages following this format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

**Example**:
```
feat(vehicle): add 360 image gallery feature

Implement virtual tour gallery with zoom and rotation capabilities.
Supports multiple image formats and optimized loading.

Closes #123
```

### 4. Pull Request Process

1. **Update your branch**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Use a descriptive title
   - Reference any related issues (#123)
   - Provide detailed description of changes
   - Include screenshots if UI changes
   - Link to relevant documentation

4. **PR Template** (will auto-populate):
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change

   ## Testing
   Describe testing performed

   ## Checklist
   - [ ] Code follows style guide
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

## Code Standards

### General
- Keep lines under 100 characters
- Use meaningful variable/function names
- Add comments for complex logic
- Write unit tests for new features
- Follow DRY (Don't Repeat Yourself) principle

### Backend (JavaScript/Node.js)
- Use ES6+ syntax
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use async/await over promises
- Implement error handling
- Add JSDoc comments for functions

```javascript
/**
 * Get vehicle by ID with specifications
 * @param {string} vehicleId - The vehicle ID
 * @returns {Promise<Object>} Vehicle object with specs
 * @throws {Error} If vehicle not found
 */
async function getVehicleWithSpecs(vehicleId) {
  // Implementation
}
```

### iOS (Swift)
- Follow [Swift API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)
- Use meaningful names
- Add MARK comments for sections
- Implement proper error handling
- Follow SwiftUI best practices

```swift
// MARK: - Properties
var vehicleId: String

// MARK: - Lifecycle
var body: some View {
    // Implementation
}
```

### Android (Kotlin)
- Follow [Android Kotlin Style Guide](https://developer.android.com/kotlin/style-guide)
- Use meaningful names
- Implement proper null safety
- Follow MVVM architecture
- Use dependency injection

## Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:coverage      # Generate coverage report
npm run test:watch         # Watch mode
```

### Test Structure
```javascript
describe('Vehicle Controller', () => {
  it('should get vehicle by ID', async () => {
    // Test implementation
  });
});
```

### iOS Tests
Use XCTest framework for unit tests and UI tests.

### Android Tests
Use JUnit and Espresso for testing.

## Documentation

When adding features, update documentation:

1. **API Changes**: Update `docs/API.md`
2. **Database Changes**: Update `docs/DATABASE.md`
3. **Architecture Changes**: Update `docs/ARCHITECTURE.md`
4. **Setup Changes**: Update `docs/SETUP.md`
5. **Feature Documentation**: Update feature description

## Common Issues & Solutions

### Database Migration Failed
```bash
cd backend
npm run migrate:rollback
npm run migrate
```

### Port Already in Use
```bash
# Change port in .env file
PORT=5001
```

### iOS Pod Installation Issues
```bash
cd ios
rm -rf Pods
rm Podfile.lock
pod install
```

## Reporting Bugs

Use [GitHub Issues](https://github.com/bagthanigeria/sarkin-mota-app/issues) to report bugs.

**Include**:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos
- System information (OS, app version, etc.)
- Error messages/logs

## Feature Requests

Suggestions are welcome! Create an issue with:
- Clear description of feature
- Use cases
- Proposed implementation (optional)
- Mockups/screenshots (if applicable)

## Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: 2+ maintainers review code
3. **Discussion**: Feedback and improvements
4. **Approval**: Once approved, ready to merge
5. **Merge**: Squash and merge to main

## Questions?

- 📖 Check [Documentation](docs/)
- 💬 Open a [Discussion](https://github.com/bagthanigeria/sarkin-mota-app/discussions)
- 📧 Email: dev@sarkinmota.com
- 🐛 File an [Issue](https://github.com/bagthanigeria/sarkin-mota-app/issues)

---

Thank you for contributing to SARKIN MOTA! 🙏
