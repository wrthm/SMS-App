UPDATE students

SET school_id = ${school_id}, first_name = ${first_name}, middle_name = ${middle_name},
last_name = ${last_name}, address = ${address}, sex = ${sex}, birth_date = ${birth_date},
phone_number = $(phone_number), email_address = ${email_address}, username = ${username}, password = ${password}

WHERE id = ${id} AND is_hidden = false
;