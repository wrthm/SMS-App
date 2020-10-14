INSERT INTO courses (name)
VALUES (${data.name})
RETURNING id
;