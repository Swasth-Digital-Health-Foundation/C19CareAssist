ALTER TABLE
  "public"."c19_triage"
ALTER COLUMN
"person_id" DROP NOT NULL;

ALTER TABLE
  "public"."c19_triage"
ADD
  COLUMN "patient_id" text NULL;

ALTER TABLE
  "public"."c19_triage"
ADD
  COLUMN "fever" text NULL;

ALTER TABLE
  "public"."c19_triage"
ADD
  COLUMN "tachycardia" text NULL;

ALTER TABLE
  "public"."c19_triage"
ADD
  COLUMN "hypotension" text NULL;

ALTER TABLE
  "public"."c19_triage"
ADD
  COLUMN "breathlessness" text NULL;

ALTER TABLE
  "public"."c19_triage"
ADD
  COLUMN "hypoxia" text NULL;