SELECT *
FROM departments
WHERE name ILIKE ${name} AND is_hidden = false
;