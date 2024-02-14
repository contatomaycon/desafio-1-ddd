import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }
    
    async execute(input: InputListCustomerDto): Promise<Customer[]>{
        const customers = await this.customerRepository.findAll();
        return customers;
    }
}