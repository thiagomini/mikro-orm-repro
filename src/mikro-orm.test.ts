import { MikroORM } from "@mikro-orm/core";

import { Profile } from "./entities/profile.entity";
import { User } from "./entities/user.entity";
import schemas from "./schemas";
import { Id } from "./id.value-object";

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

  test('A profile user id should be a custom type', async () => {
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
    await entityManager.persistAndFlush(aProfile);


    // Act
    const userProfile = await entityManager.findOne(Profile, { id: aProfile.id }, {
      refresh: true,
    });

    // Assert
    
    expect(userProfile).toBeTruthy();
    expect(userProfile.user).toBeInstanceOf(Id)
  })

});

