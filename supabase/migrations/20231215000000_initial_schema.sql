-- Vytvoření tabulek pro náš zdravotnický systém
create table public.patients (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    age integer not null,
    last_diagnosis text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.diagnostic_results (
    id uuid default gen_random_uuid() primary key,
    patient_id uuid references public.patients(id) on delete cascade,
    diagnosis text not null,
    image_url text,
    date timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Vytvoření indexů pro lepší výkon
create index idx_patients_created_at on public.patients(created_at);
create index idx_diagnostic_results_patient_id on public.diagnostic_results(patient_id);

-- Trigger pro automatickou aktualizaci updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger handle_patients_updated_at
    before update on patients
    for each row
    execute procedure handle_updated_at();
sing ( auth.role() = 'authenticated' );

-- Podobné politiky pro diagnostic_results
create policy "Public diagnostic results are viewable by everyone."
    on diagnostic_results for select
    using ( true );

create policy "Users can insert diagnostic results."
    on diagnostic_results for insert
    with check ( auth.role() = 'authenticated' );

-- Vytvoření funkcí pro automatickou aktualizaci timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Trigger pro aktualizaci timestamp
create trigger handle_patients_updated_at
    before update on patients
    for each row
    execute procedure handle_updated_at();
