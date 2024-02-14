import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Description 1", 1);
const product2 = ProductFactory.create("a", "Description 2", 2);

const MockRepository = ()=>{
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn()
    };
}

describe("Unit test list product usecase", () => {

    it("should list products", async () => {
        const productRepository  = MockRepository();
        const productListUseCase = new ListProductUseCase(productRepository);

        const output = await productListUseCase.execute({});
        expect(output).toEqual([product1, product2]);
    });
});