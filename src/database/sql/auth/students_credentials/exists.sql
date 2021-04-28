SELECT EXISTS(
    SELECT 1
    FROM students_credentials
    WHERE student_id = ${student_id}
)
;