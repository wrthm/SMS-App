UPDATE students
SET is_currently_enrolled = false
WHERE id = ${id} AND is_hidden = false
;