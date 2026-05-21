import md5 from 'md5';
import prisma from '../prisma';
import { checkFraudSignals } from '../verify/fraudSignals';
import { sendTelegramAlert } from '../notify/telegram';

export async function processJobPipeline(rawJobs: any[], source: string) {
  let verifiedCount = 0;
  let rejectedCount = 0;

  for (const job of rawJobs) {
    const jobHash = md5(`${job.title}-${job.companyName ?? job.company}-${job.postedAt}`);

    const exists = await prisma.job.findUnique({ where: { jobHash } });
    if (exists) continue;

    if (job.salaryMin < 50000) {
      await logRejection(job, source, 'Salary below 50k');
      rejectedCount++;
      continue;
    }

    const isFraud = checkFraudSignals(job.description);
    if (isFraud) {
      await logRejection(job, source, 'Fraud signals detected');
      rejectedCount++;
      continue;
    }

    const savedJob = await prisma.job.create({
      data: {
        jobHash,
        title: job.title,
        companyName: job.companyName,
        companyLogoUrl: job.companyLogoUrl ?? null,
        location: job.location,
        isRemote: job.isRemote ?? false,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency ?? 'INR',
        salaryPeriod: job.salaryPeriod ?? 'monthly',
        experienceLevel: job.experienceLevel ?? 'Not specified',
        jobType: job.jobType ?? 'full-time',
        domain: job.domain ?? 'General',
        description: job.description ?? '',
        applyUrl: job.applyUrl,
        sourceWebsite: source,
        postedAt: job.postedAt instanceof Date ? job.postedAt : new Date(job.postedAt),
        verificationStatus: 'verified',
        companyRating: job.companyRating ?? null,
        companyReviews: job.companyReviews ?? null,
        companyWebsite: job.companyWebsite ?? null,
        companyAge: job.companyAge ?? null,
        fraudFlags: (job.fraudFlags ?? []) as string[],
      },
    });

    verifiedCount++;
    await sendTelegramAlert(savedJob);
  }

  await prisma.scrapeLog.create({
    data: {
      source,
      totalFound: rawJobs.length,
      afterFilters: rawJobs.length - rejectedCount,
      verified: verifiedCount,
      rejected: rejectedCount,
      posted: verifiedCount,
    },
  });
}

async function logRejection(job: any, source: string, reason: string) {
  await prisma.rejectedJob.create({
    data: { title: job.title ?? 'Unknown', company: job.companyName ?? job.company ?? 'Unknown', source, reason, rawData: job },
  });
}
