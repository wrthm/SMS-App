SELECT *
FROM course_schedules_contents
WHERE course_schedule_id = ${cs_id}
ORDER BY created_at DESC
;