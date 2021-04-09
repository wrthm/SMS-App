SELECT p.id, p.department_id, d.name as department_name, p.first_name, p.middle_name, p.last_name, p.phone_number, p.is_hidden, p.created_at, p.updated_at
FROM professors p
INNER JOIN departments d ON p.department_id = d.id
WHERE p.is_hidden = false AND (p.first_name ILIKE ${name.fname} AND p.middle_name ILIKE ${name.mname} AND p.last_name ILIKE ${name.lname})
ORDER BY p.created_at DESC
LIMIT ${pgArgs.limit}
OFFSET ${pgArgs.offset}
;