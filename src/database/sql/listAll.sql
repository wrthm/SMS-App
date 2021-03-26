SELECT *
FROM ${tableName:name}
WHERE is_hidden = false
ORDER BY created_at ASC
LIMIT ${limit}
OFFSET ${offset}
;