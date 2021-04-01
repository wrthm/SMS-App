UPDATE students
SET is_currently_enrolled = true
WHERE id = ${id} AND is_hidden = false
;