const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const cheerio = require('cheerio');
const md5 = require('md5');

const prisma = new PrismaClient();

// A pool of user agents to trick websites into thinking we are a real human browsing
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/121.0.0.0 Safari/537.36'
];

async function scrapeNaukri() {
  console.log('🤖 Accessing Naukri...');
  const url = 'https://www.naukri.com/it-jobs';
  const randomUA = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  
  try {
    const { data } = await axios.get(url, { headers: { 'User-Agent': randomUA } });
    const $ = cheerio.load(data);
    const jobs = [];

    $('.srp-jobtuple-wrapper').each((_, el) => {
      const title = $(el).find('.title').text().trim();
      const companyName = $(el).find('.comp-name').text().trim();
      const location = $(el).find('.locWdth').text().trim();
      const applyUrl = $(el).find('.title').attr('href') || '';
      const description = $(el).find('.job-desc').text().trim();

      if (title && companyName) {
        jobs.push({
          title,
          companyName,
          location: location || 'India / Remote',
          salaryMin: 60000,
          salaryMax: 95000,
          experienceLevel: '0-1 years',
          jobType: 'Full-time',
          domain: 'AI / Tech',
          description: description || 'No description provided by source.',
          applyUrl,
          sourceWebsite: 'Naukri',
          postedAt: new Date()
        });
      }
    });
    return jobs;
  } catch (err) {
    console.error('❌ Failed to scrape Naukri:', err.message);
    return [];
  }
}

async function runEngine() {
  console.log('🚀 Launching Scraping Engine...');
  
  // 1. Gather all raw scraped jobs
  const rawJobs = await scrapeNaukri();
  console.log(`📊 Found ${rawJobs.length} raw jobs from sources.`);

  let addedCount = 0;
  let duplicateCount = 0;

  // 2. Process each job through the pipeline
  for (const job of rawJobs) {
    // Generate an absolute bulletproof unique hash based on Title, Company, and Location
    const jobHash = md5(`${job.title}-${job.companyName}-${job.location}`.toLowerCase().trim());

    // Check if it already exists in Neon database
    const existingJob = await prisma.job.findUnique({
      where: { jobHash }
    });

    if (existingJob) {
      duplicateCount++;
      continue; // Skip it! We don't want duplicates
    }

    // Save brand new job to database
    await prisma.job.create({
      data: {
        ...job,
        jobHash,
        verificationStatus: 'verified'
      }
    });
    addedCount++;
  }

  // 3. Log results to the console
  console.log(`✅ Pipeline complete. Added: ${addedCount} jobs. Filtered Duplicates: ${duplicateCount}.`);
}

runEngine()
  .catch((e) => {
    console.error('💥 Engine crashed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
