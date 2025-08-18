# 🚀 GitHub Project Management Setup

This guide explains how to set up GitHub Projects and Issues for managing the Feature Toggle Management System development based on our blueprint.

## 📋 GitHub Project Setup

### 1. Create GitHub Project

1. Go to your GitHub repository
2. Click on **Projects** tab
3. Click **New Project**
4. Choose **Board** layout
5. Name: `Feature Toggle Development`

### 2. Project Columns Setup

Create these columns in order:

| Column | Purpose | Automation |
|--------|---------|------------|
| **📋 Backlog** | New issues and planned features | Auto-add new issues |
| **🔄 Ready** | Issues ready for development | Manual move |
| **🚧 In Progress** | Currently being worked on | Auto-move when assigned |
| **👀 In Review** | Pull requests under review | Auto-move when PR opened |
| **✅ Done** | Completed items | Auto-move when PR merged |

### 3. Labels Setup

Create these labels for better organization:

#### Phase Labels
- `phase-2` - Advanced Toggle Features (🟡 Yellow)
- `phase-3` - Analytics & Monitoring (🔵 Blue) 
- `phase-4` - Testing & Quality (🟣 Purple)
- `phase-5` - Enterprise Features (🟠 Orange)

#### Priority Labels
- `priority-high` - High priority (🔴 Red)
- `priority-medium` - Medium priority (🟡 Yellow)
- `priority-low` - Low priority (🟢 Green)

#### Type Labels
- `enhancement` - New features (🚀 Blue)
- `bug` - Bug reports (🐛 Red)
- `task` - Development tasks (📋 Gray)
- `documentation` - Documentation updates (📚 Blue)

#### Component Labels
- `entities` - Entity layer changes (🏗️ Brown)
- `features` - Feature layer changes (⚡ Yellow)
- `widgets` - Widget layer changes (🎨 Purple)
- `shared` - Shared layer changes (🔧 Gray)
- `api` - API changes (🔌 Green)
- `ui` - UI/UX changes (🎨 Pink)

## 🎯 Issue Management Strategy

### Phase 2 Issues (Immediate)

#### Epic: Advanced Toggle Features
```markdown
**Parent Issue**: Advanced Toggle Features Implementation
**Phase**: Phase 2
**Priority**: High

**Child Issues**:
- [ ] #1 Create Rollout Entity
- [ ] #2 Implement Percentage Rollout Feature  
- [ ] #3 Create User Targeting Entity
- [ ] #4 Implement User Targeting Rules
- [ ] #5 Create Scheduled Toggle Entity
- [ ] #6 Implement Time-based Activation
- [ ] #7 Create Rollout Management Widget
- [ ] #8 Add Bulk Operations Feature
```

#### Sample Issues to Create:

**Issue #1: Create Rollout Entity**
```markdown
**Title**: [FEATURE] Create Rollout Entity for Percentage-based Rollouts
**Labels**: enhancement, phase-2, priority-high, entities
**Assignee**: [Developer]

**Description**:
Create the rollout entity following FSD architecture to support percentage-based feature rollouts.

**Acceptance Criteria**:
- [ ] `entities/rollout/model/rollout.ts` created with proper types
- [ ] `entities/rollout/api/rollout-api.ts` implemented
- [ ] `entities/rollout/lib/rollout-helpers.ts` with utility functions
- [ ] Prisma schema updated with Rollout model
- [ ] Unit tests for rollout entity
```

**Issue #2: Implement Percentage Rollout Feature**
```markdown
**Title**: [FEATURE] Implement Percentage Rollout Management
**Labels**: enhancement, phase-2, priority-high, features
**Depends on**: #1

**Description**:
Implement the percentage rollout feature that allows gradual feature releases.

**Acceptance Criteria**:
- [ ] `features/rollout/model/use-rollout.ts` business logic
- [ ] `features/rollout/ui/rollout-controls.tsx` UI component
- [ ] API endpoints for rollout management
- [ ] Integration with existing toggle system
```

### Issue Templates Usage

#### For New Features:
1. Use **🚀 Feature Request** template
2. Fill in Phase and Priority
3. Specify FSD layers affected
4. Add to appropriate project column

#### For Bug Reports:
1. Use **🐛 Bug Report** template
2. Specify affected component
3. Include reproduction steps
4. Add environment details

#### For Development Tasks:
1. Use **📋 Task** template
2. Specify task type and priority
3. List files to be modified
4. Define clear acceptance criteria

