SELECT *
FROM grades
ORDER BY updated_at DESC
LIMIT ${limit}
OFFSET ${offset}
;