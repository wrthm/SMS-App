UPDATE students_credentials
SET
    password = ${password}
WHERE student_id = ${student_id}
;