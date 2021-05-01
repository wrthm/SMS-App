-- UPDATE system_components_clients
-- SET is_revoked = true
-- WHERE api_key = ${api_key} AND is_revoked = false
-- ;

DELETE FROM system_components_clients
WHERE client_name = ${client_name}
;