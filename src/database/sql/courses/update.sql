UPDATE courses
SET department_id = ${department_id}, name = ${name}
WHERE id = ${id} AND is_hidden = false
;