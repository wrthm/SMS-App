SELECT *
FROM professors
WHERE is_hidden = false AND (first_name ILIKE ${name.fname} OR middle_name ILIKE ${name.mname} OR last_name ILIKE ${name.lname})
ORDER BY created_at DESC
LIMIT ${pgArgs.limit}
OFFSET ${pgArgs.offset}
;