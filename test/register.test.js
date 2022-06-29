const {
  request,
  app,
  mongoose,
  deleteUser,
  createUser,
  user,
} = require("./helpers");

describe("/REGISTRAR", () => {
  beforeAll(async () => {
    await deleteUser({
      email: user.email,
    });
  });
  test("Email with invalid format", async () => {
    const response = await request(app).post("/registrar").send({
      username: user.username,
      password: user.password,
      email: "emailTestgmail.com",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.response_message).toBe("User not created.");
  });
  test("Password with invalid format", async () => {
    const response = await request(app).post("/registrar").send({
      username: user.username,
      password: "sssss",
      email: user.email,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.response_message).toBe("User not created.");
  });
  test("It should register the user", async () => {
    const response = await request(app).post("/registrar").send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body.response_message).toBe("User created.");
  });
  afterAll(async () => {
    await deleteUser({
      email: user.email,
    });
  });
});

describe("/REGISTRAR", () => {
  beforeAll(async () => {
    await createUser(user);
  });
  test("User already registered", async () => {
    const response = await request(app).post("/registrar").send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body.response_message).toBe(
      "User with this email address is already registered."
    );
  });
  afterAll(async () => {
    await deleteUser({
      email: user.email,
    });
    await mongoose.close();
  });
});

afterAll(async () => {
  await mongoose.close();
});
