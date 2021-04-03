SELECT *
FROM grades
WHERE enrollment_id = ${enrollment_id}
ORDER BY updated_at DESC
;