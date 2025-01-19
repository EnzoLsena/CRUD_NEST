import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'crud_nest-db-1',
  port: 3306,
  username: 'root',
  password: 'senha',
  database: 'deltechdb',
  entities: [Employee],
  synchronize: true,
};

