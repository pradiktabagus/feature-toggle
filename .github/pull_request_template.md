# Pull Request

## 📋 Description

**Type of Change:**
- [ ] 🚀 New feature
- [ ] 🐛 Bug fix
- [ ] 📚 Documentation update
- [ ] 🔧 Code refactoring
- [ ] ⚡ Performance improvement
- [ ] 🧪 Test addition/update
- [ ] 🔒 Security fix

**Phase:** (Phase 2, 3, 4, or 5)

### Summary
Brief description of what this PR does.

### Changes Made
- Change 1
- Change 2
- Change 3

## 🎯 Related Issues
Closes #[issue-number]
Related to #[issue-number]

## 🏗️ FSD Architecture Compliance

### Layers Modified:
- [ ] `entities/` - Business entities
- [ ] `features/` - Business features
- [ ] `widgets/` - Complex UI blocks
- [ ] `shared/` - Shared utilities
- [ ] `app/` - Application layer

### Architecture Checklist:
- [ ] Follows FSD dependency rules (App → Widgets → Features → Entities → Shared)
- [ ] No circular dependencies introduced
- [ ] Proper layer separation maintained
- [ ] Entity exports are clean and focused
- [ ] Feature business logic is properly separated from UI

## 🧪 Testing

### Test Coverage:
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

### Test Results:
```bash
# Paste test results here
```

## 📊 Performance Impact

- [ ] No performance impact
- [ ] Performance improved
- [ ] Performance impact assessed and acceptable
- [ ] Performance benchmarks included

## 🔒 Security Considerations

- [ ] No security implications
- [ ] Security review completed
- [ ] Input validation added/updated
- [ ] Authentication/authorization checked

## 📚 Documentation

- [ ] Code is self-documenting
- [ ] JSDoc comments added where needed
- [ ] README updated (if needed)
- [ ] API documentation updated (if needed)
- [ ] Architecture documentation updated (if needed)

## 🔄 Database Changes

- [ ] No database changes
- [ ] Schema changes included
- [ ] Migration scripts provided
- [ ] Backward compatibility maintained

## 📱 UI/UX Changes

- [ ] No UI changes
- [ ] UI changes are responsive
- [ ] Dark/light mode compatibility maintained
- [ ] Accessibility considerations addressed

## ✅ Pre-merge Checklist

### Code Quality:
- [ ] Code follows project conventions
- [ ] TypeScript strict mode compliance
- [ ] ESLint passes without errors
- [ ] No console.log statements in production code
- [ ] Error handling is comprehensive

### FSD Compliance:
- [ ] Import paths follow FSD rules
- [ ] Business logic is in appropriate layers
- [ ] UI components are pure and focused
- [ ] Shared utilities are framework-agnostic

### Testing:
- [ ] All tests pass
- [ ] Test coverage is adequate
- [ ] Edge cases are covered
- [ ] Error scenarios are tested

### Documentation:
- [ ] Code changes are documented
- [ ] API changes are documented
- [ ] Breaking changes are noted

## 🚀 Deployment Notes

### Environment Variables:
- [ ] No new environment variables
- [ ] New environment variables documented
- [ ] Environment variables added to deployment configs

### Dependencies:
- [ ] No new dependencies
- [ ] New dependencies are justified and documented
- [ ] Package.json updated

### Breaking Changes:
- [ ] No breaking changes
- [ ] Breaking changes documented
- [ ] Migration guide provided

## 📸 Screenshots (if applicable)

### Before:
<!-- Add screenshots of the current state -->

### After:
<!-- Add screenshots of the new state -->

## 🔍 Additional Notes

Add any additional notes, concerns, or context for reviewers here.