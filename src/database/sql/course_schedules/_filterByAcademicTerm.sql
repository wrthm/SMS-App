SELECT
    id
FROM course_schedules
WHERE is_hidden = false AND academic_term_id = ${academic_term_id}
ORDER BY created_at DESC
;