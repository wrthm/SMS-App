SELECT
    a.enrollment_id,
    a.component_client_key,
    a.check_type,
    a.time
FROM attendances_plan_b a
INNER JOIN enrollments e ON a.enrollment_id = e.id
INNER JOIN students s ON e.student_id = s.id
INNER JOIN academic_terms a_t ON e.academic_term_id = a_t.id
WHERE s.id = ${student_id} AND a_t.id = ${academic_term_id}
ORDER BY time ASC
;