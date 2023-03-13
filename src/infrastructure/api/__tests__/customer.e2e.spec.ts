import { app, sequelize } from "../express";
import request from 'supertest'

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a customer", async () => {

    const response = await request(app)
      .post("/customer")
      .send({
        name: "Lucian",
        address: {
          street: "Rua 123",
          number: 99,
          zip: "88888-888",
          city: "Criciúma"
        }
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucian")
    expect(response.body.address.street).toBe("Rua 123")
    expect(response.body.address.number).toBe(99)
    expect(response.body.address.zip).toBe("88888-888")
    expect(response.body.address.city).toBe("Criciúma")
  })

  it("should not create a customer", async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: "Xpto"
      })

    expect(response.status).toBe(500)
  })

  it("should list all customer", async () => {

    const responseOne = await request(app)
      .post("/customer")
      .send({
        name: "Lucian",
        address: {
          street: "Rua 123",
          number: 99,
          zip: "88888-888",
          city: "Criciúma"
        }
      })

    expect(responseOne.status).toBe(200)

    const responseTwo = await request(app)
      .post("/customer")
      .send({
        name: "Ariadne",
        address: {
          street: "Rua 999",
          number: 10,
          zip: "22222-222",
          city: "Criciúma"
        }
      })

    expect(responseTwo.status).toBe(200)

    const listResponse = await request(app).get("/customer").send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    
    const customer1 = listResponse.body.customers[0]
    expect(customer1.name).toBe("Lucian")
    expect(customer1.address.street).toBe("Rua 123")

    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe("Ariadne")
    expect(customer2.address.street).toBe("Rua 999") 

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send()

    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>Lucian</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>Rua 123</street>`);
    expect(listResponseXML.text).toContain(`<city>Criciúma</city>`);
    expect(listResponseXML.text).toContain(`<number>99</number>`);
    expect(listResponseXML.text).toContain(`<zip>88888-888</zip>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);
    expect(listResponseXML.text).toContain(`<name>Ariadne</name>`);
    expect(listResponseXML.text).toContain(`<street>Rua 999</street>`);
    expect(listResponseXML.text).toContain(`</customers>`);
  })

})