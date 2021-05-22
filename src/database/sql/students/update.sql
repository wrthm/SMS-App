UPDATE students

SET
    school_id = ${school_id},
    first_name = ${first_name},
    middle_name = ${middle_name},
    last_name = ${last_name},
    a_street = ${a_street},
    a_barangay = ${a_barangay},
    a_city = ${a_city},
    a_province = ${a_province},
    a_zip_code = ${a_zip_code},
    sex = ${sex},
    birth_date = ${birth_date},
    phone_number = $(phone_number),
    email_address = ${email_address}

WHERE id = ${id} AND is_hidden = false
;