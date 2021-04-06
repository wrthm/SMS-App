SELECT *
FROM students_fix
WHERE is_hidden = false AND (first_name ILIKE ${name.fname} AND middle_name ILIKE ${name.mname} AND last_name ILIKE ${name.lname})
ORDER BY created_at DESC
LIMIT ${pgArgs.limit}
OFFSET ${pgArgs.offset}
;