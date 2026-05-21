import { scrapeNaukri } from './naukri';
import { scrapeZipRecruiter } from './ziprecruiter';
import { processJobPipeline } from '../filters/pipeline';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
];

export const getRandomUA = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];

export async function runAllScrapers() {
  const scrapers = [
    { name: 'Naukri', fn: scrapeNaukri },
    { name: 'ZipRecruiter', fn: scrapeZipRecruiter },
  ];

  const results = await Promise.allSettled(
    scrapers.map(async (scraper) => {
      try {
        console.log(`Starting scraper: ${scraper.name}`);
        const rawJobs = await scraper.fn();
        await processJobPipeline(rawJobs, scraper.name);
        return { source: scraper.name, status: 'success', count: rawJobs.length };
      } catch (error) {
        console.error(`Error in ${scraper.name}:`, error);
        throw error;
      }
    })
  );

  return results;
}
