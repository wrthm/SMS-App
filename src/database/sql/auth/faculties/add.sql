INSERT INTO faculties (first_name, middle_name, last_name, address, phone_number, username, password, privilege)
VALUES (${first_name}, ${middle_name}, ${last_name}, ${address}, ${phone_number}, ${username}, ${password}, ${privilege})
RETURNING id
;