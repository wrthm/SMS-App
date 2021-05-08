SELECT
    g.student_id,
    s.first_name AS student_first_name,
    s.middle_name AS student_middle_name,
    s.last_name AS student_last_name,
    g.first_name,
    g.middle_name,
    g.last_name,
    g.address,
    g.phone_number,
    g.first_name_2,
    g.middle_name_2,
    g.last_name_2,
    g.address_2,
    g.phone_number_2,
    g.created_at,
    g.updated_at
FROM guardians g
RIGHT JOIN students s ON g.student_id = s.id
WHERE s.is_hidden = false
ORDER BY g.created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;