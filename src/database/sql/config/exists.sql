SELECT EXISTS(
    SELECT 1
    FROM configuration
    WHERE key = $(key)
)
;