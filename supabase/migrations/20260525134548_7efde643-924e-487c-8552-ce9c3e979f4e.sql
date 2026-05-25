
CREATE TABLE public.company_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  company_key text NOT NULL UNIQUE,
  website text,
  summary text,
  strengths jsonb NOT NULL DEFAULT '[]'::jsonb,
  weaknesses jsonb NOT NULL DEFAULT '[]'::jsonb,
  opportunities jsonb NOT NULL DEFAULT '[]'::jsonb,
  threats jsonb NOT NULL DEFAULT '[]'::jsonb,
  sentiment jsonb NOT NULL DEFAULT '[]'::jsonb,
  score integer,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_company_reports_company_key ON public.company_reports (company_key);
CREATE INDEX idx_company_reports_created_at ON public.company_reports (created_at DESC);

ALTER TABLE public.company_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view company reports"
  ON public.company_reports FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert company reports"
  ON public.company_reports FOR INSERT
  WITH CHECK (true);
