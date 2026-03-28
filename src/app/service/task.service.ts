import { computed, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';
import { CreateTaskDTO, UpdateTaskDTO } from '../models/task.dto';

@Injectable({ providedIn: 'root' })

// Service para gerenciar as tarefas
export class TaskService {
  // Simulando uma resposta de API com um array de tarefas inicial

  //Lembrando que essa lista é um signal ou seja ela funiciona  assim:

  // 1. O signal é uma função que retorna um valor reativo, ou seja, um valor que pode ser observado e atualizado.
  // 2. O signal é criado usando a função signal, que recebe um valor inicial como argumento.
  // 3. O valor do signal pode ser acessado usando a função get, que retorna o valor atual do signal.
  // 4. O valor do signal pode ser atualizado usando a função set, que recebe um novo valor como argumento e atualiza o valor do signal.

  // Exemplo de uso do signal:

  // const count = signal(0); // Criando um signal com valor inicial 0

  // console.log(count.get()); // Acessando o valor do signal, imprime 0

  // count.set(1); // Atualizando o valor do signal para 1

  // console.log(count.get()); // Acessando o valor do signal novamente, imprime 1

  // è como se fosse um UseState do React, ou seja, ele é um estado reativo que pode ser atualizado e observado.

  private _tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Learn Angular Signals',
      description: 'Entender signal(), computed(), effect()',
      status: 'completed',
      createdAt: new Date('2026-03-20'),
    },
    {
      id: 2,
      title: 'Build TaskFlow app',
      description: 'Praticar components, routing e services',
      status: 'in-progress',
      createdAt: new Date('2026-03-22'),
    },
    {
      id: 3,
      title: 'Style com SCSS',
      description: 'Adicionar CSS custom properties e animações',
      status: 'pending',
      createdAt: new Date('2026-03-25'),
    },
  ]);

  //========================== copiar ListaTask ==========================

  //Aqui estamos copiando a lista para um variavel tasks, e esse readonly é para garantir
  //que a lista de tarefas não seja modificada diretamente, ou seja,
  //ela só pode ser modificada através dos métodos do serviço, como addTask, updateTask e deleteTask e não
  //assim exemplo tasks.push(newTask) ou tasks[0].status = 'completed' que seria uma modificação direta da lista de tarefas, o que não é permitido.
  readonly tasks = this._tasks.asReadonly();

  //========================== total de tarefas ===========================
  readonly totalTasks = computed(() => this._tasks().length);

  //========================== tarefas completas ==========================
  readonly completedTasks = computed(
    //função anonima que ia retorna this._tasks() que é a lista de tarefas,
    //e depois filtra essa lista para contar quantas tarefas tem o status 'completed' e retorna o tamanho dessa lista filtrada.
    //e dentro do filter tem uma outra arrow function que recebe cada tarefa como argumento e verifica se o status da tarefa é igual a 'completed'.
    () => this._tasks().filter((task) => task.status === 'completed').length,
  );

  //========================== tarefas pendentes ==========================
  readonly pendingtasks = computed(
    //função anonima que ia retorna this._tasks() que é a lista de tarefas,
    //e depois filtra essa lista para contar quantas tarefas tem o status 'pending' e retorna o tamanho dessa lista filtrada.
    //e dentro do filter tem uma outra arrow function que recebe cada tarefa como argumento e verifica se o status da tarefa é igual a 'pending'.
    () => this._tasks().filter((task) => task.status === 'pending').length,
  );

  //========================== tarefas em progresso ==========================
  readonly inProgressTasks = computed(
    () => this._tasks().filter((task) => task.status === 'in-progress').length,
  );

  //======================SIMULAÇÃO DE INCREMENTO DE ID PARA enquanto não tem back===================
  private nextId = 4;

  //CRUD de tarefas

  //============ ADD TASK =============

  //essa nova task é criada da seguinte forma:

  //1. Primeiro dentro do meetodo update colocamos uma arrow function que receber o valor atual da lista como argumento
  //2. Depois usamos o operador spread ... para criar uma nova lista que contém todos os elementos da lista atual, ou seja, ...tasks
  //3. Depois do ...task colocamos a virgula oque vem depois da virgula é oque vai entrar de novo da lista

  //Exemplo de uso

  //this._tasks.update((tasks) => [
  //  ...tasks, // Copia os elementos atuais da lista
  //  { id: this.nextId++, title: 'Nova Tarefa', description: 'Descrição da nova tarefa', status: 'pending', createdAt: new Date() }, // Adiciona a nova tarefa
  //]);

  addTask(taskData: CreateTaskDTO): void {
    this._tasks.update((tasks) => [
      ...tasks,

      {
        id: this.nextId++,
        title: taskData.title,
        description: taskData.description,
        status: 'pending',
        createdAt: new Date(),
      },
    ]);
  }

  //============ UPDATE TASK =============

  updateTask(taskId: number, taskDataUpdate: UpdateTaskDTO): void {
    this._tasks.update((task) =>
      //Fazemos uma map pois ele vaoi nos retona uma nova lista de tarefa ja atualizada com oque veio do taskDataUpdate
      //Dentro do map temos uma arrow function que recebe cada tarefa como argumento e verifica se o id da tarefa é igual
      //ao id da tarefa que queremos atualizar, ou seja, task.id === taskId
      //se a condição for verdadeira,retornamos um novo objeto que é uma cópia da tarefa atual usando o operador spread
      //...task e depois sobrescreve as propriedades com os valores do taskDataUpdate usando o operador spread ...taskDataUpdate
      //caso seja falso retorna a tarefa original sem modificações, ou seja, task
      task.map((task) => (task.id === taskId ? { ...task, ...taskDataUpdate } : task)),
    );
  }

  //============ DELETE TASK =============

  deleteTask(taskId: number): void {
    this._tasks.update((tasks) =>
      //Fazemos um filter para criar uma nova lista de tarefas que não contenha a tarefa com o id igual ao taskId que queremos deletar
      //Dentro do filter temos uma arrow function que recebe cada tarefa como argumento e verifica se o id da tarefa é diferente do id da tarefa que queremos deletar, ou seja, task.id !== taskId
      //se a condição for verdadeira, ou seja, se o id da tarefa for diferente do id da tarefa que queremos deletar, a tarefa é mantida na nova lista, caso contrário, ela é removida.
      tasks.filter((task) => task.id !== taskId),
    );
  }
}
