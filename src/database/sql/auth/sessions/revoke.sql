UPDATE sessions
SET is_revoked = true
WHERE session_token = ${session_token} AND is_revoked = false
;