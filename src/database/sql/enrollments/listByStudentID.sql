SELECT *
FROM enrollments
WHERE student_id = ${student_id}
ORDER BY created_at DESC
;