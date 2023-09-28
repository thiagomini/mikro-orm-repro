import { BigIntType, EntitySchema } from '@mikro-orm/core';

import { Company } from '../entities/company.entity';
import { User } from '../entities/user.entity';

export const companySchema = new EntitySchema<Company>({
  class: Company,
  tableName: 'company',
  forceConstructor: true,
  properties: {
    id: {
      type: BigIntType,
      primary: true,
      autoincrement: true,
    },
    name: {
      type: String,
    },
    users: {
      entity: () => User,
      reference: '1:m',
      mappedBy: 'company',
      ref: true
    },
  },
});
