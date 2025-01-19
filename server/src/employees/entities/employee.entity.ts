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
  profissao: string;

}