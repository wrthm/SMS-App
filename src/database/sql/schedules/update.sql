UPDATE schedules
SET
    professor_id = ${professor_id},
    subject_id = ${subject_id},
    room = ${room},
    class = ${class}, 
    capacity = ${capacity},
    time_start = ${time_start},
    time_duration = ${time_duration},
    days = ${days},
    unit_type = ${unit_type}
WHERE id = ${id} AND is_hidden = false
;