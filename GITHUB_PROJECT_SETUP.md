# 🔧 GitHub Project Setup - Step by Step

This guide provides exact steps to set up GitHub Projects and fix the automation error.

## 🚨 Fixing the Current Error

The error `Could not resolve to a ProjectV2 with the number 1` occurs because:
1. GitHub Project hasn't been created yet
2. Wrong project URL format
3. Missing permissions

## 📋 Step-by-Step Setup

### Step 1: Create GitHub Project

1. **Go to your GitHub profile** (not repository)
   - Visit: `https://github.com/pradiktabagus`
   - Click **Projects** tab
   - Click **New project**

2. **Project Configuration**
   - **Template**: Board
   - **Project name**: `Feature Toggle Development`
   - **Description**: `Development tracking for Feature Toggle Management System`
   - Click **Create project**

3. **Note the Project URL**
   - After creation, copy the URL (e.g., `https://github.com/users/pradiktabagus/projects/2`)
   - The number at the end is your project ID

### Step 2: Configure Project Board

#### Add Columns (in this order):
1. **📋 Backlog** 
   - Description: "New issues and planned features"
2. **🔄 Ready**
   - Description: "Issues ready for development"  
3. **🚧 In Progress**
   - Description: "Currently being worked on"
4. **👀 In Review** 
   - Description: "Pull requests under review"
5. **✅ Done**
   - Description: "Completed items"

#### Configure Column Automation:
1. Click **⚙️** on each column
2. Set up automation:
   - **📋 Backlog**: Auto-add items → Issues, Pull requests
   - **🚧 In Progress**: Auto-add items → Issues (when assigned)
   - **👀 In Review**: Auto-add items → Pull requests (when opened)
   - **✅ Done**: Auto-add items → Pull requests (when merged)

### Step 3: Create Repository Labels

Go to your repository → **Issues** → **Labels** → **New label**

#### Phase Labels:
```
phase-2          #FEF08A    Advanced Toggle Features
phase-3          #93C5FD    Analytics & Monitoring  
phase-4          #C4B5FD    Testing & Quality
phase-5          #FDBA74    Enterprise Features
```

#### Priority Labels:
```
priority-high    #EF4444    High priority
priority-medium  #F59E0B    Medium priority
priority-low     #10B981    Low priority
```

#### Component Labels:
```
entities         #8B5CF6    Entity layer changes
features         #F59E0B    Feature layer changes
widgets          #EC4899    Widget layer changes
shared           #6B7280    Shared layer changes
api              #10B981    API changes
ui               #EC4899    UI/UX changes
```

### Step 4: Configure GitHub Actions

#### Option A: Manual Setup (Recommended)
1. **Disable the automation workflow** for now:
   ```bash
   # Rename the file to disable it
   mv .github/workflows/project-automation.yml .github/workflows/project-automation.yml.disabled
   ```

2. **Manually add issues to project**:
   - Create issues using templates
   - Manually add them to the project board
   - Move through columns as work progresses

#### Option B: Fix Automation (Advanced)
If you want to keep automation:

1. **Create Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with scopes: `repo`, `project`
   - Copy the token

2. **Add Repository Secrets**:
   - Go to repository → Settings → Secrets and variables → Actions
   - Add secret: `ADD_TO_PROJECT_PAT` = your token

3. **Add Repository Variables**:
   - In same section, go to Variables tab
   - Add variable: `PROJECT_URL` = your project URL (e.g., `https://github.com/users/pradiktabagus/projects/2`)

4. **Re-enable workflow**:
   ```bash
   mv .github/workflows/project-automation.yml.disabled .github/workflows/project-automation.yml
   ```

### Step 5: Create Initial Issues

Use the issue templates to create these Phase 2 issues:

#### Issue 1: Rollout Entity
```markdown
Title: [FEATURE] Create Rollout Entity for Percentage-based Rollouts
Labels: enhancement, phase-2, priority-high, entities

Use the 🚀 Feature Request template and fill in:
- Phase: Phase 2
- Priority: High
- FSD layers: [x] Entities
```

