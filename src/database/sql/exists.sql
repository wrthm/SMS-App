SELECT EXISTS(
    SELECT 1 
    FROM ${_table:name} 
    WHERE id = ${id}
)
;