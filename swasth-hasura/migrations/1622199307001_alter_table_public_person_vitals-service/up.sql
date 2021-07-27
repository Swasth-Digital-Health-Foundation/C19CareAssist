ALTER TABLE
"person"
ADD
  COLUMN "status" text DEFAULT 'Active';

ALTER TABLE
"person"
ADD
  COLUMN "patient_id" text NULL;

ALTER TABLE
"person"
ADD
  COLUMN "comorbidity" text NULL;

ALTER TABLE
"person"
ALTER COLUMN
"mobile" DROP NOT NULL;

ALTER TABLE
"person"
ALTER COLUMN
"mobile_hash" DROP NOT NULL;

ALTER TABLE
"person"
ALTER COLUMN
"first_name" DROP NOT NULL;