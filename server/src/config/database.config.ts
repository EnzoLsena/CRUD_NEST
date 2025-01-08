import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from '../employees/entities/employee.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'deltechdb',
  entities: [Employee],
  synchronize: true,
};

