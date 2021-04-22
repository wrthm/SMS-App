SELECT
    sched.id,
    sched.professor_id,
    prof.first_name AS professor_first_name,
    prof.middle_name AS professor_middle_name,
    prof.last_name AS professor_last_name,
    sched.subject_id,
    subj.name AS subject_name,
    subj.unit_lec AS subject_unit_lec,
    subj.unit_lab AS subject_unit_lab,
    sched.room,
    sched.class,
    sched.capacity,
    sched.time_start,
    sched.time_duration,
    sched.days,
    sched.is_hidden,
    sched.created_at,
    sched.updated_at
FROM schedules sched
INNER JOIN subjects subj ON sched.subject_id = subj.id
INNER JOIN professors prof ON sched.professor_id = prof.id
WHERE subj.name ILIKE ${searchArgs.s_name} AND prof.first_name ILIKE ${searchArgs.p_fname} AND prof.middle_name ILIKE ${searchArgs.p_mname} AND prof.last_name ILIKE ${searchArgs.p_lname}
AND sched.room ILIKE ${searchArgs.room} AND sched.class ILIKE ${searchArgs.class} AND sched.is_hidden = false
ORDER BY sched.created_at DESC
LIMIT ${pgArgs.limit}
OFFSET ${pgArgs.offset}
;