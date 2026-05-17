# GitHub Projects Sync Guide

## Why No Projects Are Showing

Your GitHub projects aren't displaying because the database hasn't been synced yet. The portfolio fetches your projects from GitHub and caches them in Neon PostgreSQL, but this needs to be initialized first.

## How to Sync Your GitHub Projects

### Option 1: Quick Sync via Browser (Recommended)

1. Visit this URL in your browser:
   ```
   https://v0-ai-portfolio-website-lac-seven.vercel.app/api/sync
   ```

2. You'll see a JSON response:
   ```json
   {
     "success": true,
     "message": "GitHub sync completed successfully",
     "timestamp": "2024-01-15T10:30:00Z",
     "details": {
       "projectsFound": 12,
       "projectsSaved": 12,
       "totalStars": 45,
       "totalCommits": 234
     }
   }
   ```

3. **Refresh your portfolio** - Your GitHub projects should now appear!

### Option 2: Manual Setup (if Option 1 doesn't work)

1. Open terminal in your project directory
2. Ensure `.env.local` has `DATABASE_URL` set correctly
3. Run:
   ```bash
   npx ts-node scripts/setup.ts
   ```

### Option 3: Automatic Daily Sync (Already Running)

Your portfolio is configured to sync GitHub projects automatically every day at 12:01 AM UTC.

---

## What Gets Synced

- All 12+ public repositories from https://github.com/Manish10000
- Repository name, description, and URL
- Star count and fork count
- Primary programming language
- Last update timestamp

## What You Can Control

In the **Admin Dashboard** (https://your-site.com/admin), you can:
- ✅ Show/hide specific projects
- ✅ Mark projects as "Featured"
- ✅ Reorder projects
- ✅ Manually trigger a sync anytime
- ✅ View sync history

## Troubleshooting

### Still Seeing "No projects yet"?

1. **Check the sync status:**
   - Visit `/api/sync` in your browser
   - Check browser console (F12) for errors

2. **Verify database connection:**
   - Visit `/api/admin/projects`
   - Should return a JSON array (empty if not synced)

3. **Check admin dashboard:**
   - Login at `/admin/login`
   - Default: `admin@portfolio.dev / changeme123`
   - Click "Sync Now" button

### Projects showing but descriptions missing?

- Only projects with descriptions show on the portfolio
- Public repos without descriptions are hidden
- Add descriptions to your GitHub repos to display them

---

## Manual Refresh Button

Once synced, you can refresh projects anytime:
1. Go to **Admin Dashboard** → `/admin`
2. Click the **"Sync GitHub Projects"** button
3. Wait for the sync to complete
4. Refresh your portfolio

---

## Google Analytics Configuration

Your Google Analytics is already configured:
- **Measurement ID:** G-3C0LE2ME0H
- **Stream Name:** udayabhanuaich
- **Stream URL:** https://www.udayabhanuaich.org/

Analytics is tracking:
- Page views
- User interactions
- Button clicks
- Time on page
- Device information

View your analytics at: https://analytics.google.com

---

## Questions?

If sync still fails, check:
1. DATABASE_URL is set in Vercel environment variables
2. Your Neon database is accessible
3. No firewall blocking the sync
