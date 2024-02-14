import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUsecase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }


    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(input.id);
        if (!product) {
            throw new Error('Product not found');
        }
        
        product.changeName(input.name);
        product.changePrice(input.price);

        await this.productRepository.update(product);
        
        return product;
    }
}