const {
  request,
  app,
  mongoose,
  deleteUser,
  createUser,
  getToken,
  user,
} = require("./helpers");

let token = "";

describe("/USER", () => {
  beforeAll(async () => {
    const userCreated = await createUser(user);
    token = getToken({ user: userCreated, email: user.email });
  });
  test("Should log in", async () => {
    const response = await request(app)
      .get(`/user?email=${user.email}`)
      .set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(user.username);
  });
  afterAll(async () => {
    await deleteUser({
      email: user.email,
    });
  });
});

afterAll(async () => {
  await mongoose.close();
});
