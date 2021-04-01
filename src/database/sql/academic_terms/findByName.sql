SELECT *
FROM academic_terms
WHERE name ILIKE ${name} AND is_hidden = false
;