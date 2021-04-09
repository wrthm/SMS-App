SELECT e.id, e.academic_term_id, a_t.name as academic_term_name, e.student_id, s.first_name as student_first_name, 
    s.middle_name as student_middle_name, s.last_name as student_last_name, e.course_schedule_id, c_s.name as course_schedule_name, 
    e.is_revoked, e.created_at, e.updated_at
FROM enrollments e
INNER JOIN academic_terms a_t ON e.academic_term_id = a_t.id
INNER JOIN students s ON e.student_id = s.id
INNER JOIN course_schedules c_s ON e.course_schedule_id = c_s.id
ORDER BY e.created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;