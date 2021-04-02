SELECT *
FROM enrollments
ORDER BY created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;