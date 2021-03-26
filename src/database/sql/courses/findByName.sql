SELECT *
FROM courses
WHERE name LIKE ${name} AND is_hidden = false
;