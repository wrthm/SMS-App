SELECT EXISTS(
    SELECT 1 
    FROM enrollments
    WHERE student_id = ${student_id}
) as result
;