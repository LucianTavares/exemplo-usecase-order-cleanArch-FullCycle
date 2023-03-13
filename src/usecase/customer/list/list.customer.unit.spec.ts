import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress(
  "Lucian",
  new Address(
    "Rua 123",
    99,
    "88888-888",
    "Criciúma"
  )
)

const customerTwo = CustomerFactory.createWithAddress(
  "Ariadne",
  new Address(
    "Rua 999",
    10,
    "22222-222",
    "Criciúma"
  )
)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo]))
  }
}

describe("Unit test for listing customer use case", () => {

  it("should list a customer", async () => {

    const repository = MockRepository()
    const useCase = new ListCustomerUseCase(repository)
    const output = await useCase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customerOne.id)
    expect(output.customers[0].name).toBe(customerOne.name)
    expect(output.customers[0].address.street).toBe(customerOne.Address.street)

    expect(output.customers[1].id).toBe(customerTwo.id)
    expect(output.customers[1].name).toBe(customerTwo.name)
    expect(output.customers[1].address.street).toBe(customerTwo.Address.street)

  })

})