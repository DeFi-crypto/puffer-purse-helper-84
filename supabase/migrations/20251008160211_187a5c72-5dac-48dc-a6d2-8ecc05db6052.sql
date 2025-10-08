-- Drop the existing public read policy
DROP POLICY IF EXISTS "Allow system read from subscribers" ON public.subscribers;

-- Create a new policy that only allows service role to read
-- This ensures only your backend edge function can access the emails
CREATE POLICY "Only service role can read subscribers"
ON public.subscribers
FOR SELECT
USING (auth.role() = 'service_role');