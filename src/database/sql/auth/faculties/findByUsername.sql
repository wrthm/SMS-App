SELECT
    id,
    first_name,
    middle_name,
    last_name,
    address,
    phone_number,
    username,
    password,
    privilege,
    is_deactivated,
    created_at,
    updated_at
FROM faculties
WHERE username = ${username}
;