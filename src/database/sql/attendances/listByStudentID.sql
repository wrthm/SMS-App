SELECT *
FROM attendances
WHERE student_id = ${student_id}
ORDER BY login_time DESC
LIMIT ${limit}
OFFSET ${offset}
;