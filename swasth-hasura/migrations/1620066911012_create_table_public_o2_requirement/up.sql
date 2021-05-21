CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."o2_requirement"("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "type" text NOT NULL, "pin_code" text NOT NULL, "city" text, "address_detail" jsonb, "created_at" timestamptz NOT NULL DEFAULT now(), "active" boolean NOT NULL, "id" serial NOT NULL, PRIMARY KEY ("uuid") , FOREIGN KEY ("user_id") REFERENCES "public"."o2_user"("uuid") ON UPDATE cascade ON DELETE cascade);