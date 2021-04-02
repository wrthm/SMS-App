UPDATE subjects
SET code = ${code}, name = ${name}
WHERE id = ${id} AND is_hidden = false
;