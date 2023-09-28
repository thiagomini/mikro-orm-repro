import { MikroORM } from "@mikro-orm/core";

import { Company } from "./entities/company.entity";
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

  test('finds all profiles for all users of a company', async () => {
    // Arrange
    const entityManager = orm.em.fork();
    const company = new Company({
      name: 'Acme'
    });
    await entityManager.persistAndFlush(company);

    const user1 = new User({
      email: 'user@mail.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
      company
    });
    const user2 = new User({
      email: 'user2@mail.com',
      firstName: 'John2',
      lastName: 'Doe2',
      createdAt: new Date(),
      updatedAt: new Date(),
      company
    })
    await entityManager.persistAndFlush([user1, user2]);

    const profileUser1 = new Profile({
      imageUrl: 'https://example.com',
      user: user1
    })
    const profile2User1 = new Profile({
      imageUrl: 'https://example.com/2',
      user: user1
    })
    const profileUser2 = new Profile({
      imageUrl: 'https://example.com',
      user: user2
    })

    await entityManager.persistAndFlush([profileUser1, profile2User1, profileUser2]);


    // Act
    const companyWithProfiles = await entityManager.findOne(Company, { id: company.id }, {
      populate: ['users.profiles'],
      refresh: true
    });

    // Assert
    const userWithASingleProfile = companyWithProfiles.users.find(u => u.id === user2.id);
    expect(userWithASingleProfile.profiles).toHaveLength(1);
  });

});

