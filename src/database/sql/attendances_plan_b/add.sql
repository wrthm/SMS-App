INSERT INTO attendances_plan_b (enrollment_id, component_client_key, check_type, time)
VALUES (${enrollment_id}, ${component_client_key}, ${check_type}, ${time})
RETURNING id
;