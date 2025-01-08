import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, UserPlus, Pencil, Trash2 } from "lucide-react";

interface Employee {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  dataContratacao: string;
  salario: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cargo: '',
    departamento: '',
    dataContratacao: '',
    salario: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch('http://localhost:3000/employees');
    const data = await response.json();
    setEmployees(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing 
      ? `http://localhost:3000/employees/${currentId}`
      : 'http://localhost:3000/employees';
    
    const method = isEditing ? 'PATCH' : 'POST';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        salario: Number(formData.salario)
      })
    });

    setIsDialogOpen(false);
    resetForm();
    fetchEmployees();
  };

  const handleEdit = (employee: Employee) => {
    setFormData({
      nome: employee.nome,
      email: employee.email,
      cargo: employee.cargo,
      departamento: employee.departamento,
      dataContratacao: employee.dataContratacao.split('T')[0],
      salario: employee.salario.toString()
    });
    setCurrentId(employee.id);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/employees/${id}`, {
      method: 'DELETE'
    });
    fetchEmployees();
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      cargo: '',
      departamento: '',
      dataContratacao: '',
      salario: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <CardTitle>Gerenciamento de Funcionários</CardTitle>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Funcionário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo">Cargo</Label>
                    <Input
                      id="cargo"
                      value={formData.cargo}
                      onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Input
                      id="departamento"
                      value={formData.departamento}
                      onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataContratacao">Data de Contratação</Label>
                    <Input
                      id="dataContratacao"
                      type="date"
                      value={formData.dataContratacao}
                      onChange={(e) => setFormData({...formData, dataContratacao: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salario">Salário</Label>
                    <Input
                      id="salario"
                      type="number"
                      value={formData.salario}
                      onChange={(e) => setFormData({...formData, salario: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {isEditing ? 'Atualizar' : 'Cadastrar'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Data Contratação</TableHead>
                <TableHead>Salário</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.nome}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.cargo}</TableCell>
                  <TableCell>{employee.departamento}</TableCell>
                  <TableCell>{new Date(employee.dataContratacao).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(employee.salario)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(employee)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;