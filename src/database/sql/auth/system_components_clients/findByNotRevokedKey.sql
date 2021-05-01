SELECT
    client_name,
    component
FROM system_components_clients
WHERE api_key = ${api_key} AND is_revoked = false
;