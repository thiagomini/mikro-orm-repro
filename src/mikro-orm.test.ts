import { MikroORM } from "@mikro-orm/core";
import { Profile } from "./entities/profile.entity";
import { User } from "./entities/user.entity";
import schemas from "./schemas";
import { registerFactories } from "./entities/register.factories";
import { userFactory } from "./factories/user.factory";

let orm: MikroORM;

describe('Mikro Orm', () => {
  beforeAll(async () => {
    orm = await MikroORM.init({
      clientUrl: 'postgresql://postgres:pass123@localhost:5440/postgres',
      schema: 'test',
      entities: schemas,
      type: 'postgresql',
      allowGlobalContext: true,
      implicitTransactions: false,
    });
    registerFactories(orm)
    await orm.getSchemaGenerator().updateSchema({
      safe: true,
    });
  });

  beforeEach(async () => {
    await orm.em.begin()
  });

  afterEach(async () => {
    orm.em.clear();
    await orm.em.rollback();
  });

  afterAll(async () => {
    await orm.close();
  });

  test('creates a user and assign a profile to it (persisting earlier)', async () => {
    // Arrange
    const entityManager = orm.em;
    const aUser = await userFactory.create();

    const aProfile = new Profile({
      imageUrl: 'https://example.com',
      userId: aUser.id
    })

    // Act
   await entityManager.persistAndFlush(aProfile);

    // Assert
    const userWithProfile = await entityManager.findOne(User, { id: aUser.id }, {
      populate: ['profile'],
      refresh: true
    });
    expect(userWithProfile.profile).toBeTruthy()
  });
});

