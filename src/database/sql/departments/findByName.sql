SELECT *
FROM departments
WHERE name LIKE ${name} AND is_hidden = false
;