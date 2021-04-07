UPDATE schedules
SET professor_id = ${professor_id}, subject_id = ${subject_id}, room = ${room}, class = ${class}, 
capacity = ${capacity}, time_start = ${time_start}, time_duration = ${time_duration}, days = ${days}
WHERE id = ${id} AND is_hidden = false
;