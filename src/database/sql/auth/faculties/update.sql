UPDATE faculties
SET
    first_name  = COALESCE(${first_name}, first_name),
    middle_name = COALESCE(${middle_name}, middle_name),
    last_name   = COALESCE(${last_name}, last_name),
    address     = COALESCE(${address}, address),
    phone_number= COALESCE(${phone_number}, phone_number),
    username    = COALESCE(${username}, username),
    password    = COALESCE(${password}, password),
    privilege   = COALESCE(${privilege}, privilege)
WHERE id = ${id}
;