SELECT cs.id, cs.course_id, c.name as course_name, cs.academic_term_id, a.name as academic_term_name, cs.name, cs.is_hidden, cs.created_at, cs.updated_at
FROM course_schedules cs
INNER JOIN courses c ON cs.course_id = c.id
INNER JOIN academic_terms a ON cs.academic_term_id = a.id
WHERE cs.id = ${id}
;