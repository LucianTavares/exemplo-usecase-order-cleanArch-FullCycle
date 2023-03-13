import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "Lucian",
  new Address("Rua 123", 99, "88888-888", "Bauru")
)

const input = {
  id: customer.id,
  name: "Lucian Tavares",
  address: {
    street: "Rua 999",
    number: 11,
    zip: "11111-111",
    city: "Criciúma"
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn()
  }
}

describe("Unit test for customer update use case", () => {

  it("should update a customer", async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})