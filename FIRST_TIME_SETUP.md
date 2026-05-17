# First Time Setup - Sync Your GitHub Projects

If you're seeing **"No projects yet. Check back soon!"** on your portfolio, you need to sync your GitHub repositories to the database.

## Problem

The portfolio site is deployed but the GitHub projects haven't been synced to your Neon PostgreSQL database yet. This happens because:
- The database sync only runs when you manually trigger it
- The initial build doesn't sync (DATABASE_URL isn't available)
- The portfolio fetches projects from the database, not directly from GitHub

## Solution: Sync Your GitHub Projects

You have **3 options** to sync your projects:

### Option 1: Manual Sync via API (Easiest for Vercel Deployment)

Visit this URL in your browser:
```
https://your-deployed-site.vercel.app/api/sync
```

Or curl command:
```bash
curl https://your-deployed-site.vercel.app/api/sync
```

This will:
- Fetch all your public repositories from GitHub
- Save them to your Neon database
- Make them visible on your portfolio

**Expected response:**
```json
{
  "success": true,
  "message": "Synced X projects from GitHub",
  "projectsAdded": 12,
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

---

### Option 2: Run Setup Script Locally

If you have the repo cloned locally:

```bash
# Make sure DATABASE_URL is set in .env.local
NEXTAUTH_SECRET=your_secret NEXTAUTH_URL=http://localhost:3000 NODE_OPTIONS='--loader ts-node/esm' npx ts-node scripts/setup.ts
```

---

### Option 3: Use Admin Dashboard

Once projects are synced:

1. Go to `/admin/login`
2. Login with default credentials:
   - Email: `admin@portfolio.dev`
   - Password: `changeme123`
3. Click **"Refresh from GitHub"** button to manually sync anytime

---

## After Syncing

- Your GitHub repositories will appear on the portfolio
- Projects are sorted by stars (highest first)
- Only public repositories with descriptions show
- You can control visibility from the admin dashboard

---

## Troubleshooting

**Still showing "No projects"?**

1. Check that the sync returned successfully
2. Visit `/api/admin/projects` to see if data is in database
3. Check the browser console for errors (F12 → Console)
4. Verify your GitHub username is correct: `Manish10000`

**Need to change admin password?**

1. Login to admin dashboard
2. Look for "Change Password" option (or contact support)
3. Default is: admin@portfolio.dev / changeme123

---

**Next Steps:**
1. Visit the sync URL above
2. Refresh your portfolio
3. Your GitHub projects should now appear!
