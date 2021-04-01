import { pagination_args } from '../database/modelsCustom'

export function parsePagination(pgArgs: pagination_args) {
    let { page, limit } = pgArgs

    if (!page) {
        page = 1
    } else {
        page = Number(page)
    }
    if (!limit) {
        limit = 50
    } else {
        limit = Number(limit)
    }

    const offset = (page - 1) * limit
    return {limit, offset}
}