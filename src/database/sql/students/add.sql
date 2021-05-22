INSERT INTO students (school_id, first_name, middle_name, last_name, a_street, a_barangay, a_city, a_province, a_zip_code, sex, birth_date, phone_number, email_address)
VALUES (${school_id}, ${first_name}, ${middle_name}, ${last_name}, ${a_street}, ${a_barangay}, ${a_city}, ${a_province}, ${a_zip_code}, ${sex}, ${birth_date}, ${phone_number}, ${email_address})
RETURNING id
;