import axios from 'axios';
import * as cheerio from 'cheerio';
import { getRandomUA } from './index';

export async function scrapeNaukri() {
  const url = 'https://www.naukri.com/it-jobs?jobAge=1';
  const { data } = await axios.get(url, { headers: { 'User-Agent': getRandomUA() } });
  const $ = cheerio.load(data);
  const jobs: any[] = [];

  $('.srp-jobtuple-wrapper').each((_, el) => {
    const title = $(el).find('.title').text().trim();
    const company = $(el).find('.comp-name').text().trim();
    const location = $(el).find('.locWdth').text().trim();
    const applyUrl = $(el).find('.title').attr('href') || '';
    const desc = $(el).find('.job-desc').text().trim();
    const experience = $(el).find('.expwdth').text().trim();

    jobs.push({
      title,
      companyName: company,
      company: company,
      location,
      experienceLevel: experience || 'Not specified',
      description: desc,
      applyUrl,
      salaryMin: 50000,
      salaryMax: 80000,
      jobType: 'full-time',
      domain: 'AI / ML',
      source: 'Naukri',
      postedAt: new Date(),
    });
  });

  return jobs;
}
