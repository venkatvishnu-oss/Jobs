import prisma from '@/lib/prisma';
import JobCard from '@/components/jobs/JobCard';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function DashboardPage() {
  const jobs = await prisma.job.findMany({
    where: { verificationStatus: 'verified', isActive: true },
    orderBy: { postedAt: 'desc' },
    take: 20,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total AI Jobs', value: '1,248' },
          { label: 'Verified Companies', value: '412' },
          { label: 'Avg Monthly Salary', value: '₹85K' },
          { label: 'Scraped Today', value: '142' },
        ].map((stat, i) => (
          <div key={i} className="bg-cl-dark rounded-lg p-5 border-l-4 border-cl-orange">
            <div className="font-display text-[28px] font-semibold text-cl-light">{stat.value}</div>
            <div className="font-body text-[13px] text-cl-mid-gray">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0 bg-cl-light border border-cl-light-gray rounded-lg p-5 h-fit">
          <h4 className="font-display text-[11px] font-medium uppercase tracking-[0.07em] text-cl-mid-gray mb-4">Filters</h4>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Job Domain</label>
              <div className="space-y-2">
                {['AI / ML', 'Backend', 'Data Science', 'Frontend'].map((domain) => (
                  <div key={domain} className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cl-orange rounded-sm w-4 h-4" />
                    <span className="font-body text-[14px]">{domain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
