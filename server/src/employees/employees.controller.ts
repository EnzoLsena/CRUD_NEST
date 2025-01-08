import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Post()
  create(@Body() employee: Partial<Employee>) {
    return this.employeesService.create(employee);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() employee: Partial<Employee>) {
    return this.employeesService.update(+id, employee);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeesService.delete(+id);
  }
}