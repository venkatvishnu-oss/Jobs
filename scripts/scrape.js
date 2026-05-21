const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const md5 = require('md5');

const prisma = new PrismaClient();

async function scrapeJobs() {
  console.log('🤖 Fetching real jobs from open API...');
  
  try {
    // This is an open backdoor that NEVER blocks robots!
    const { data } = await axios.get('https://remotive.com/api/remote-jobs?category=software-dev&limit=20');
    const jobs = [];

    // The data comes back instantly as clean computer text (JSON)
    data.jobs.forEach(job => {
      jobs.push({
        title: job.title,
        companyName: job.company_name,
        location: job.candidate_required_location || 'Remote',
        salaryMin: 50000,
        salaryMax: 90000,
        experienceLevel: 'Any',
        jobType: job.job_type ? job.job_type.replace('_', ' ') : 'Full-time',
        domain: 'Software / Tech',
        // Strip out the ugly HTML tags to make it clean
        description: job.description.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...',
        applyUrl: job.url,
        sourceWebsite: 'Remotive',
        postedAt: new Date(job.publication_date || new Date())
      });
    });
    
    return jobs;
  } catch (err) {
    console.error('❌ Failed to fetch jobs:', err.message);
    return [];
  }
}

async function runEngine() {
  console.log('🚀 Launching Scraping Engine...');
  
  const rawJobs = await scrapeJobs();
  console.log(`📊 Found ${rawJobs.length} raw jobs from API.`);

  let addedCount = 0;
  let duplicateCount = 0;

  for (const job of rawJobs) {
    const jobHash = md5(`${job.title}-${job.companyName}-${job.location}`.toLowerCase().trim());

    const existingJob = await prisma.job.findUnique({
      where: { jobHash }
    });

    if (existingJob) {
      duplicateCount++;
      continue;
    }

    await prisma.job.create({
      data: {
        ...job,
        jobHash,
        verificationStatus: 'verified'
      }
    });
    addedCount++;
  }

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
