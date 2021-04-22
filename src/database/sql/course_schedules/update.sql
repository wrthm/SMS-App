UPDATE course_schedules
SET name = ${name}, year_level = ${year_level}
WHERE id = ${id} AND is_hidden = false
;