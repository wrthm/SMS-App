UPDATE guardians
SET first_name = ${first_name}, middle_name = ${middle_name},
last_name = ${last_name}, phone_number = $(phone_number)
WHERE student_id = ${student_id}
;