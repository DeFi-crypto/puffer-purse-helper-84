ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'newsletter';

CREATE INDEX IF NOT EXISTS subscribers_source_idx ON public.subscribers (source);
