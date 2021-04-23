SELECT
    e.id,
    e.academic_term_id,
    a_t.name AS academic_term_name,
    e.student_id,
    s.first_name AS student_first_name,
    s.middle_name AS student_middle_name,
    s.last_name AS student_last_name,
    e.course_schedule_id,
    c_s.name AS course_schedule_name,
    c.name AS course_name,
    e.status,
    e.is_revoked,
    e.created_at,
    e.updated_at
FROM enrollments e
INNER JOIN academic_terms a_t ON e.academic_term_id = a_t.id
INNER JOIN students s ON e.student_id = s.id
INNER JOIN course_schedules c_s ON e.course_schedule_id = c_s.id
INNER JOIN courses c ON c_s.course_id = c.id
WHERE e.student_id = ${student_id}
ORDER BY e.created_at DESC
;