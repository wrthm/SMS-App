SELECT *
FROM guardians
WHERE COALESCE(first_name, '') ILIKE ${name.fname} OR COALESCE(middle_name, '') ILIKE ${name.mname} OR COALESCE(last_name, '') ILIKE ${name.lname}
ORDER BY created_at DESC
LIMIT ${pgArgs.limit}
OFFSET ${pgArgs.offset}
;