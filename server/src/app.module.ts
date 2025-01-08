import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { databaseConfig } from './config/database.config';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    EmployeesModule,
  ],
})
export class AppModule {}