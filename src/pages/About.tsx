import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '@/components/layout/PageShell';
import { usePageMeta } from '@/hooks/use-page-meta';
import { COMPANY_NAME, CONTACT_EMAIL, FOUNDER, LEGAL_NAME, hasFounder } from '@/lib/site';

const FACTS: [string, React.ReactNode][] = [
  ['Company', `${COMPANY_NAME} (${LEGAL_NAME})`],
  ['Product', 'Minny, a convertible purse-to-puffer jacket'],
  ['Based in', 'Minneapolis, Minnesota'],
  ['Origin', 'University of Minnesota startup'],
  ['Status', 'Patent pending. Taking pre-orders for the first production run'],
  ['Ships to', 'United States'],
];

const About = () => {
  usePageMeta('/about');

  return (
    <PageShell>
      <div className="tag inline-block mb-3">About</div>
      <h1 className="font-display text-3xl sm:text-5xl mb-6">About {COMPANY_NAME}</h1>

      <div className="space-y-5 text-foreground/90 leading-relaxed text-base sm:text-lg">
        <p>
          <strong>{COMPANY_NAME}</strong> is an apparel startup from Minneapolis, Minnesota, started at the
          University of Minnesota. We make <strong>Minny</strong>: a purse that unfolds into a real
          down-and-feather puffer jacket in under 30 seconds, and folds back into a purse when you get inside.
        </p>
        {hasFounder() && (
          <p>
            <Link to="/founder" className="text-primary underline">{FOUNDER.name}</Link> is the{' '}
            {FOUNDER.jobTitle.replace('&', 'and')} of {COMPANY_NAME}.
          </p>
        )}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl sm:text-3xl mb-3">Why we made it</h2>
        <div className="space-y-4 text-foreground/90 leading-relaxed">
          <p>
            A night out in a Minnesota winter comes with a bad choice. Wear a proper coat and you pay for coat
            check, wait in line for it, or carry it around all night. Leave the coat at home and you freeze on
            the walk there and back.
          </p>
          <p>
            Minny removes the choice. It is a warm puffer on the walk over. Inside, a folding system tucks the
            down into the shell: the shell becomes the purse and the lining becomes the storage for your phone,
            wallet and keys. Nothing gets left at the bar.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl sm:text-3xl mb-3">Where we are</h2>
        <div className="space-y-4 text-foreground/90 leading-relaxed">
          <p>
            The design is patent pending. Minny was designed in Minneapolis and is available for pre-order now,
            with orders filled from our first production run. We ship within the United States.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl sm:text-3xl mb-4">Company facts</h2>
        <dl className="glass-panel rounded-xl border border-white/5 divide-y divide-white/5">
          {FACTS.map(([k, v]) => (
            <div key={k} className="px-5 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="sm:col-span-2">{v}</dd>
            </div>
          ))}
          <div className="px-5 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm text-muted-foreground">Contact</dt>
            <dd className="sm:col-span-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline break-all">{CONTACT_EMAIL}</a>
            </dd>
          </div>
          <div className="px-5 py-3.5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm text-muted-foreground">Follow</dt>
            <dd className="sm:col-span-2 flex gap-4">
              <a href="https://www.instagram.com/minnyapparel/" target="_blank" rel="noopener noreferrer me" className="text-primary underline">Instagram</a>
              <a href="https://www.tiktok.com/@minnyapparel" target="_blank" rel="noopener noreferrer me" className="text-primary underline">TikTok</a>
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-10">
        <Link to="/" className="btn-primary inline-flex items-center justify-center">See Minny</Link>
      </div>
    </PageShell>
  );
};

export default About;
