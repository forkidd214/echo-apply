-- Seed only if not already seeded
do $$
begin
  if not exists (select 1 from settings where key = 'block_type_seeded') then
    insert into block_types (type) values ('SHORT_TEXT'), ('MULTIPLE_CHOICE');
    insert into settings (key, value) values ('block_type_seeded', 'true');
  end if;
end $$;
