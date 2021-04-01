INSERT INTO students (school_id, first_name, middle_name, last_name, address, sex,
birth_date, phone_number, email_address, username, password)

VALUES (${school_id}, ${first_name}, ${middle_name}, ${last_name}, ${address}, ${sex},
${birth_date}, ${phone_number}, ${email_address}, ${username}, ${password})

RETURNING id
;