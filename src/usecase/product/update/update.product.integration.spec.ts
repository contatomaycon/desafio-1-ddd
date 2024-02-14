import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test of integration update product", () => {

    let sequelize: Sequelize;
    
    beforeEach(async () => {
       sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });        
        
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const updateProductUseCase = new UpdateProductUsecase(productRepository);


        const product = new Product("1", "Nootboot", 100);
        await productRepository.create(product);

        expect(product.id).toEqual("1");
        expect(product.name).toEqual("Nootboot");
        expect(product.price).toEqual(100);
        

        const input = {
            "id": "1",
            "name": "Nootboot Updated",
            "price": 200
        }

        const result = await updateProductUseCase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.price).toEqual(input.price);
    });
});