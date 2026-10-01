'use client';

import { useEffect } from 'react';
import { trackCareerViewJob } from '@/lib/analytics';

// Fires career_view_job once when a job detail page is shown. Renders nothing.
export default function TrackJobView({ jobId, jobTitle }) {
  useEffect(() => {
    trackCareerViewJob(jobId, jobTitle);
  }, [jobId, jobTitle]);
  return null;
}
