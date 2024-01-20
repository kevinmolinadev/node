import { ProductModel } from "../../../data";
import { ProductEntity, CreateProductDto, HttpError, IProductDatasource, PaginationDto, UpdateProductDto } from "../../../domain";

export class ProductMongo implements IProductDatasource {

    getTotalCategoriesCount() {
        return ProductModel.countDocuments({});
    }

    private async verifyName(name: String) {
        const product = await ProductModel.findOne({ name })
        if (product) throw HttpError.badRequest("Name alredy exists.");
    }


    async getAll(pagination: PaginationDto): Promise<ProductEntity[]> {
        const products = await ProductModel
            .find({})
            .skip((pagination.page - 1) * pagination.limit)
            .limit(pagination.limit)
            .populate(["user", "category"]);
        return products.map(ProductEntity.fromObject);
    }

    async getById(id: string): Promise<ProductEntity> {
        const product = await ProductModel.findById(id).populate(["user", "category"]);
        if (!product) throw HttpError.notFound(`Product with id ${id} not found.`);
        return ProductEntity.fromObject(product);
    }

    getTotalDocumentsCount(): Promise<number> {
        return ProductModel.countDocuments();
    }

    async create(product: CreateProductDto): Promise<ProductEntity> {
        await this.verifyName(product.name);
        const newProduct = await ProductModel.create(product)
        return ProductEntity.fromObject(newProduct);

    }

    async update(product: UpdateProductDto): Promise<ProductEntity> {
        await this.verifyName(product.name);
        const updateProduct = await ProductModel.updateOne({ _id: product.id }, product.values);
        return ProductEntity.fromObject(updateProduct);
    }

    async delete(id: string): Promise<ProductEntity> {
        const deleteProduct = await ProductModel.deleteOne({ _id: id });
        return ProductEntity.fromObject(deleteProduct);
    }

}