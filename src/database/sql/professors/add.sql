INSERT INTO professors (department_id, first_name, middle_name, last_name, phone_number)

VALUES (${department_id}, ${first_name}, ${middle_name}, ${last_name}, ${phone_number})

RETURNING id
;