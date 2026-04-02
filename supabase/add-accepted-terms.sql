-- Add accepted_terms column to profiles for EULA compliance (App Store Guideline 1.2)
alter table public.profiles
  add column if not exists accepted_terms boolean default false not null;
