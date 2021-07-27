ALTER TABLE
"c19_vitals"
ADD
  COLUMN "patient_id" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "fever" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "tachycardia" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "hypotension" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "breathlessness" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "hypoxia" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "pronation" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "program" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "added_mobile" text NULL;

ALTER TABLE
"c19_vitals"
ADD
  COLUMN "time_report" text NULL;

ALTER TABLE
"c19_vitals"
ALTER COLUMN
"person_id" DROP NOT NULL;