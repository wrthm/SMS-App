SELECT *
FROM attendances
ORDER BY login_time DESC
LIMIT ${limit}
OFFSET ${offset}
;