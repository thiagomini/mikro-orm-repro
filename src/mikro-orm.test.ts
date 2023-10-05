import { MikroORM } from "@mikro-orm/core";

import { Profile } from "./entities/profile.entity";
import { User } from "./entities/user.entity";
import schemas from "./schemas";

let orm: MikroORM;

describe('Mikro Orm', () => {
  beforeAll(async () => {
    orm = await MikroORM.init({
      clientUrl: 'postgresql://postgres:pass123@localhost:5440/postgres',
      schema: 'test',
      entities: schemas,
      type: 'postgresql'
    });

    await orm.getSchemaGenerator().updateSchema({
      safe: true,
    });
  });

  afterEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await orm.close();
  });

  test('creates a profile for a user', async () => {
    // Arrange
    const entityManager = orm.em.fork();
    const aUser = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await entityManager.persistAndFlush(aUser);


    const aProfile = new Profile({
      imageUrl: 'https://example.com',
      user: aUser.id
    })

    // Act
    await entityManager.persistAndFlush(aProfile);

    // Assert
    const user = await entityManager.findOne(User, { id: aUser.id }, {
      refresh: true,
    });
    expect(user).toBeTruthy();
  })

});

