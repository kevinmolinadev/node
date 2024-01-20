import { CreateProductDto, HttpError, IProductDatasource, PaginationDto, UpdateProductDto } from "../../domain";

export class ProductService {
    constructor(
        private readonly datasource: IProductDatasource
    ) { }

    async getAll(pagination: PaginationDto) {
        const [total, products] = await Promise.all([
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
            next: (end) < total ? `api/v1/products?page=${pagination.page + 1}&limit=${pagination.limit}` : null,
            prev: (pagination.page > 1) ? `api/v1/products?page=${pagination.page - 1}&limit=${pagination.limit}` : null,
            products
        }
    }

    getById(id: string) {
        return this.datasource.getById(id);
    }

    add(product: CreateProductDto) {
        return this.datasource.create(product);
    }

    update(product: UpdateProductDto) {
        return this.datasource.update(product);
    }

    delete(id: string) {
        return this.datasource.delete(id);
    }


}