SELECT *
FROM guardians
WHERE COALESCE(first_name, '') ILIKE ${name.fname} AND COALESCE(middle_name, '') ILIKE ${name.mname} AND COALESCE(last_name, '') ILIKE ${name.lname}
ORDER BY created_at DESC
LIMIT ${pgArgs.limit}
OFFSET ${pgArgs.offset}
;