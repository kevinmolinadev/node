import { CreateCategoryDto } from "../dtos/category/create.dto";
import { UpdateCategoryDto } from "../dtos/category/update.dto";
import { PaginationDto } from "../dtos/shared/pagination.dto";
import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryDatasource {
    getAll<T>(pagination: PaginationDto): Promise<CategoryEntity[]>,
    getById(id: string): Promise<CategoryEntity>,
    getTotalDocumentsCount(): Promise<number>,
    create(category: CreateCategoryDto): Promise<CategoryEntity>,
    update(category: UpdateCategoryDto): Promise<CategoryEntity>,
    delete(id: string): Promise<CategoryEntity>
}