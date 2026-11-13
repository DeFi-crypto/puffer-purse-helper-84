import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '@/components/layout/PageShell';
import { usePageMeta } from '@/hooks/use-page-meta';
import { COMPANY_NAME, FOUNDER } from '@/lib/site';

const profileLabel = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

/** Only routed when FOUNDER.name is filled in (see src/lib/site.ts). */
const Founder = () => {
  usePageMeta('/founder');

  return (
    <PageShell>
      <div className="tag inline-block mb-3">Founder</div>
      <div className="flex flex-col sm:flex-row gap-6 sm:items-center mb-8">
        {FOUNDER.image && (
          <img
            src={FOUNDER.image}
            alt={`${FOUNDER.name}, ${FOUNDER.jobTitle} of ${COMPANY_NAME}`}
            className="h-40 w-40 rounded-2xl object-cover"
            width={160}
            height={160}
          />
        )}
        <div>
          <h1 className="font-display text-3xl sm:text-5xl mb-2">{FOUNDER.name}</h1>
          <p className="text-muted-foreground text-lg">
            {FOUNDER.jobTitle}, <Link to="/about" className="text-primary underline">{COMPANY_NAME}</Link>
          </p>
        </div>
      </div>

      <div className="space-y-5 text-foreground/90 leading-relaxed text-base sm:text-lg">
        <p>
          {FOUNDER.name} is the {FOUNDER.jobTitle.replace('&', 'and')} of {COMPANY_NAME}, the Minneapolis
          startup behind Minny, a patent-pending purse that unfolds into a down puffer jacket.
        </p>
        {FOUNDER.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {FOUNDER.profiles.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl sm:text-3xl mb-3">Elsewhere</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOUNDER.profiles.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer me" className="text-primary underline">
                  {profileLabel(url)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
};

export default Founder;
