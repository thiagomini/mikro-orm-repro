// use strict
import { MikroORM, ref } from "@mikro-orm/core";

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
      allowGlobalContext: true
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
    const userRef = ref(aUser);

    const aProfile = new Profile({
      imageUrl: 'https://example.com',
      user: userRef
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

  test('activates the setter', async () => {
    // Arrange
    const aUser = new User({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@mail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const userRef = ref(aUser);

    new Profile({
      imageUrl: 'https://example.com',
      user: userRef
    })
    expect(aUser.profile).toBeTruthy()
  });

  test('setter should work', () => {
    // Arrange
    class ClassWithSetter {
      public name: string;
    }

    Object.defineProperty(ClassWithSetter.prototype, 'name', {
      set() { 
        this['otherProperty'] = 'setter';
      }
    })

    const instance = new ClassWithSetter();

    // Act
    instance.name = 'name';

    // Assert
    expect(instance).toHaveProperty('otherProperty', 'setter')
  })
});

