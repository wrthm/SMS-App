SELECT *
FROM academic_terms
WHERE is_hidden = false
ORDER BY name ASC
LIMIT ${limit}
OFFSET ${offset}
;