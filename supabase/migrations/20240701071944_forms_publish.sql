alter table "public"."forms" add column "status" text not null default 'EDIT'::text;

alter table "public"."forms" add constraint "status_check" CHECK ((status = ANY (ARRAY['EDIT'::text, 'PUBLISH'::text]))) not valid;

alter table "public"."forms" validate constraint "status_check";

create policy "Enable read access of blocks from published forms for all users"
on "public"."blocks"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM forms
  WHERE ((forms.id = blocks.form_id) AND (forms.status = 'PUBLISH'::text)))));


create policy "Enable read access of published forms for all users"
on "public"."forms"
as permissive
for select
to public
using ((status = 'PUBLISH'::text));



