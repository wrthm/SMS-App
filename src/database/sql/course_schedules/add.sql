INSERT INTO course_schedules (course_id, academic_term_id, name)
VALUES (${course_id}, ${academic_term_id}, ${name})
RETURNING id
;