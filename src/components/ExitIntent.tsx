import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, Loader2, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const KEY = 'minny_exit_popup_seen';
const CODE = 'MINNY10';

const ExitIntent = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(KEY)) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 4000);

    const onOut = (e: MouseEvent) => {
      if (!armed) return;
      if (e.relatedTarget === null && e.clientY <= 10) {
        localStorage.setItem(KEY, '1');
        setOpen(true);
        document.removeEventListener('mouseout', onOut);
      }
    };
    document.addEventListener('mouseout', onOut);
    return () => {
      clearTimeout(arm);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setErr('');
    try {
      const { error } = await supabase.functions.invoke('subscribe', {
        body: { email, source: 'exit_popup' },
      });
      if (error) throw new Error(error.message);
      setDone(true);
    } catch (ex) {
      setErr((ex as Error).message || 'Something went wrong — try again.');
    } finally {
      setBusy(false);
    }
  };

  const copy = () => {
    navigator.clipboard?.writeText(CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#101410] border border-white/10 p-7 sm:p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 h-9 w-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        {!done ? (
          <>
            <div className="tag inline-block mb-3">Before you go</div>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">
              Take <span className="text-primary">10% off</span> your Minny.
            </h3>
            <p className="text-white/70 text-sm sm:text-base mb-5">
              Drop your email and we'll send you a one-time code for 10% off your pre-order.
            </p>
            <form onSubmit={submit} className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 rounded-md bg-black/60 border border-white/10 focus:border-primary outline-none px-4 pr-14 text-white placeholder:text-white/40"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Get my code"
                className="absolute right-1 top-1 h-10 w-10 rounded-md bg-primary text-black flex items-center justify-center hover:bg-primary/80"
              >
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </form>
            {err && <div className="mt-3 text-sm text-red-400">{err}</div>}
            <div className="mt-4 text-xs text-white/40">One code per person. Unsubscribe any time.</div>
          </>
        ) : (
          <>
            <div className="tag inline-block mb-3">You're in</div>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">Here's your code.</h3>
            <p className="text-white/70 text-sm sm:text-base mb-5">
              We've emailed it to you too. Enter it at checkout for 10% off.
            </p>
            <button
              onClick={copy}
              className="mx-auto flex items-center gap-3 rounded-xl border border-primary/50 bg-primary/10 px-5 py-3 font-mono text-xl tracking-widest text-primary hover:bg-primary/20"
            >
              {CODE}
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
            <Link
              to="/pre-order"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-primary text-black font-semibold px-7 h-12 hover:bg-primary/90"
            >
              Use it on my pre-order
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ExitIntent;
