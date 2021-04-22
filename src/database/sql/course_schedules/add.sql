INSERT INTO course_schedules (course_id, academic_term_id, name, year_level)
VALUES (${course_id}, ${academic_term_id}, ${name}, ${year_level})
RETURNING id
;