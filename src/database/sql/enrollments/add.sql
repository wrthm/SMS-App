INSERT INTO enrollments (academic_term_id, student_id, course_id)
VALUES (${academic_term_id}, ${student_id}, ${course_id})
RETURNING id
;