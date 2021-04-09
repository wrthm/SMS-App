SELECT g.enrollment_id, g.subject_id, s.name as subject_name, g.grade, g.is_hidden, g.updated_at
FROM grades g
INNER JOIN subjects s ON g.subject_id = s.id
WHERE g.enrollment_id = ${enrollment_id}
ORDER BY g.updated_at DESC
;