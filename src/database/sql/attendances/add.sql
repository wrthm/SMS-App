INSERT INTO attendances (device_id, academic_term_id, student_id, rfid_tag, login_time)
VALUES (${device_id}, ${academic_term_id}, ${student_id}, ${rfid_tag}, ${login_time})
RETURNING id
;