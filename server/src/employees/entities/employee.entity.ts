import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('funcionarios')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cargo: string;

  @Column()
  departamento: string;

  @Column()
  dataContratacao: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  salario: number;
}