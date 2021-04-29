INSERT INTO sessions (session_token, ip_address, user_agent, type, id, expiration_date)
VALUES (
    ${session_token},
    ${ip_address},
    ${user_agent},
    ${type},
    ${id},
    ${expiration_date}
)
;