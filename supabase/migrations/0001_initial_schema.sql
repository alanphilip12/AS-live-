-- AS Live initial Supabase schema
-- Apply this migration in the Supabase SQL Editor or with the Supabase CLI.

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default 'New member',
  handle text not null unique,
  avatar_url text,
  headline text not null default '',
  bio text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.topics (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  icon text not null default 'Hash',
  created_at timestamptz not null default now()
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(trim(title)) between 8 and 300),
  description text not null default '',
  views_count integer not null default 0 check (views_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.question_topics (
  question_id uuid not null references public.questions(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  primary key (question_id, topic_id)
);

create table public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  answer_id uuid not null references public.answers(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  content text not null check (char_length(trim(content)) > 0),
  created_at timestamptz not null default now()
);

create table public.answer_votes (
  answer_id uuid not null references public.answers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (answer_id, user_id)
);

create table public.question_bookmarks (
  question_id uuid not null references public.questions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (question_id, user_id)
);

create table public.answer_bookmarks (
  answer_id uuid not null references public.answers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (answer_id, user_id)
);

create table public.user_follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  followed_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followed_id),
  check (follower_id <> followed_id)
);

create table public.topic_follows (
  user_id uuid not null references public.profiles(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

create table public.question_follows (
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  kind text not null check (kind in ('answer', 'comment', 'upvote', 'follow')),
  question_id uuid references public.questions(id) on delete cascade,
  answer_id uuid references public.answers(id) on delete cascade,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index questions_created_at_idx on public.questions (created_at desc);
create index questions_author_id_idx on public.questions (author_id);
create index answers_question_id_idx on public.answers (question_id, created_at desc);
create index comments_answer_id_idx on public.comments (answer_id, created_at asc);
create index notifications_recipient_idx on public.notifications (recipient_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger questions_set_updated_at before update on public.questions
for each row execute function public.set_updated_at();
create trigger answers_set_updated_at before update on public.answers
for each row execute function public.set_updated_at();

-- Create a profile automatically whenever Supabase Auth creates an account.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  chosen_name text;
  chosen_handle text;
begin
  chosen_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
    split_part(coalesce(new.email, 'member'), '@', 1),
    'New member'
  );
  chosen_handle := lower(regexp_replace(
    coalesce(nullif(new.raw_user_meta_data ->> 'handle', ''), chosen_name),
    '[^a-zA-Z0-9_]+', '', 'g'
  ));
  if chosen_handle = '' then chosen_handle := 'member'; end if;
  insert into public.profiles (id, name, handle, avatar_url)
  values (new.id, chosen_name,
    chosen_handle || '_' || substr(new.id::text, 1, 6),
    nullif(new.raw_user_meta_data ->> 'avatar_url', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Enable row-level security on every application table.
alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.questions enable row level security;
alter table public.question_topics enable row level security;
alter table public.answers enable row level security;
alter table public.comments enable row level security;
alter table public.answer_votes enable row level security;
alter table public.question_bookmarks enable row level security;
alter table public.answer_bookmarks enable row level security;
alter table public.user_follows enable row level security;
alter table public.topic_follows enable row level security;
alter table public.question_follows enable row level security;
alter table public.notifications enable row level security;

-- Public content can be read; writes must belong to the authenticated user.
create policy "Profiles are publicly readable" on public.profiles for select using (true);
create policy "Users update their own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Topics are publicly readable" on public.topics for select using (true);

create policy "Questions are publicly readable" on public.questions for select using (true);
create policy "Authenticated users create questions" on public.questions for insert to authenticated with check (auth.uid() = author_id);
create policy "Authors update their questions" on public.questions for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "Authors delete their questions" on public.questions for delete to authenticated using (auth.uid() = author_id);

create policy "Question topics are publicly readable" on public.question_topics for select using (true);
create policy "Authors attach topics to their questions" on public.question_topics for insert to authenticated
with check (exists (select 1 from public.questions q where q.id = question_id and q.author_id = auth.uid()));
create policy "Authors remove topics from their questions" on public.question_topics for delete to authenticated
using (exists (select 1 from public.questions q where q.id = question_id and q.author_id = auth.uid()));

create policy "Answers are publicly readable" on public.answers for select using (true);
create policy "Authenticated users create answers" on public.answers for insert to authenticated with check (auth.uid() = author_id);
create policy "Authors update their answers" on public.answers for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "Authors delete their answers" on public.answers for delete to authenticated using (auth.uid() = author_id);

create policy "Comments are publicly readable" on public.comments for select using (true);
create policy "Authenticated users create comments" on public.comments for insert to authenticated with check (auth.uid() = author_id);
create policy "Authors update their comments" on public.comments for update to authenticated using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "Authors delete their comments" on public.comments for delete to authenticated using (auth.uid() = author_id);

create policy "Vote totals and own vote are readable" on public.answer_votes for select using (true);
create policy "Users cast their own votes" on public.answer_votes for insert to authenticated with check (auth.uid() = user_id);
create policy "Users change their own votes" on public.answer_votes for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users remove their own votes" on public.answer_votes for delete to authenticated using (auth.uid() = user_id);

create policy "Users read their own question bookmarks" on public.question_bookmarks for select to authenticated using (auth.uid() = user_id);
create policy "Users save their own questions" on public.question_bookmarks for insert to authenticated with check (auth.uid() = user_id);
create policy "Users remove their own question bookmarks" on public.question_bookmarks for delete to authenticated using (auth.uid() = user_id);

create policy "Users read their own answer bookmarks" on public.answer_bookmarks for select to authenticated using (auth.uid() = user_id);
create policy "Users save their own answers" on public.answer_bookmarks for insert to authenticated with check (auth.uid() = user_id);
create policy "Users remove their own answer bookmarks" on public.answer_bookmarks for delete to authenticated using (auth.uid() = user_id);

create policy "Follows are publicly readable" on public.user_follows for select using (true);
create policy "Users follow from their own account" on public.user_follows for insert to authenticated with check (auth.uid() = follower_id);
create policy "Users unfollow from their own account" on public.user_follows for delete to authenticated using (auth.uid() = follower_id);

create policy "Topic follows are publicly readable" on public.topic_follows for select using (true);
create policy "Users follow topics from their own account" on public.topic_follows for insert to authenticated with check (auth.uid() = user_id);
create policy "Users unfollow topics from their own account" on public.topic_follows for delete to authenticated using (auth.uid() = user_id);

create policy "Question follows are publicly readable" on public.question_follows for select using (true);
create policy "Users follow questions from their own account" on public.question_follows for insert to authenticated with check (auth.uid() = user_id);
create policy "Users unfollow questions from their own account" on public.question_follows for delete to authenticated using (auth.uid() = user_id);

create policy "Users read their own notifications" on public.notifications for select to authenticated using (auth.uid() = recipient_id);
create policy "Users mark their own notifications read" on public.notifications for update to authenticated using (auth.uid() = recipient_id) with check (auth.uid() = recipient_id);
