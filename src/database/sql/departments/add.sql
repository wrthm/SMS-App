INSERT INTO departments (name)
VALUES (${name})
RETURNING id
;