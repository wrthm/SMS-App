INSERT INTO courses (department_id, name, code)
VALUES (${department_id}, ${name}, ${code})
RETURNING id
;