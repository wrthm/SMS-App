SELECT *
FROM guardians
ORDER BY created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;