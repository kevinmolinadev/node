import { CategoryEntity, CreateCategoryDto, HttpError, ICategoryDatasource, PaginationDto } from "../../domain";

export class CategoryService {
    constructor(
        private readonly datasource: ICategoryDatasource
    ) { }

    async getAll(pagination: PaginationDto) {
        const [total, categories] = await Promise.all([
            this.datasource.getTotalDocumentsCount(),
            this.datasource.getAll(pagination)
        ])
        const start = (pagination.limit * (pagination.page - 1)) + 1;
        const end = pagination.page * pagination.limit;
        if (start > total) throw HttpError.notFound("Oops! Out of data.");
        return {
            page: pagination.page,
            limit: pagination.limit,
            total,
            range: `${start} - ${(end < total) ? end : total}`,
            next: (end) < total ? `api/v1/categories?page=${pagination.page + 1}&limit=${pagination.limit}` : null,
            prev: (pagination.page > 1) ? `api/v1/categories?page=${pagination.page - 1}&limit=${pagination.limit}` : null,
            categories
        }
    }

    add(category: CreateCategoryDto) {
        return this.datasource.create(category);
    }


}