SELECT *
FROM sessions
WHERE session_token = ${session_token} AND is_revoked = false
;