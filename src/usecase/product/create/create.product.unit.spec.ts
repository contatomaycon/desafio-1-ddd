import CreateProductUseCase from "./create.product.usecase";

let  input = {
    name: "Nootboot",
    price: 100
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
}

describe("Unit Test create product usecase", () => {

    it("should create a product", async () => {
        const productRepository  = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const output = await usecase.execute(input);
        
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    } );


    it("should throw an error when price is missing", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        
        input.name = "Nootboot";
        input.price = -1;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});