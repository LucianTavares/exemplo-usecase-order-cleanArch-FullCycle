import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/entity/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

const customer = new Customer("1", "Lucian")
const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
customer.changeAddress(address)

const MockRepository = () => {

  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit test find customer use case", () => {

  it("should find a customer", async () => {

    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: "1"
    }

    const output = {
      id: "1",
      name: "Lucian",
      address: {
        street: "Rua 123",
        number: 99,
        zip: "88888-888",
        city: "Criciúma"
      }
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it("should not find a customer", () => {

    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = {
      id: "1"
    }

    expect(() => {
      return usecase.execute(input)
    }).rejects.toThrow("Customer not found")

  })
})