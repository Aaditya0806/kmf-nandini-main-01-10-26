'use client';

import { trackCareerApplyClick } from '@/lib/analytics';

// External "Apply" link: opens the official application site in a new tab and
// records career_apply_click (job id and title only).
export default function ApplyLink({ href, jobId, jobTitle, label, srHint, className = '' }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCareerApplyClick(jobId, jobTitle)}
      className={`inline-flex items-center justify-center bg-primary-gradient text-white px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-main ${className}`}
    >
      {label} ↗<span className="sr-only"> {srHint}</span>
    </a>
  );
}
