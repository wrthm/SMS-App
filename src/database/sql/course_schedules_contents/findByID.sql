SELECT 
    c_s_c.id,
    c_s_c.course_schedule_id,
    c_s.name as course_schedule_name,
    c_s_c.schedule_id,
    sched.professor_id,
    prof.first_name AS professor_first_name, 
    prof.middle_name AS professor_middle_name, 
    prof.last_name AS professor_last_name,
    sched.subject_id, 
    subj.name AS subject_name, 
    sched.room AS schedule_room,
    sched.class AS schedule_class,
    sched.capacity AS schedule_capacity,
    sched.time_start AS schedule_time_start,
    sched.time_duration AS schedule_time_duration,
    sched.days AS schedule_days,
    c_s_c.created_at
FROM course_schedules_contents c_s_c
INNER JOIN course_schedules c_s ON c_s_c.course_schedule_id = c_s.id
INNER JOIN schedules sched ON c_s_c.schedule_id = sched.id
INNER JOIN subjects subj ON sched.subject_id = subj.id
INNER JOIN professors prof ON sched.professor_id = prof.id
WHERE c_s_c.id = ${id}
;