## 🔄 Workflow Automation

### Automated Actions

The project includes GitHub Actions that automatically:

1. **Add new issues/PRs to project**
2. **Extract and assign phase labels** from issue body
3. **Extract and assign priority labels** from issue body
4. **Move items between columns** based on status changes

### Manual Workflow

1. **Issue Creation** → Automatically added to **📋 Backlog**
2. **Ready for Development** → Manually move to **🔄 Ready**
3. **Start Development** → Assign developer → Auto-move to **🚧 In Progress**
4. **Create PR** → Auto-move to **👀 In Review**
5. **Merge PR** → Auto-move to **✅ Done**

## 📊 Project Milestones

### Phase 2 Milestone: Advanced Toggle Features
**Target Date**: 4 weeks from start
**Issues**: 8-10 issues
**Key Deliverables**:
- Rollout management system
- User targeting capabilities
- Scheduled toggle activation
- Bulk operations

### Phase 3 Milestone: Analytics & Monitoring  
**Target Date**: 6 weeks from Phase 2 completion
**Issues**: 6-8 issues
**Key Deliverables**:
- Usage analytics dashboard
- Performance monitoring
- Error tracking system

## 🎯 Sprint Planning

### 2-Week Sprint Structure

**Sprint 1 (Phase 2.1): Rollout Foundation**
- Create rollout entity
- Implement basic percentage rollouts
- Add rollout API endpoints

**Sprint 2 (Phase 2.2): User Targeting**
- Create targeting entity
- Implement user targeting rules
- Add targeting UI components

**Sprint 3 (Phase 2.3): Advanced Features**
- Scheduled toggles
- Bulk operations
- Rollout management widget

## 📈 Progress Tracking

### Key Metrics to Track

1. **Velocity**: Issues completed per sprint
2. **Cycle Time**: Time from Ready to Done
3. **Bug Rate**: Bugs per feature implemented
4. **Code Coverage**: Test coverage percentage
5. **Documentation**: Docs updated per feature

### Weekly Reviews

Every week, review:
- Sprint progress
- Blocked issues
- Priority changes
- Resource allocation

## 🔧 Tools Integration

### Recommended Tools
- **GitHub Projects** - Project management
- **GitHub Issues** - Task tracking
- **GitHub Actions** - Automation
- **GitHub Discussions** - Team communication
- **GitHub Wiki** - Additional documentation

### External Integrations (Optional)
- **Slack/Discord** - Notifications
- **Linear** - Advanced project management
- **Notion** - Documentation and planning

## 📚 Best Practices

### Issue Management
1. **Clear titles** with prefixes ([FEATURE], [BUG], [TASK])
2. **Detailed descriptions** with acceptance criteria
3. **Proper labeling** for easy filtering
4. **Regular updates** on progress
5. **Link related issues** for context

### Pull Request Management
1. **Reference issues** in PR description
2. **Use PR template** for consistency
3. **Request reviews** from team members
4. **Update documentation** when needed
5. **Test thoroughly** before merging

### Project Maintenance
1. **Weekly grooming** of backlog
2. **Regular milestone reviews**
3. **Update project status** in README
4. **Archive completed milestones**
5. **Plan future phases** based on progress

## 🚀 Getting Started

⚠️ **Important**: If you're getting GitHub Actions errors, follow the [Detailed Setup Guide](./GITHUB_PROJECT_SETUP.md) first.

### Quick Setup:
1. **Set up GitHub Project** with columns and labels
2. **Create Phase 2 milestone** with target date
3. **Create initial issues** for rollout features
4. **Assign team members** to issues
5. **Start first sprint** with rollout entity

### Recommended Approach:
1. **Manual Setup First**: Use [GITHUB_PROJECT_SETUP.md](./GITHUB_PROJECT_SETUP.md) for step-by-step instructions
2. **Add Automation Later**: Once comfortable with the workflow

This setup will provide a solid foundation for managing the Feature Toggle project development using GitHub's native tools while following our established blueprint and FSD architecture principles.

## 🔧 Troubleshooting

If you encounter the error:
```
Error: Request failed due to following response errors:
 - Could not resolve to a ProjectV2 with the number 1.
```

This means the GitHub Project hasn't been created yet. Follow these steps:
1. Read [GITHUB_PROJECT_SETUP.md](./GITHUB_PROJECT_SETUP.md)
2. Create the GitHub Project first
3. Configure the automation (or use manual workflow)
4. Then create issues using the templates