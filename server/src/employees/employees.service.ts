import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll() {
    return this.employeeRepository.find();
  }

  create(employee: Partial<Employee>) {
    return this.employeeRepository.save(employee);
  }

  update(id: number, employee: Partial<Employee>) {
    return this.employeeRepository.update(id, employee);
  }

  delete(id: number) {
    return this.employeeRepository.delete(id);
  }
}