INSERT INTO subjects (code, name)
VALUES (${code}, ${name})
RETURNING id
;