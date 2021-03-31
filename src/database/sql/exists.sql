SELECT EXISTS(
    SELECT 1 
    FROM ${tableName:name} 
    WHERE id = ${id}
)
;