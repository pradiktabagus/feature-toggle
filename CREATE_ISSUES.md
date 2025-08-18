# 🚀 Create Phase 2 Issues

Now that your GitHub Project is set up at https://github.com/users/pradiktabagus/projects/5, let's create the initial issues for Phase 2 development.

## 📋 Labels to Create First

Go to your repository → **Issues** → **Labels** → **New label** and create these:

### Phase Labels
```
phase-2          #FEF08A    Advanced Toggle Features
phase-3          #93C5FD    Analytics & Monitoring  
phase-4          #C4B5FD    Testing & Quality
phase-5          #FDBA74    Enterprise Features
```

### Priority Labels
```
priority-high    #EF4444    High priority
priority-medium  #F59E0B    Medium priority
priority-low     #10B981    Low priority
```

### Component Labels
```
entities         #8B5CF6    Entity layer changes
features         #F59E0B    Feature layer changes
widgets          #EC4899    Widget layer changes
shared           #6B7280    Shared layer changes
api              #10B981    API changes
ui               #EC4899    UI/UX changes
```

## 🎯 Phase 2 Issues to Create

### Issue 1: Create Rollout Entity
**Title**: `[FEATURE] Create Rollout Entity for Percentage-based Rollouts`
**Labels**: `enhancement`, `phase-2`, `priority-high`, `entities`

**Description**:
```markdown
## 📋 Feature Description

**Feature Name:** Rollout Entity
**Phase:** Phase 2
**Priority:** High

### What feature would you like to see?
Create the rollout entity following FSD architecture to support percentage-based feature rollouts.

### Which FSD layer(s) will be affected?
- [x] Entities
- [ ] Features  
- [ ] Widgets
- [ ] Shared
- [ ] App

### Expected entities/features to be created:
- `entities/rollout/model/rollout.ts`
- `entities/rollout/api/rollout-api.ts`
- `entities/rollout/lib/rollout-helpers.ts`

## 🎯 User Story
As a developer, I want to create rollout entities so that I can implement percentage-based feature rollouts.

## 📊 Acceptance Criteria
- [ ] `entities/rollout/model/rollout.ts` created with proper TypeScript types
- [ ] `entities/rollout/api/rollout-api.ts` implemented with CRUD operations
- [ ] `entities/rollout/lib/rollout-helpers.ts` with utility functions
- [ ] Prisma schema updated with Rollout model
- [ ] Unit tests for rollout entity
- [ ] Entity index.ts with proper exports

## 🔧 Technical Requirements

### Database Changes
- [x] New Prisma models needed
- [x] Schema migrations required
- [ ] Data seeding needed

### API Endpoints
- [ ] `GET /api/rollouts`
- [ ] `POST /api/rollouts`
- [ ] `PUT /api/rollouts/[id]`
- [ ] `DELETE /api/rollouts/[id]`

## ✅ Definition of Done
- [ ] Feature implemented following FSD architecture
- [ ] Unit tests written and passing
- [ ] Documentation updated
- [ ] Code review completed
```

### Issue 2: Implement Percentage Rollout Feature
**Title**: `[FEATURE] Implement Percentage Rollout Management`
**Labels**: `enhancement`, `phase-2`, `priority-high`, `features`

**Description**:
```markdown
## 📋 Feature Description

**Feature Name:** Percentage Rollout Management
**Phase:** Phase 2
**Priority:** High

### What feature would you like to see?
Implement the percentage rollout feature that allows gradual feature releases (10%, 25%, 50%, 100%).

### Which FSD layer(s) will be affected?
- [ ] Entities
- [x] Features  
- [ ] Widgets
- [ ] Shared
- [x] App

### Expected entities/features to be created:
- `features/rollout/model/use-rollout.ts`
- `features/rollout/ui/rollout-controls.tsx`
- `features/rollout/ui/rollout-dashboard.tsx`

## 🎯 User Story
As a product manager, I want to gradually roll out features to a percentage of users so that I can minimize risk and monitor impact.

## 📊 Acceptance Criteria
- [ ] `features/rollout/model/use-rollout.ts` business logic implemented
- [ ] `features/rollout/ui/rollout-controls.tsx` UI component created
- [ ] API endpoints for rollout management working
- [ ] Integration with existing toggle system
- [ ] Rollout percentage validation (0-100%)
- [ ] Real-time rollout status updates

## 🔧 Technical Requirements

### API Endpoints
- [x] `GET /api/rollouts`
- [x] `POST /api/rollouts`
- [x] `PUT /api/rollouts/[id]`
- [x] `PATCH /api/rollouts/[id]/percentage`

### UI Components
- [x] New components needed
- [ ] Existing components to modify
- [ ] New pages/routes required

## 🔗 Related Issues
- Depends on: #1 (Create Rollout Entity)

## ✅ Definition of Done
- [ ] Feature implemented following FSD architecture
- [ ] Unit tests written and passing
- [ ] Integration tests added
- [ ] Documentation updated
- [ ] Code review completed
```

