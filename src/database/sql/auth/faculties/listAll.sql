SELECT
    id,
    first_name,
    middle_name,
    last_name,
    address,
    phone_number,
    username,
    privilege,
    is_deactivated,
    created_at,
    updated_at
FROM faculties
WHERE is_deactivated = false
ORDER BY created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;