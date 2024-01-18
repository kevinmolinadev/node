import { CategoryModel } from "../../../data";
import { CategoryEntity, CreateCategoryDto, HttpError, ICategoryDatasource, PaginationDto, UpdateCategoryDto } from "../../../domain";

export class CategoryMongo implements ICategoryDatasource {

    getTotalCategoriesCount() {
        return CategoryModel.countDocuments({});
    }

    private async verifyName(name: String) {
        const category = await CategoryModel.findOne({ name })
        if (category) throw HttpError.badRequest("Name alredy exists.");
    }


    async getAll(pagination: PaginationDto): Promise<CategoryEntity[]> {
        const categories = await CategoryModel
            .find({})
            .skip((pagination.page - 1) * pagination.limit)
            .limit(pagination.limit);
        return categories.map(CategoryEntity.fromObject);
    }

    async getById(id: string): Promise<CategoryEntity> {
        const category = await CategoryModel.findById(id);
        if (!category) throw HttpError.notFound(`Category with id ${id} not found.`);
        return CategoryEntity.fromObject(category);
    }

    getTotalDocumentsCount(): Promise<number> {
        return CategoryModel.countDocuments();
    }

    async create(category: CreateCategoryDto): Promise<CategoryEntity> {
        await this.verifyName(category.name);
        const newCategory = await CategoryModel.create(category)
        return CategoryEntity.fromObject(newCategory);

    }
    async update(category: UpdateCategoryDto): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<CategoryEntity> {
        throw new Error("Method not implemented.");
    }

}