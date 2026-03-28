import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../models/task.model';

// Pipe para converter o status da tarefa em um rótulo legível em português

// Usamos o decorator @Pipe para definir o nome do pipe como 'statusLabel' e torná-lo standalone, ou seja,
//  ele pode ser usado em qualquer componente sem precisar ser declarado em um módulo específico.

// O pipe implementa a interface PipeTransform, que exige a implementação do método transform.

@Pipe({ name: 'statusLabel', standalone: true })
export class StatusLabelPipe implements PipeTransform {
  // esse metodo implementado tem que ser do tipo TaskStatus, ou seja, tem que ser 'pending', 'in-progress' ou 'completed'
  // e função tem que retornar uma string, que é o rótulo correspondente ao status em português.
  transform(status: TaskStatus): string {
    // Aqui estamos usando um objeto do tipo Record, ele faz a associação entre os valores do tipo TaskStatus e as strings
    // correspondentes em português.

    //Exemplo de uso do Record:

    // type TaskStatus = 'pending' | 'in-progress' | 'completed'; , vão virar  taskStatus = 'Pendente' | 'Em Progresso' | 'Concluída';

    const labels: Record<TaskStatus, string> = {
      pending: 'Pendente',
      'in-progress': 'Em Progresso',
      completed: 'Concluída',
    };

    //caso ele receba um status que não esteja definido no objeto labels, ele vai retornar o próprio status, ou seja,
    //'pending', 'in-progress' ou 'completed', isso é feito usando o operador de coalescência nula (??),
    // que retorna o valor à direita se o valor à esquerda for null ou undefined.
    return labels[status] ?? status;
  }
}
