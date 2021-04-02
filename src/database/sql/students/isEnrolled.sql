SELECT EXISTS(
    SELECT 1 
    FROM students
    WHERE id = ${id} AND is_currently_enrolled = true
)
;