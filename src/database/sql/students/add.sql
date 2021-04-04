INSERT INTO students (school_id, first_name, middle_name, last_name, address, sex, birth_date, phone_number, email_address)
VALUES (${school_id}, ${first_name}, ${middle_name}, ${last_name}, ${address}, ${sex}, ${birth_date}, ${phone_number}, ${email_address})
RETURNING id
;