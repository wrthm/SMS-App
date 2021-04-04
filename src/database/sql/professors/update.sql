UPDATE professors
SET department_id = ${department_id}, first_name = ${first_name}, middle_name = ${middle_name},
last_name = ${last_name}, phone_number = $(phone_number)
WHERE id = ${id} AND is_hidden = false
;