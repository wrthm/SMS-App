SELECT *
FROM subjects
WHERE name ILIKE ${name} AND is_hidden = false
ORDER BY created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;