import { MapPin, IndianRupee, ShieldCheck } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function JobCard({ job }: { job: any }) {
  return (
    <div className="bg-cl-light border border-cl-light-gray rounded-lg p-5 shadow-card hover:-translate-y-0.5 hover:shadow-hover hover:border-cl-mid-gray transition-all duration-200 cursor-pointer flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-cl-light-gray flex items-center justify-center font-display font-medium text-cl-dark">
            {job.companyName?.charAt(0) ?? 'J'}
          </div>
          <div>
            <h3 className="font-display text-[16px] font-semibold text-cl-dark leading-tight">{job.title}</h3>
            <p className="font-body text-[14px] text-cl-mid-gray">{job.companyName}</p>
          </div>
        </div>
        <span className="bg-cl-green-soft text-[#3B6D11] px-2 py-1 rounded font-display text-[11px] font-medium flex items-center gap-1">
          <ShieldCheck size={12} /> Verified
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-1">
        <span className="bg-cl-orange-soft text-[#993C1D] px-3 py-1 rounded-pill font-display text-[12px] font-medium flex items-center gap-1">
          <IndianRupee size={12} /> {job.salaryMin?.toLocaleString()} - {job.salaryMax?.toLocaleString()}/mo
        </span>
        <span className="bg-cl-blue-soft text-[#185FA5] px-3 py-1 rounded-pill font-display text-[12px] flex items-center gap-1">
          <MapPin size={12} /> {job.location}
        </span>
        <span className="bg-cl-light-gray text-cl-dark px-3 py-1 rounded font-display text-[11px]">
          {job.domain}
        </span>
      </div>

      <p className="font-body text-[13px] text-cl-dark line-clamp-2 mt-2">{job.description}</p>

      <div className="mt-auto pt-4 flex justify-between items-center border-t border-cl-light-gray">
        <span className="font-mono text-[12px] text-cl-mid-gray">
          {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
        </span>
        <button className="bg-cl-orange text-white px-4 py-1.5 rounded-pill font-display text-[13px] font-medium hover:brightness-90 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}
