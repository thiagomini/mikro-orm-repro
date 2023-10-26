// use strict
import { MikroORM } from "@mikro-orm/core";

import { Profile } from "./entities/profile.entity";
import { registerFactories } from "./entities/register.factories";
import { User } from "./entities/user.entity";
import { userFactory } from "./factories/user.factory";
import schemas from "./schemas";

let orm: MikroORM;

describe('Mikro Orm', () => {
  beforeAll(async () => {
    orm = await MikroORM.init({
      clientUrl: 'postgresql://postgres:pass123@localhost:5440/postgres',
      schema: 'test',
      entities: schemas,
      type: 'postgresql',
      debug: true,
    });
    registerFactories(orm)
    await orm.getSchemaGenerator().updateSchema();
  });


  afterEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await orm.close();
  });

  test('creates a user and assign a profile to it (persisting earlier)', async () => {
    // Arrange
    const entityManager = orm.em.fork();
    const aUser = await userFactory.create()

    const aProfile = new Profile({
      imageUrl: 'https://example.com',
      userId: aUser.id
    })

    // Act
   await entityManager.persistAndFlush(aProfile);

    // Assert
    const userWithProfile = await entityManager.findOneOrFail(User, { id: aUser.id }, {
      populate: ['profile'],
      refresh: true
    });
    expect(userWithProfile.profile).toBeTruthy()
  });
});

