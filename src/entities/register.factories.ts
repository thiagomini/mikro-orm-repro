import { MikroORM } from '@mikro-orm/core';
import { FactoryGirl, MikroOrmAdapter } from 'factory-girl-ts'


export function registerFactories(orm: MikroORM) {
  FactoryGirl.setAdapter(new MikroOrmAdapter(orm, { shouldFork: true }))
}