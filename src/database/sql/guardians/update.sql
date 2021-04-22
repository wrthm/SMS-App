UPDATE guardians
SET
    first_name = ${first_name},
    middle_name = ${middle_name},
    last_name = ${last_name},
    phone_number = ${phone_number},
    address = ${address},
    first_name_2 = ${first_name_2},
    middle_name_2 = ${middle_name_2},
    last_name_2 = ${last_name_2},
    phone_number_2 = ${phone_number_2},
    address_2 = ${address_2}
WHERE student_id = ${student_id}
;