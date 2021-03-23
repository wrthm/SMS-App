INSERT INTO courses (department_id, name)
VALUES (${department_id}, ${name})
RETURNING id
;