### Issue 3: Create User Targeting Entity
**Title**: `[FEATURE] Create User Targeting Entity`
**Labels**: `enhancement`, `phase-2`, `priority-high`, `entities`

**Description**:
```markdown
## 📋 Feature Description

**Feature Name:** User Targeting Entity
**Phase:** Phase 2
**Priority:** High

### What feature would you like to see?
Create user targeting entity to support rule-based user targeting for feature toggles.

### Which FSD layer(s) will be affected?
- [x] Entities
- [ ] Features  
- [ ] Widgets
- [ ] Shared
- [ ] App

### Expected entities/features to be created:
- `entities/targeting/model/targeting.ts`
- `entities/targeting/api/targeting-api.ts`
- `entities/targeting/lib/targeting-helpers.ts`

## 🎯 User Story
As a developer, I want to create targeting entities so that I can implement user-specific feature toggles.

## 📊 Acceptance Criteria
- [ ] `entities/targeting/model/targeting.ts` with targeting rules types
- [ ] `entities/targeting/api/targeting-api.ts` with CRUD operations
- [ ] `entities/targeting/lib/targeting-helpers.ts` with rule evaluation logic
- [ ] Prisma schema updated with Targeting model
- [ ] Support for user ID, email, role-based targeting
- [ ] Unit tests for targeting entity

## 🔧 Technical Requirements

### Database Changes
- [x] New Prisma models needed
- [x] Schema migrations required
- [ ] Data seeding needed

## ✅ Definition of Done
- [ ] Feature implemented following FSD architecture
- [ ] Unit tests written and passing
- [ ] Documentation updated
- [ ] Code review completed
```

### Issue 4: Implement User Targeting Rules
**Title**: `[FEATURE] Implement User Targeting Rules`
**Labels**: `enhancement`, `phase-2`, `priority-medium`, `features`

**Description**:
```markdown
## 📋 Feature Description

**Feature Name:** User Targeting Rules
**Phase:** Phase 2
**Priority:** Medium

### What feature would you like to see?
Implement user targeting rules that allow toggles to be enabled for specific users, roles, or groups.

### Which FSD layer(s) will be affected?
- [ ] Entities
- [x] Features  
- [ ] Widgets
- [ ] Shared
- [x] App

### Expected entities/features to be created:
- `features/targeting/model/use-targeting.ts`
- `features/targeting/ui/targeting-rules.tsx`
- `features/targeting/ui/targeting-form.tsx`

## 🎯 User Story
As a product manager, I want to target specific users with features so that I can test with beta users or VIP customers.

## 📊 Acceptance Criteria
- [ ] Support for user ID targeting
- [ ] Support for email-based targeting
- [ ] Support for role-based targeting
- [ ] Support for group-based targeting
- [ ] Rule evaluation logic working
- [ ] UI for creating targeting rules

## 🔗 Related Issues
- Depends on: #3 (Create User Targeting Entity)

## ✅ Definition of Done
- [ ] Feature implemented following FSD architecture
- [ ] Unit tests written and passing
- [ ] Integration tests added
- [ ] Documentation updated
- [ ] Code review completed
```

## 🚀 Quick Creation Commands

If you have GitHub CLI installed:

```bash
# Create all issues at once
gh issue create --title "[FEATURE] Create Rollout Entity for Percentage-based Rollouts" --label "enhancement,phase-2,priority-high,entities" --body "See CREATE_ISSUES.md for full description"

gh issue create --title "[FEATURE] Implement Percentage Rollout Management" --label "enhancement,phase-2,priority-high,features" --body "See CREATE_ISSUES.md for full description"

gh issue create --title "[FEATURE] Create User Targeting Entity" --label "enhancement,phase-2,priority-high,entities" --body "See CREATE_ISSUES.md for full description"

gh issue create --title "[FEATURE] Implement User Targeting Rules" --label "enhancement,phase-2,priority-medium,features" --body "See CREATE_ISSUES.md for full description"
```

## 📊 Project Board Setup

After creating issues:

1. **Go to your project**: https://github.com/users/pradiktabagus/projects/5
2. **Add columns** if not already created:
   - 📋 Backlog
   - 🔄 Ready  
   - 🚧 In Progress
   - 👀 In Review
   - ✅ Done
3. **Add issues to Backlog column**
4. **Set up column automation**:
   - Backlog: Auto-add new issues
   - In Progress: Auto-add when assigned
   - In Review: Auto-add PRs
   - Done: Auto-add when PR merged

## 🎯 Next Steps

1. **Create the labels** listed above
2. **Create the 4 issues** using the issue templates
3. **Add issues to your project board**
4. **Create a milestone** for Phase 2
5. **Start with Issue #1** (Rollout Entity)

Your GitHub project automation should now work correctly with the updated workflow! 🚀