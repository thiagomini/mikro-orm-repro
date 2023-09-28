import { MikroORM } from "@mikro-orm/core";

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

  test('should pass', () => {
    expect(1).toBe(1)
  });
});

