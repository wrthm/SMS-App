UPDATE course_schedules
SET name = ${name}
WHERE id = ${id} AND is_hidden = false
;