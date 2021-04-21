INSERT INTO schedules (professor_id, subject_id, room, class, capacity, time_start, time_duration, days, unit_type)
VALUES (${professor_id}, ${subject_id}, ${room}, ${class}, ${capacity}, ${time_start}, ${time_duration}, ${days}, ${unit_type})
RETURNING id
;