drop policy "Enable delete for users based on user_id" on "public"."forms";

drop policy "Enable read for users based on user_id" on "public"."forms";

drop policy "Enable update for users based on user_id" on "public"."forms";

drop policy "Can update own user data." on "public"."users";

drop policy "Can view own user data." on "public"."users";

create table "public"."block_types" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
);


alter table "public"."block_types" enable row level security;

create table "public"."blocks" (
    "id" uuid not null default gen_random_uuid(),
    "form_id" uuid not null,
    "block_type_id" uuid not null,
    "index" smallint,
    "title" text,
    "description" text,
    "input" jsonb
);


alter table "public"."blocks" enable row level security;

CREATE UNIQUE INDEX block_types_pkey ON public.block_types USING btree (id);

CREATE UNIQUE INDEX blocks_pkey ON public.blocks USING btree (id);

alter table "public"."block_types" add constraint "block_types_pkey" PRIMARY KEY using index "block_types_pkey";

alter table "public"."blocks" add constraint "blocks_pkey" PRIMARY KEY using index "blocks_pkey";

alter table "public"."blocks" add constraint "public_blocks_block_type_id_fkey" FOREIGN KEY (block_type_id) REFERENCES block_types(id) not valid;

alter table "public"."blocks" validate constraint "public_blocks_block_type_id_fkey";

alter table "public"."blocks" add constraint "public_blocks_form_id_fkey" FOREIGN KEY (form_id) REFERENCES forms(id) not valid;

alter table "public"."blocks" validate constraint "public_blocks_form_id_fkey";

grant delete on table "public"."block_types" to "anon";

grant insert on table "public"."block_types" to "anon";

grant references on table "public"."block_types" to "anon";

grant select on table "public"."block_types" to "anon";

grant trigger on table "public"."block_types" to "anon";

grant truncate on table "public"."block_types" to "anon";

grant update on table "public"."block_types" to "anon";

grant delete on table "public"."block_types" to "authenticated";

grant insert on table "public"."block_types" to "authenticated";

grant references on table "public"."block_types" to "authenticated";

grant select on table "public"."block_types" to "authenticated";

grant trigger on table "public"."block_types" to "authenticated";

grant truncate on table "public"."block_types" to "authenticated";

grant update on table "public"."block_types" to "authenticated";

grant delete on table "public"."block_types" to "service_role";

grant insert on table "public"."block_types" to "service_role";

grant references on table "public"."block_types" to "service_role";

grant select on table "public"."block_types" to "service_role";

grant trigger on table "public"."block_types" to "service_role";

grant truncate on table "public"."block_types" to "service_role";

grant update on table "public"."block_types" to "service_role";

grant delete on table "public"."blocks" to "anon";

grant insert on table "public"."blocks" to "anon";

grant references on table "public"."blocks" to "anon";

grant select on table "public"."blocks" to "anon";

grant trigger on table "public"."blocks" to "anon";

grant truncate on table "public"."blocks" to "anon";

grant update on table "public"."blocks" to "anon";

grant delete on table "public"."blocks" to "authenticated";

grant insert on table "public"."blocks" to "authenticated";

grant references on table "public"."blocks" to "authenticated";

grant select on table "public"."blocks" to "authenticated";

grant trigger on table "public"."blocks" to "authenticated";

grant truncate on table "public"."blocks" to "authenticated";

grant update on table "public"."blocks" to "authenticated";

grant delete on table "public"."blocks" to "service_role";

grant insert on table "public"."blocks" to "service_role";

grant references on table "public"."blocks" to "service_role";

grant select on table "public"."blocks" to "service_role";

grant trigger on table "public"."blocks" to "service_role";

grant truncate on table "public"."blocks" to "service_role";

grant update on table "public"."blocks" to "service_role";

create policy "Enable read access for authenticated users only"
on "public"."block_types"
as permissive
for select
to authenticated
using (true);


create policy "Enable delete for form owner only"
on "public"."blocks"
as permissive
for delete
to authenticated
using ((form_id IN ( SELECT forms.id
   FROM forms
  WHERE (forms.user_id = auth.uid()))));


create policy "Enable insert for form owner only"
on "public"."blocks"
as permissive
for insert
to authenticated
with check ((form_id IN ( SELECT forms.id
   FROM forms
  WHERE (forms.user_id = auth.uid()))));


create policy "Enable read access for form owner only"
on "public"."blocks"
as permissive
for select
to authenticated
using ((form_id IN ( SELECT forms.id
   FROM forms
  WHERE (forms.user_id = auth.uid()))));


create policy "Enable update for form owner only"
on "public"."blocks"
as permissive
for update
to authenticated
using ((form_id IN ( SELECT forms.id
   FROM forms
  WHERE (forms.user_id = auth.uid()))))
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."forms"
as permissive
for delete
to authenticated
using ((auth.uid() = user_id));


create policy "Enable read for users based on user_id"
on "public"."forms"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for users based on user_id"
on "public"."forms"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Can update own user data."
on "public"."users"
as permissive
for update
to authenticated
using ((auth.uid() = id));


create policy "Can view own user data."
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));



