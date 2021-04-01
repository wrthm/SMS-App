SELECT *
FROM courses
WHERE name ILIKE ${name} AND is_hidden = false
;