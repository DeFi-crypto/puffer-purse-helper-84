import React, { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/** Compact newsletter signup for the hero; posts to the same `subscribe` function as the Newsletter section. */
const HeroSignup = () => {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setErr('');
    try {
      const { error } = await supabase.functions.invoke('subscribe', {
        body: { email, source: 'newsletter' },
      });
      if (error) throw new Error(error.message);
      setDone(true);
    } catch (ex) {
      setErr((ex as Error).message || 'Something went wrong — try again.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="mt-3 inline-flex items-center gap-2 text-[14px] sm:text-[15px] text-white">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-black">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        You're on the list — watch your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 w-full max-w-md">
      <label htmlFor="hero-email" className="sr-only">Email address</label>
      <div className="flex items-center rounded-full bg-black/60 backdrop-blur border border-white/15 focus-within:border-primary p-1 transition-colors">
        <input
          id="hero-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Sign up for our newsletter"
          disabled={busy}
          className="min-w-0 flex-1 bg-transparent px-4 h-9 sm:h-11 text-[14px] sm:text-base text-white placeholder:text-white/50 outline-none"
        />
        <button
          type="submit"
          disabled={busy}
          aria-label="Sign up"
          className="inline-flex items-center justify-center rounded-full text-primary h-9 w-9 sm:h-11 sm:w-11 shrink-0 hover:bg-primary/15 transition-colors disabled:opacity-70"
        >
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />}
        </button>
      </div>
      {err && <p className="mt-1.5 text-[12px] text-red-400">{err}</p>}
    </form>
  );
};

export default HeroSignup;
