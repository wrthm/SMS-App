SELECT *
FROM students
WHERE is_hidden = false AND (first_name ILIKE ${fname} OR middle_name ILIKE ${mname} OR last_name ILIKE ${lname})
;