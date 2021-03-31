SELECT *
FROM academic_terms
WHERE name LIKE ${name} AND is_hidden = false
;