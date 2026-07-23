import React, { useEffect, useState } from 'react';
import { X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const KEY = 'minny_exit_popup_seen';

const ExitIntent = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // desktop-only exit intent, once per user
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(KEY)) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && e.clientY <= 10) {
        localStorage.setItem(KEY, '1');
        setOpen(true);
        document.removeEventListener('mouseout', onOut);
      }
    };
    const t = setTimeout(() => document.addEventListener('mouseout', onOut), 4000);
    return () => { clearTimeout(t); document.removeEventListener('mouseout', onOut); };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setBusy(true);
      const { data, error } = await supabase.functions.invoke('subscribe', { body: { email } });
      if (error) throw new Error(error.message || 'Failed to subscribe');
      setDone(true);
      toast.success(data?.message || 'You are on the list!');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong — try again.');
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-md rounded-3xl bg-[#101410] border border-white/10 p-8 text-center shadow-2xl animate-fade-up">
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="tag inline-block mb-4">Before you go</div>
        <h3 className="font-display text-3xl text-white mb-3">Leaving already?</h3>
        {!done ? (
          <>
            <p className="text-white/70 mb-6">
              Join the list — first access to the drop, and pricing locked in before launch.
            </p>
            <form onSubmit={submit} className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={busy}
                className="pr-14 h-12 bg-black/60 border-white/10 focus:border-primary text-foreground"
              />
              <Button
                type="submit"
                size="icon"
                disabled={busy}
                className="absolute right-1 top-1 bg-primary hover:bg-primary/80 text-black h-10 w-10 rounded-md"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </>
        ) : (
          <p className="text-primary font-medium">You're in. Watch your inbox ✨</p>
        )}
      </div>
    </div>
  );
};

export default ExitIntent;
