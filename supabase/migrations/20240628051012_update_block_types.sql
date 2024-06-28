alter table "public"."blocks" drop constraint "public_blocks_block_type_id_fkey";

alter table "public"."block_types" drop constraint "block_types_pkey";

drop index if exists "public"."block_types_pkey";

alter table "public"."block_types" drop column "id";

alter table "public"."block_types" drop column "name";

alter table "public"."block_types" add column "type" text not null;

alter table "public"."blocks" drop column "block_type_id";

alter table "public"."blocks" add column "type" text not null;

CREATE UNIQUE INDEX block_types_pkey ON public.block_types USING btree (type);

alter table "public"."block_types" add constraint "block_types_pkey" PRIMARY KEY using index "block_types_pkey";

alter table "public"."blocks" add constraint "public_blocks_type_fkey" FOREIGN KEY (type) REFERENCES block_types(type) not valid;

alter table "public"."blocks" validate constraint "public_blocks_type_fkey";


