INSERT INTO subjects (code, name, unit_lec, unit_lab)
VALUES (${code}, ${name}, ${unit_lec}, ${unit_lab})
RETURNING id
;