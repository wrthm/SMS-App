INSERT INTO enrollments (academic_term_id, student_id, course_schedule_id, status)
VALUES (${academic_term_id}, ${student_id}, ${course_schedule_id}, ${status})
RETURNING id
;