# JobRadar AI

A Next.js application for scraping, filtering, and displaying verified AI job listings.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a Postgres database connection.
3. Set `CRON_SECRET`, `NEXTAUTH_SECRET`, and Telegram credentials if using notifications.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Generate Prisma client and start development:
   ```bash
   npx prisma generate
   npm run dev
   ```

## Deployment

- `vercel.json` is configured for Vercel Cron with `path: /api/cron?secret=YOUR_CRON_SECRET`.
- The app uses a dynamic dashboard page and server-side rendering for live job data.

## Notes

- The scraper pipeline includes a sample Naukri scraper and ZipRecruiter stub.
- `app/api/cron/route.ts` validates `CRON_SECRET` before running scrapers.
