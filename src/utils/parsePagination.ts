import { pagination_args } from '../database/modelsCustom'
import { AppServerConfig } from '../config'

export function parsePagination(pgArgs: pagination_args) {
    let { page, limit } = pgArgs

    if (!page) {
        page = 1
    } else {
        page = Number(page)
    }
    if (!limit) {
        limit = AppServerConfig.PaginationDefaultLimit
    } else {
        limit = Number(limit)
    }

    const offset = (page - 1) * limit
    return {limit, offset}
}