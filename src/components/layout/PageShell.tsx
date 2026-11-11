import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COMPANY_NAME, CONTACT_EMAIL, LOGO_PATH, hasFounder } from '@/lib/site';

/** Simple header + footer for content pages (About, Founder). */
const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[100svh] flex flex-col bg-background text-foreground">
    <header className="container-custom max-w-3xl pt-8 sm:pt-12 flex items-center justify-between">
      <Link to="/" aria-label={`${COMPANY_NAME} home`}>
        <img src={LOGO_PATH} alt={`${COMPANY_NAME} logo`} className="h-10 md:h-12" />
      </Link>
      <Link to="/" className="inline-flex items-center py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
    </header>

    <main className="container-custom max-w-3xl py-10 sm:py-14 flex-grow">{children}</main>

    <footer className="border-t border-white/10">
      <div className="container-custom max-w-3xl py-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          {hasFounder() && <Link to="/founder" className="hover:text-primary transition-colors">Founder</Link>}
          <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  </div>
);

export default PageShell;
