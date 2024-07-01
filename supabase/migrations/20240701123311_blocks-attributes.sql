alter table "public"."blocks" drop column "input";

alter table "public"."blocks" add column "attributes" jsonb;


