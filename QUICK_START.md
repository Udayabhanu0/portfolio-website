# Quick Start - Dynamic Portfolio

Get your portfolio up and running in 5 minutes.

## Step 1: Environment Setup (2 minutes)

Create `.env.local` in project root:

```env
# Database - Get from Neon console
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/dbname

# Auth - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-random-secret-here

# URL - http://localhost:3000 for development
NEXTAUTH_URL=http://localhost:3000
```

## Step 2: Initialize Database (1 minute)

```bash
npx ts-node scripts/setup.ts
```

This creates:
- Admin user: `admin@portfolio.dev` / `changeme123`
- Syncs all your public GitHub repos
- Initializes statistics

## Step 3: Start Development Server (1 minute)

```bash
pnpm dev
```

Visit:
- **Portfolio**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login

## Step 4: Manage Your Portfolio (1 minute)

In the admin dashboard:
1. View all synced projects
2. Toggle visibility (eye icon) to show/hide projects
3. Star projects to mark as featured
4. Click "Refresh GitHub" to sync manually

That's it! Your portfolio is live and dynamic.

## Next Steps

### For Local Development
- Customize colors in `app/globals.css`
- Modify sections in `components/`
- Update bio in `components/about.tsx`

### For Production Deployment
1. Read [SETUP.md](./SETUP.md) deployment section
2. Push to GitHub
3. Connect to Vercel
4. Add environment variables
5. Set up cron job (optional but recommended)

## Important Reminders

- Change admin password immediately after first login
- Set a secure `NEXTAUTH_SECRET` for production
- Configure `NEXTAUTH_URL` to your production domain
- Schedule daily syncs with cron job (see SETUP.md)

## Common Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Initialize database
npx ts-node scripts/setup.ts

# Build for production
pnpm build

# Start production server
pnpm start
```

## Admin URLs

- Login: `/admin/login`
- Dashboard: `/admin`
- Sync endpoint: `/api/sync`
- Projects API: `/api/admin/projects`
- Scheduled sync: `/api/cron/daily-sync`

## Data Sync

- **Automatic**: Every day at 12:01 AM (requires cron setup)
- **Manual**: Click "Refresh GitHub" in admin dashboard
- **First Load**: Runs automatically when you start dev server
- **Frequency**: No rate limits for public data

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Projects not showing | Check admin dashboard visibility toggle |
| Can't login | Run `npx ts-node scripts/setup.ts` again |
| No data syncing | Verify `DATABASE_URL` is correct |
| Slow page loads | Check database indexes (automatic) |

## Security Checklist

- [ ] Changed default admin password
- [ ] Set secure NEXTAUTH_SECRET
- [ ] Database URL only in environment variables
- [ ] NEXTAUTH_URL set to production domain
- [ ] Verified GitHub data is public

## GitHub Data Fetched

Your portfolio automatically syncs:
- Repository names and descriptions
- Star counts and forks
- Programming languages
- GitHub URLs
- Commit history

No private data or authentication required!

## Support

For detailed information, see:
- [README.md](./README.md) - Full documentation
- [SETUP.md](./SETUP.md) - Comprehensive setup guide

Happy building!
