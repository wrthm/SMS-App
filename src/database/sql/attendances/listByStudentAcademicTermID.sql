SELECT *
FROM attendances
WHERE student_id = ${student_id} AND academic_term_id = ${academic_term_id}
ORDER BY login_time DESC
LIMIT ${limit}
OFFSET ${offset}
;