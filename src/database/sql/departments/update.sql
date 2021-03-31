UPDATE departments
SET name = ${name}
WHERE id = ${id} AND is_hidden = false
;