#### Issue 2: Rollout Feature
```markdown
Title: [FEATURE] Implement Percentage Rollout Management  
Labels: enhancement, phase-2, priority-high, features

Use the 🚀 Feature Request template and fill in:
- Phase: Phase 2
- Priority: High
- FSD layers: [x] Features
```

#### Issue 3: User Targeting Entity
```markdown
Title: [FEATURE] Create User Targeting Entity
Labels: enhancement, phase-2, priority-high, entities

Use the 🚀 Feature Request template and fill in:
- Phase: Phase 2
- Priority: High
- FSD layers: [x] Entities
```

#### Issue 4: User Targeting Feature
```markdown
Title: [FEATURE] Implement User Targeting Rules
Labels: enhancement, phase-2, priority-medium, features

Use the 🚀 Feature Request template and fill in:
- Phase: Phase 2
- Priority: Medium
- FSD layers: [x] Features
```

### Step 6: Create Milestone

1. Go to repository → **Issues** → **Milestones** → **New milestone**
2. **Title**: `Phase 2: Advanced Toggle Features`
3. **Due date**: 4 weeks from today
4. **Description**: 
   ```markdown
   Advanced toggle features including:
   - Percentage-based rollouts
   - User targeting rules
   - Scheduled toggle activation
   - Bulk operations
   ```

### Step 7: Assign Issues to Milestone

1. Open each created issue
2. On the right sidebar, click **Milestone**
3. Select `Phase 2: Advanced Toggle Features`
4. Assign to project if not auto-added

## 🎯 Quick Start Commands

### Create Issues via GitHub CLI (Optional)
```bash
# Install GitHub CLI if not installed
# brew install gh  # macOS
# sudo apt install gh  # Ubuntu

# Login
gh auth login

# Create issues
gh issue create --title "[FEATURE] Create Rollout Entity" --body-file .github/ISSUE_TEMPLATE/feature-request.md --label "enhancement,phase-2,priority-high,entities"

gh issue create --title "[FEATURE] Implement Percentage Rollout Management" --body-file .github/ISSUE_TEMPLATE/feature-request.md --label "enhancement,phase-2,priority-high,features"
```

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Could not resolve to a ProjectV2"
- **Cause**: Project doesn't exist or wrong URL
- **Fix**: Create project first, use correct URL format

#### 2. "Resource not accessible by integration"  
- **Cause**: Missing permissions
- **Fix**: Use Personal Access Token with correct scopes

#### 3. "Project URL not found"
- **Cause**: Wrong URL format or private project
- **Fix**: Use format `https://github.com/users/USERNAME/projects/NUMBER`

#### 4. Issues not auto-adding to project
- **Cause**: Automation not configured
- **Fix**: Set up column automation in project settings

### Verification Steps:

1. **Check project exists**: Visit project URL in browser
2. **Check permissions**: Ensure PAT has `project` scope
3. **Check automation**: Test by creating a test issue
4. **Check labels**: Ensure all labels are created in repository

## 📊 Project Management Workflow

### Daily Workflow:
1. **Check project board** for current status
2. **Move issues** through columns as work progresses
3. **Update issue comments** with progress
4. **Create PRs** linking to issues

### Weekly Workflow:
1. **Review milestone progress**
2. **Groom backlog** for next sprint
3. **Update issue priorities** if needed
4. **Plan next week's work**

### Sprint Workflow (2 weeks):
1. **Sprint planning**: Select issues for sprint
2. **Daily standups**: Check progress
3. **Sprint review**: Demo completed features
4. **Sprint retrospective**: Improve process

## 🚀 Next Steps

1. **Create GitHub Project** following Step 1
2. **Set up project board** with columns and automation
3. **Create repository labels** for organization
4. **Create initial issues** for Phase 2
5. **Start development** with first issue

Choose **Option A (Manual Setup)** for simplicity, or **Option B (Automation)** if you want full automation.

The manual approach is recommended initially to get familiar with the workflow before adding automation complexity.