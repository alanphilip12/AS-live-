# Supabase setup for AS Live

## 1. Create a Supabase project
Create a project at https://supabase.com/dashboard. Save the database password somewhere secure.

## 2. Apply the database schema
Open **SQL Editor** in your Supabase project, create a new query, paste the contents of
`supabase/migrations/0001_initial_schema.sql`, and run it.

This creates profiles, topics, questions, answers, comments, votes, bookmarks, follows,
and notifications. Row Level Security (RLS) is enabled so users can only modify their
own profile and activity. Public question/answer content is readable without logging in.

## 3. Configure the frontend
In Supabase **Project Settings → API**, copy the Project URL and the publishable key
(or legacy anon key). Copy `.env.example` to `.env.local` and set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Only the publishable/anon key belongs in a browser app. Never expose the
`service_role` key in Vite variables or commit real credentials.

## 4. Install and run
```bash
npm install
npm run dev
```

The client is initialized in `src/lib/supabase.ts`. The existing demo UI still uses
seed data/localStorage until the auth and data layer migration is completed in the
next implementation step.
