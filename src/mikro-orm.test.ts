import { MikroORM, ref } from "@mikro-orm/core";
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

  test('creates a user and assign a profile to it (persisting later)', async () => {
    // Arrange
    const entityManager = orm.em.fork();

    const aUser = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const aProfile = new Profile({
      imageUrl: 'https://example.com',
      user: ref(aUser)
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

  test('creates a user and assign a profile to it (persisting earlier)', async () => {
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
      user: ref(aUser)
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

