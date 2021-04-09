INSERT INTO enrollments (academic_term_id, student_id, course_schedule_id)
VALUES (${academic_term_id}, ${student_id}, ${course_schedule_id})
RETURNING id
;