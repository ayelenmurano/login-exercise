const {
  request,
  app,
  mongoose,
  deleteUser,
  createUser,
  user,
} = require("./helpers");

afterAll(async () => {
  await mongoose.close();
});

describe("/LOGIN", () => {
  beforeAll(async () => {
    const userCreated = await createUser(user);
  });
  test("Should log in", async () => {
    const response = await request(app).post("/login").send({
      password: user.password,
      email: user.email,
    });
    expect(response.statusCode).toBe(200);
    expect(typeof response.body.token).toBe("string");
  });
  test("Log in with incorrect password", async () => {
    const response = await request(app).post("/login").send({
      password: "222323",
      email: user.email,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.response_message).toBe("Invalid Credentials");
  });
  afterAll(async () => {
    await deleteUser({
      email: user.email,
    });
  });
});
