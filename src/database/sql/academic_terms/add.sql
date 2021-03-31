INSERT INTO academic_terms (name)
VALUES (${name})
RETURNING id
;