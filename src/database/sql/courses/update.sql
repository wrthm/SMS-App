UPDATE courses
SET
    department_id = COALESCE(${department_id}, department_id),
    name = COALESCE(${name}, name),
    code = COALESCE(${code}, code)
WHERE id = ${id} AND is_hidden = false
;