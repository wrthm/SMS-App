SELECT *
FROM students
WHERE is_hidden = false AND (first_name ILIKE ${fname} AND middle_name ILIKE ${mname} AND last_name ILIKE ${lname})
;