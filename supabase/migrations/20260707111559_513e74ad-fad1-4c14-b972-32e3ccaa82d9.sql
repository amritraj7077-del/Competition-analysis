DROP POLICY IF EXISTS "Anyone can insert company reports" ON public.company_reports;
DROP POLICY IF EXISTS "Anyone can view company reports" ON public.company_reports;

REVOKE INSERT ON public.company_reports FROM anon;
GRANT SELECT ON public.company_reports TO anon;
GRANT SELECT, INSERT ON public.company_reports TO authenticated;

CREATE POLICY "Public can view company reports"
  ON public.company_reports FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert company reports"
  ON public.company_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);