import { CreateProductDto } from "../dtos/product/create.dto";
import { UpdateProductDto } from "../dtos/product/update.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { ProductEntity } from "../entities/product.entity";

export interface IProductDatasource {
    getAll(pagination: PaginationDto): Promise<ProductEntity[]>,
    getById(id: string): Promise<ProductEntity>,
    getTotalDocumentsCount(): Promise<number>,
    create(product: CreateProductDto): Promise<ProductEntity>,
    update(product: UpdateProductDto): Promise<ProductEntity>,
    delete(id: string): Promise<ProductEntity>
}