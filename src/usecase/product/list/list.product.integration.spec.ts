import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test of integration list product usecase", () => {
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

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const listUseCase = new ListProductUseCase(productRepository);

        const product = new Product("1", "Nootboot", 100);
        await productRepository.create(product);
       
        const products = await listUseCase.execute({});

        expect(products.length).toEqual(1);
        expect(products[0].id).toEqual("1");
        expect(products[0].name).toEqual("Nootboot");
        expect(products[0].price).toEqual(100);  
        
    });
});