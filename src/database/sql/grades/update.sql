UPDATE grades
SET grade = ${grade}
WHERE enrollment_id = ${enrollment_id} AND subject_id = ${subject_id}
;