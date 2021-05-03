CREATE TABLE providers (
  id SERIAL NOT NULL,
  name VARCHAR ( 250 ) NOT NULL,
  phone_number BIGINT NOT NULL,
  email_id VARCHAR (200) NOT NULL,
  request_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY(id)
)


CREATE TABLE teleconsultation_service (
  id SERIAL NOT NULL,
  request_id VARCHAR(50) NOT NULL,
  caller_number BIGINT NOT NULL,
  request_time TIMESTAMP NOT NULL,
  request_accept_status VARCHAR(5) DEFAULT NULL,
  request_fulfillment_status VARCHAR(5) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY(id)
)