SELECT
    g.enrollment_id,
    g.subject_id,
    s.name as subject_name,
    s.code as subject_code,
    g.grade,
    g.updated_at
FROM grades g
INNER JOIN subjects s ON g.subject_id = s.id
ORDER BY g.updated_at DESC
LIMIT ${limit}
OFFSET ${offset}
;