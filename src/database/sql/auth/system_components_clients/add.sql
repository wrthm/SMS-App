INSERT INTO system_components_clients (api_key, client_name, component)
VALUES (${api_key}, ${client_name}, ${component})
RETURNING api_key
;