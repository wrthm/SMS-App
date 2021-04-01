SELECT *
FROM ${tableName:name}
WHERE is_hidden = false
ORDER BY created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;