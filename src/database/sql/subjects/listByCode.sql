SELECT *
FROM subjects
WHERE is_hidden = false AND code ~ ${code_regex}
ORDER BY created_at DESC
LIMIT ${limit}
OFFSET ${offset}
;