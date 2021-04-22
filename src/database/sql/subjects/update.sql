UPDATE subjects
SET code = ${code}, name = ${name}, unit_lec = ${unit_lec}, unit_lab = ${unit_lab}
WHERE id = ${id} AND is_hidden = false
;