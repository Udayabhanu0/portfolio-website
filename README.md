# Dynamic Portfolio Website

A stunning, fully dynamic portfolio website that showcases your GitHub projects with real-time data syncing, an admin dashboard for content management, and a visually striking dark theme with neon cyan/blue ambient glow effects.

## Features

### Dynamic GitHub Integration
- **Real-time Data Sync**: Fetches all public repositories, stars, commits, and follower count from GitHub API
- **Zero Setup Time**: Public data fetching requires no authentication
- **Automatic Caching**: Data cached in Neon PostgreSQL for instant loading
- **Daily Auto-Sync**: Syncs at 12:01 AM automatically
- **Manual Refresh**: Admin can force sync anytime via dashboard

### Admin Dashboard
- **Project Management**: Control which projects appear on your portfolio
- **Featured Projects**: Pin important projects to the top
- **Statistics Overview**: View total repos, stars, commits, and followers
- **Sync History**: Track when data was last synced
- **Secure Authentication**: NextAuth.js with password hashing

### Beautiful Dark Design
- **Neon Cyan & Blue Theme**: Deep space background (#050510) with glowing accents
- **Glassmorphism Cards**: Frosted glass effect with backdrop blur
- **Ambient Lighting**: Subtle glowing orbs in background inspired by Vertex3D and Renaud Rohlinger
- **Smooth Animations**: Framer Motion animations for transitions and interactions
- **Responsive Layout**: Mobile-first design working on all devices
- **Scroll Interactions**: Staggered animations as sections come into view

### Performance & Scalability
- **ISR Caching**: Incremental Static Regeneration for fast page loads
- **Database Optimization**: Indexed queries for instant data retrieval
- **Lightweight**: Minimal dependencies, optimized bundle size
- **SEO Ready**: Proper metadata, semantic HTML, Open Graph tags

## Quick Start

### 1. Prerequisites
- Node.js 18+ and pnpm installed
- Neon PostgreSQL account (connected)
- GitHub account (for your portfolio data)

### 2. Installation
```bash
# Install dependencies
pnpm install

# Set up environment variables
# Copy .env.example to .env.local and fill in:
# - DATABASE_URL (from Neon)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
# - NEXTAUTH_URL (http://localhost:3000 for dev)

# Initialize database and create admin user
npx ts-node scripts/setup.ts

# Start development server
pnpm dev
```

### 3. Access Your Portfolio
- **Public Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login
- **Default Credentials**: admin@portfolio.dev / changeme123

## Detailed Setup

See [SETUP.md](./SETUP.md) for comprehensive setup instructions including:
- Database initialization
- Admin user management
- Cron job configuration
- Deployment to Vercel
- Troubleshooting guide

## Architecture

### Database Schema (Neon PostgreSQL)
```sql
-- Projects from GitHub
github_projects (id, repo_id, repo_name, description, url, stars, forks, language, is_visible, is_featured, sort_order)

-- Cached statistics
github_stats (id, total_repos, total_stars, total_commits, total_followers, last_synced)

-- Admin authentication
admin_users (id, email, password_hash, created_at)

-- Sync configuration
sync_settings (id, auto_sync_enabled, sync_time, last_manual_sync, last_auto_sync)
```

### Frontend Components
- **Hero**: Eye-catching introduction with animated elements
- **About**: Professional bio with animated stats
- **Skills**: Categorized technical skills with glassmorphism cards
- **Projects**: Dynamic project grid fetched from database
- **Experience**: Timeline of professional roles
- **Contact**: Social links and email CTA
- **Admin Dashboard**: Full project management interface

### API Routes
```
/api/sync              - GET/POST GitHub data sync
/api/admin/projects    - GET/PATCH project management
/api/auth/[...nextauth] - NextAuth authentication
/api/cron/daily-sync   - Scheduled sync endpoint
```

## Data Flow

1. **First Load**: Run `scripts/setup.ts` → Fetches all public repos from GitHub → Stores in Neon
2. **Daily Sync**: At 12:01 AM, `/api/cron/daily-sync` triggers → Updates database
3. **Manual Sync**: Admin clicks "Refresh GitHub" → Immediate update
4. **Page Load**: React component fetches visible projects from database → Displays on portfolio
5. **Admin Panel**: Admin can toggle visibility, mark featured, control display order

## Customization

### Change Colors
Edit `app/globals.css` color variables:
```css
--background: #050510;      /* Deep space black */
--primary: #00f0ff;         /* Neon cyan */
--secondary: #0099ff;       /* Neon blue */
```

### Modify Admin Credentials
After first login, change password by updating database or using the setup script.

### Add More Sections
Create new components in `/components` and import them in `app/page.tsx`.

### Customize Animations
Edit animation definitions in `app/globals.css` or component Framer Motion configs.

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in project settings
4. Set up cron job in `vercel.json`
5. Deploy with one click

See [SETUP.md](./SETUP.md) for detailed Vercel deployment steps.

## File Structure

```
├── app/
│   ├── page.tsx                    # Main portfolio page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles & animations
│   ├── admin/
│   │   ├── login/page.tsx         # Admin login
│   │   └── page.tsx               # Admin dashboard
│   └── api/
│       ├── auth/[...nextauth]/    # NextAuth routes
│       ├── sync/                   # GitHub sync
│       ├── admin/projects/         # Project management
│       └── cron/daily-sync/       # Scheduled sync
├── components/
│   ├── hero.tsx                   # Hero section
│   ├── about.tsx                  # About section
│   ├── skills.tsx                 # Skills display
│   ├── projects.tsx               # Dynamic projects
│   ├── experience.tsx             # Experience timeline
│   ├── contact.tsx                # Contact section
│   ├── header.tsx                 # Navigation
│   └── footer.tsx                 # Footer
├── lib/
│   ├── db.ts                      # Database utilities
│   └── github.ts                  # GitHub API integration
├── scripts/
│   └── setup.ts                   # Database initialization
└── SETUP.md                       # Detailed setup guide
```

## Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: Neon PostgreSQL
- **Authentication**: NextAuth.js with credentials provider
- **Animations**: Framer Motion
- **Data Fetching**: GitHub REST API
- **UI Components**: Lucide icons, custom glassmorphism

## Security

- Passwords hashed with bcryptjs
- NextAuth.js session tokens
- Database connection via environment variable
- Admin routes require authentication
- Public API only returns visible projects
- SQL injection prevention with parameterized queries

## Troubleshooting

### Projects not showing?
1. Check admin dashboard - projects might be hidden
2. Verify GitHub sync completed
3. Manually trigger refresh with "Refresh GitHub" button

### Can't login?
1. Ensure `DATABASE_URL` is correct
2. Run `npx ts-node scripts/setup.ts` to recreate admin user
3. Clear browser cookies

### Cron job not working?
1. Verify `vercel.json` has correct cron schedule
2. Check Vercel project logs
3. Test manually: `curl -X POST https://yoursite.com/api/cron/daily-sync`

## Support

For issues:
1. Check the comprehensive [SETUP.md](./SETUP.md)
2. Review environment variables
3. Verify database connection
4. Check Vercel/application logs

## Future Enhancements

- Change password from admin panel
- Project filtering and search
- Analytics dashboard
- Blog section with markdown
- Email notifications
- Dark/light mode toggle

## License

MIT - Feel free to customize and deploy!

---

Built with Next.js, Neon PostgreSQL, and a passion for beautiful code. Your GitHub portfolio made dynamic.
