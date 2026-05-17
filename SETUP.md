# Dynamic Portfolio Setup Guide

This is a fully dynamic portfolio website that fetches your GitHub data in real-time and allows you to manage what projects are visible via an admin dashboard.

## Quick Start

### 1. Initialize the Database

The database tables are already created on Neon. Now create the default admin user and sync your GitHub data:

```bash
# Run the setup script
npx ts-node scripts/setup.ts
```

This will:
- Create a default admin user: `admin@portfolio.dev` / `changeme123`
- Sync all your public repositories from GitHub
- Initialize GitHub statistics (stars, commits, followers)

### 2. Run the Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your portfolio!

## Admin Dashboard

### Access Admin Panel
1. Go to `http://localhost:3000/admin/login`
2. Login with: `admin@portfolio.dev` / `changeme123`
3. **IMPORTANT**: Change your password immediately after first login

### Admin Features
- **View Projects**: See all your GitHub repositories with stats
- **Toggle Visibility**: Show/hide projects from the public portfolio
- **Mark as Featured**: Pin important projects to the top
- **View Statistics**: Total repos, stars, commits, and followers
- **Manual Refresh**: Click "Refresh GitHub" to sync data immediately
- **Sync History**: View when data was last synced

## Automatic Syncing (12:01 AM Daily)

Your GitHub data syncs automatically every day at 12:01 AM. To enable this, set up a scheduled task using one of these services:

### Option A: Vercel Cron (Recommended)
If using Vercel, add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/daily-sync",
      "schedule": "1 0 * * *"
    }
  ]
}
```

### Option B: External Cron Service
Use services like:
- **cron-job.org**: Free, reliable
- **EasyCron**: Simple interface
- **AWS EventBridge**: More control

Configure a POST request to:
```
https://yoursite.com/api/cron/daily-sync
```

Headers (optional, for security):
```
Authorization: Bearer YOUR_CRON_SECRET
```

## Environment Variables

Make sure these are set in your `.env.local` or Vercel project settings:

```env
# Database (from Neon)
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=generate-a-random-string-here
NEXTAUTH_URL=http://localhost:3000  # or your production URL

# Optional: Cron security
CRON_SECRET=your-secret-token
```

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Create Vercel Project
- Go to [vercel.com](https://vercel.com)
- Import your repository
- Add environment variables:
  - `DATABASE_URL` (from Neon)
  - `NEXTAUTH_SECRET` (generate new one)
  - `NEXTAUTH_URL` (your production URL)
  - `CRON_SECRET` (optional)

### 3. Configure Cron Job
Add `vercel.json` with cron configuration (see above).

### 4. Deploy
```bash
git push origin main
```
Vercel will automatically deploy your changes.

## Project Structure

```
app/
├── page.tsx                 # Main portfolio page
├── admin/
│   ├── login/page.tsx      # Admin login
│   └── page.tsx            # Admin dashboard
├── api/
│   ├── auth/[...nextauth]/  # NextAuth configuration
│   ├── sync/                # GitHub sync endpoint
│   ├── admin/projects/      # Project management API
│   └── cron/daily-sync/     # Scheduled sync endpoint
components/
├── hero.tsx                 # Hero section
├── about.tsx                # About section
├── skills.tsx               # Skills section
├── projects.tsx             # Dynamic projects (fetches from DB)
├── experience.tsx           # Experience section
├── contact.tsx              # Contact section
├── header.tsx               # Navigation header
└── footer.tsx               # Footer
lib/
├── db.ts                    # Database utilities
├── github.ts                # GitHub API integration
scripts/
└── setup.ts                 # Setup script
```

## How It Works

### Data Flow
1. **Initial Load**: When you first deploy, `scripts/setup.ts` syncs all public repos from GitHub
2. **Daily Sync**: At 12:01 AM, `/api/cron/daily-sync` fetches latest data
3. **Manual Sync**: Admin can click "Refresh GitHub" anytime
4. **Caching**: Data is stored in Neon PostgreSQL for fast access
5. **Display**: Portfolio fetches visible projects from database (no GitHub API calls on page load)

### Admin Controls
- **is_visible**: Toggle whether a project appears on the public portfolio
- **is_featured**: Pin projects to show first
- **sort_order**: Manual ordering within featured/non-featured groups

## Troubleshooting

### Setup script fails
```bash
# Check database connection
npx ts-node scripts/setup.ts
```

### Projects not showing
1. Check admin dashboard - projects might be hidden (toggle visibility)
2. Verify GitHub sync completed (check "Last Synced")
3. Click "Refresh GitHub" to force a manual sync

### Cron job not running
1. Verify `vercel.json` has correct schedule
2. Check Vercel logs: Dashboard → Your Project → Logs
3. For external cron services, verify the endpoint is accessible

### Admin login not working
1. Database connection issue - check `DATABASE_URL`
2. Clear browser cookies and try again
3. Reset database and run setup script again

## Security Notes

- Change the default admin password immediately
- Use a strong `NEXTAUTH_SECRET`
- Set `CRON_SECRET` if using scheduled syncs
- Neon database is private - only accessible via environment variable
- Admin routes require authentication
- Public portfolio API filters to only visible projects

## Customization

### Change Admin Credentials
After first login, you can't change password through the UI yet. To change:

1. Generate new hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('newpassword', 10))"
```

2. Update database directly:
```bash
# Use Neon console or SQL client
UPDATE admin_users SET password_hash = 'YOUR_NEW_HASH' WHERE email = 'admin@portfolio.dev'
```

### Add More Admins
```bash
# Generate password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password123', 10))"
```

Then insert into database:
```sql
INSERT INTO admin_users (email, password_hash) VALUES ('newadmin@email.com', 'HASH_HERE');
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review environment variables setup
3. Check Vercel/database logs
4. Ensure all dependencies are installed: `pnpm install`

## Next Steps

- Customize the design in `app/globals.css` (colors, fonts)
- Add more sections to the portfolio
- Configure which projects appear as "featured"
- Set up custom domain on Vercel
- Monitor analytics with Vercel Analytics

Happy deploying! 🚀
