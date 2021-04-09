SELECT p.id, p.department_id, d.name as department_name, p.first_name, p.middle_name, p.last_name, p.phone_number, p.is_hidden, p.created_at, p.updated_at
FROM professors p
INNER JOIN departments d ON p.department_id = d.id
WHERE p.id = ${id}
;