import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

const product = ProductFactory.create("a", "Nootboot", 100);

const input = {
    id: product.id,
    name: "Nootboot Updated",
    price: 100
}

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
}

describe("Unit Test update product usecase", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUsecase(productRepository);

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    })

    it("should throw error when product not found", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUsecase(productRepository);

        const input = {
            id: "a",
            name: "Nootboot Updated",
            price: 100
        }

        await expect(productUpdateUseCase.execute(input)).rejects.toThrowError("Product not found");
    });
});