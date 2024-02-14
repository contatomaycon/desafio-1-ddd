import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John", new Address("Street 1", 1, "Zip 1", "City 1"));
const customer2 = CustomerFactory.createWithAddress("John 2", new Address("Street 2", 2, "Zip 2", "City 2"));

const MockRepository = ()=>{
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    };
}

describe("Unit Test list customer usecase", () => {
    
        it("should list customers", async () => {
            const customerRepository = MockRepository();
            const customerListUseCase = new ListCustomerUseCase(customerRepository);
    
            const output = await customerListUseCase.execute({});
            expect(output).toEqual([customer1, customer2]);
        });
});


