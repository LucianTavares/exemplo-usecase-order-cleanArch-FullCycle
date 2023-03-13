import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Customer from "../../../domain/customer/entity/customer"
import Address from "../../../domain/customer/entity/value-object/address"
import FindCustomerUseCase from "./find.customer.usecase"

describe("Test find customer use case", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find a customer", async () => {
    
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer("1", "Lucian")
    const address = new Address("Rua 123", 99, "88888-888", "Criciúma")
    customer.changeAddress(address)
    await customerRepository.create(customer)

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

})