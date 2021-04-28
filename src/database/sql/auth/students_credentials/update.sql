UPDATE students_credentials
SET
    username = COALESCE(${username}, username),
    password = COALESCE(${password}, password)
WHERE student_id = ${student_id}
;