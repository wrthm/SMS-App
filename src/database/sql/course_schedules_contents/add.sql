INSERT INTO course_schedules_contents (course_schedule_id, schedule_id)
VALUES (${course_schedule_id}, ${schedule_id})
RETURNING id
;