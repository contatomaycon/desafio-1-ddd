import { app, sequelize} from '../express';
import request from 'supertest';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        
        const response = await request(app)
            .post("/product")
            .send({
                name: "Nootboot",
                price: 100
            });

          expect(response.status).toBe(200);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "",
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Nootboot",
                price: 100
            });
        expect(response.status).toBe(200);
        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Nootboot",
                price: 100
            });
        expect(response2.status).toBe(200);

        const response3 = await request(app)
            .get("/product");  
    
        // console.log(response3.body);
        // expect(response3.status).toBe(200);
        // expect(response3.body.length).toBe(2);
    });
});
