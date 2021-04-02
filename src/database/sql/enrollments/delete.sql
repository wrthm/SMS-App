UPDATE enrollments
SET is_revoked = true
WHERE id = ${id} AND is_revoked = false
;