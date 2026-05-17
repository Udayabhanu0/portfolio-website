# Build Verification Checklist

Use this checklist to verify everything is working correctly.

## Pre-Deployment Verification

### Database Connection
- [ ] Neon PostgreSQL database is connected
- [ ] `DATABASE_URL` environment variable is set
- [ ] Can connect to database from local machine
- [ ] All 4 tables created (github_projects, github_stats, admin_users, sync_settings)
- [ ] Tables have proper indexes

Verify with:
```bash
npx ts-node -e "import sql from './lib/db'; sql\`SELECT version()\`.then(console.log)"
```

### Environment Variables
- [ ] `.env.local` file created with all required variables
- [ ] `DATABASE_URL` is set correctly
- [ ] `NEXTAUTH_SECRET` is a strong random string (32+ chars)
- [ ] `NEXTAUTH_URL` is set to development URL (http://localhost:3000)
- [ ] No variables contain quotes or special characters

### Dependencies Installation
- [ ] `pnpm install` completed without errors
- [ ] `node_modules` folder exists
- [ ] All packages in package.json are installed
- [ ] No peer dependency warnings

Verify with:
```bash
pnpm list
```

### Database Initialization
- [ ] Ran `npx ts-node scripts/setup.ts` successfully
- [ ] Admin user created: `admin@portfolio.dev`
- [ ] GitHub data synced (output shows repo count)
- [ ] No error messages in terminal
- [ ] Check database has data:

```bash
npx ts-node -e "import sql from './lib/db'; sql\`SELECT COUNT(*) FROM github_projects\`.then(console.log)"
```

## Local Development Verification

### Dev Server
- [ ] `pnpm dev` starts without errors
- [ ] Server runs on http://localhost:3000
- [ ] No compilation errors in terminal
- [ ] Console shows no TypeScript errors

### Public Portfolio Page
Visit: http://localhost:3000

- [ ] Page loads without errors
- [ ] Dark theme background visible (#050510)
- [ ] Neon cyan/blue colors visible
- [ ] All sections display:
  - [ ] Hero section with title
  - [ ] About section
  - [ ] Skills section
  - [ ] Projects section (should show projects from DB)
  - [ ] Experience section
  - [ ] Contact section
  - [ ] Footer

### Projects Display
- [ ] Projects grid displays
- [ ] Shows correct number of projects
- [ ] Stars count visible
- [ ] Language tags visible
- [ ] GitHub links work
- [ ] "View More on GitHub" button visible

### Responsive Design
Test on different screen sizes:
- [ ] Works on mobile (375px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1920px)
- [ ] No overflow or layout issues
- [ ] Fonts readable on all sizes
- [ ] Touch targets > 44px on mobile

### Animations
- [ ] Hero section animations smooth
- [ ] Section fade-in animations work on scroll
- [ ] Hover effects on cards
- [ ] No lag or stuttering
- [ ] Animations CPU efficient

## Admin Dashboard Verification

### Admin Login Page
Visit: http://localhost:3000/admin/login

- [ ] Page loads with dark theme
- [ ] Login form displays correctly
- [ ] Email and password fields work
- [ ] "Login" button responsive to clicks

### Admin Login
- [ ] Can login with: `admin@portfolio.dev` / `changeme123`
- [ ] Redirects to admin dashboard after login
- [ ] No error messages
- [ ] Session persists on page refresh

### Admin Dashboard
- [ ] Displays all projects in table
- [ ] Shows correct number of projects
- [ ] Statistics cards show:
  - [ ] Total Repos
  - [ ] Total Stars
  - [ ] Total Commits
  - [ ] Last Synced date

### Admin Controls
- [ ] Eye icon (visibility toggle) works
- [ ] Star icon (featured toggle) works
- [ ] Clicking toggles updates immediately
- [ ] Can see changes reflected in table

### GitHub Refresh
- [ ] "Refresh GitHub" button is clickable
- [ ] Button shows "Syncing..." while active
- [ ] Syncing completes without errors
- [ ] Stats update after sync
- [ ] Disabled during sync (can't click twice)

### Admin Logout
- [ ] "Logout" button works
- [ ] Redirects to home page
- [ ] Session cleared (can't access /admin without login)

## API Verification

### Sync Endpoint
Test: `curl -X POST http://localhost:3000/api/sync`

- [ ] Returns JSON response
- [ ] Response contains `success: true`
- [ ] Shows number of synced repos
- [ ] Takes < 30 seconds

### Projects API
Test: `curl http://localhost:3000/api/admin/projects`

- [ ] Returns JSON array of projects
- [ ] Each project has required fields
- [ ] No authentication required (admin only in production)
- [ ] Can see is_visible and is_featured flags

### Cron Status
Test: `curl http://localhost:3000/api/cron/daily-sync`

- [ ] Returns JSON with sync info
- [ ] Shows sync settings
- [ ] Shows GitHub stats
- [ ] No authentication required (GET)

### Auth Routes
Test: `curl -X POST http://localhost:3000/api/auth/callback/credentials`

- [ ] NextAuth routes are accessible
- [ ] Returns appropriate responses
- [ ] No 404 errors

## Security Verification

### Password Security
- [ ] Admin password is hashed in database
- [ ] Can't see password in database (only hash)
- [ ] Bcrypt hash starts with `$2a$` or `$2b$`

Verify:
```bash
npx ts-node -e "
import sql from './lib/db';
sql\`SELECT email, password_hash FROM admin_users LIMIT 1\`.then(r => {
  console.log('Email:', r[0].email);
  console.log('Hash:', r[0].password_hash.substring(0, 20) + '...');
  console.log('Valid format:', /^\$2[aby]\$\d{2}\$/.test(r[0].password_hash));
});
"
```

### Session Security
- [ ] NextAuth session tokens work
- [ ] Session doesn't persist in browser storage (uses HTTP-only cookies)
- [ ] Logout clears session properly

### Database Security
- [ ] Database URL only in environment variables
- [ ] No hardcoded credentials in code
- [ ] No database URL in git history

## Performance Verification

### Page Speed
- [ ] Initial page load < 2 seconds
- [ ] Projects list renders quickly
- [ ] Admin dashboard responsive
- [ ] No layout shifts (CLS = 0)

Use Lighthouse (Chrome DevTools):
- [ ] Performance score > 80
- [ ] Accessibility score > 90
- [ ] Best Practices score > 85

### Bundle Size
Check with:
```bash
pnpm build
```

- [ ] Build completes without errors
- [ ] No warnings about large bundles
- [ ] Build time < 60 seconds

### Database Queries
- [ ] Projects load from database (not GitHub API)
- [ ] Admin operations fast (< 500ms)
- [ ] No N+1 query problems
- [ ] Indexes being used

## Before Deployment

### Code Quality
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] All imports resolved correctly
- [ ] No commented-out debug code

### Configuration
- [ ] `.env.local` has all required variables
- [ ] `NEXTAUTH_URL` set correctly
- [ ] Database indexes exist
- [ ] All migrations applied

### Functionality
- [ ] Can browse portfolio
- [ ] Can login to admin
- [ ] Can toggle project visibility
- [ ] Can refresh GitHub data
- [ ] Can logout

### Final Test
1. Clear browser cache (Cmd+Shift+Delete)
2. Close all terminal windows
3. Restart dev server: `pnpm dev`
4. Test everything again

## Deployment Verification (Post-Deploy)

### Vercel Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel deployment successful
- [ ] Build logs show no errors
- [ ] Environment variables set in Vercel
- [ ] Domain configured correctly

### Production URL
Replace `https://yoursite.com` with your actual domain:

- [ ] Can access https://yoursite.com
- [ ] Portfolio displays correctly
- [ ] Admin login works at /admin/login
- [ ] GitHub data synced
- [ ] All animations smooth

### Production Database
- [ ] Connected to production Neon database
- [ ] Has same schema as local
- [ ] Contains synced GitHub data
- [ ] Admin user created

### Production APIs
- [ ] `/api/sync` endpoint works
- [ ] `/api/admin/projects` endpoint works
- [ ] `/api/cron/daily-sync` endpoint works

### Cron Job Setup
- [ ] Cron job scheduled (if using external service)
- [ ] Or Vercel cron configured in vercel.json
- [ ] First sync runs at scheduled time
- [ ] Data updates automatically

### Monitoring
- [ ] Check Vercel logs for errors
- [ ] Monitor database queries
- [ ] Watch for failed syncs
- [ ] Monitor uptime

## Troubleshooting Guide

If any verification fails, see:

| Issue | File to Check |
|-------|---------------|
| Database connection | SETUP.md → Database Setup |
| Admin login not working | SETUP.md → Troubleshooting |
| Projects not showing | SETUP.md → Projects not showing |
| Cron not running | SETUP.md → Cron job not working |
| Deployment failed | README.md → Deployment section |
| Design looks wrong | DESIGN.md → Customization |
| General issues | QUICK_START.md → Troubleshooting |

## Success Criteria

You're done when:

✓ All local tests pass
✓ Admin dashboard works
✓ GitHub data syncs correctly
✓ Portfolio looks beautiful
✓ Deployed to Vercel
✓ Production URL works
✓ Cron job running (if configured)

Then you can celebrate! Your dynamic portfolio is live and working perfectly.

---

Print this checklist and check off items as you verify each component. This ensures nothing is missed before going live.
