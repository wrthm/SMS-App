SELECT c.id, c.code, c.name, c.department_id, d.name as department_name, c.is_hidden, c.created_at, c.updated_at
FROM courses c
INNER JOIN departments d ON c.department_id = d.id
WHERE c.is_hidden = false
ORDER BY c.created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;