SELECT *
FROM ${tableName:name}
WHERE id = ${id} AND is_hidden = false
;