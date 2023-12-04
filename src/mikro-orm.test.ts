import { MikroORM } from "@mikro-orm/core";

import { Company } from "./entities/company.entity";
import { ProductEntity } from './entities/product.entity';
import schemas from './schemas';

let orm: MikroORM;

describe('Mikro Orm', () => {
  beforeAll(async () => {
    orm = await MikroORM.init({
      clientUrl: 'postgresql://postgres:pass123@localhost:5440/postgres',
      schema: 'test',
      entities: schemas,
      type: 'postgresql',
    });

    await orm.getSchemaGenerator().updateSchema();
  });

  afterEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await orm.close();
  });

  test('creates a company with products', async () => {
    // Arrange
    const entityManager = orm.em.fork();
    const company = new Company({
      name: 'Acme',
    });
    await entityManager.persistAndFlush(company);

    const product = new ProductEntity({
      name: 'ProductA',
    });
    company.products.add(product);

    await entityManager.persistAndFlush(company);

    expect(company.products).toHaveLength(1);
  });
});

