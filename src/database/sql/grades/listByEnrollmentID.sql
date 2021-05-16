SELECT DISTINCT ON (subj.id)
    subj.id as subject_id,
    subj.name as subject_name,
    subj.code as subject_code,
    s.unit_lec as subject_unit_lec,
    s.unit_lab as subject_unit_lab,
    g.grade,
    g.updated_at
FROM enrollments e
INNER JOIN course_schedules c_s ON c_s.id = e.course_schedule_id
INNER JOIN course_schedules_contents c_s_c ON c_s_c.course_schedule_id = c_s.id
INNER JOIN schedules sched ON sched.id = c_s_c.schedule_id
INNER JOIN subjects subj ON subj.id = sched.subject_id
LEFT JOIN grades g ON g.subject_id = subj.id
WHERE e.id = ${enrollment_id}
ORDER BY subj.id ASC
;