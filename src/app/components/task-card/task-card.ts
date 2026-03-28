import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskStatus } from '../../models/task.model';
import { StatusLabelPipe } from '../../pipes/status-label.pipe';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, StatusLabelPipe],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;

  @Output() statusChanged = new EventEmitter<{ id: number; status: TaskStatus }>();

  @Output() deleted = new EventEmitter<number>();

  readonly statusOptions: TaskStatus[] = ['pending', 'in-progress', 'completed'];

  //Usando o EventEmitter que criamos logo acima o statusChanged, para emitir um evento usando o statusChanged.emit(),
  //passando um objeto com o id da tarefa e o novo status selecionado, que é obtido a partir do elemento select do evento.

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;

    this.statusChanged.emit({ id: this.task.id, status: selectElement.value as TaskStatus });
  }

  onDelete(): void {
    this.deleted.emit(this.task.id);
  }
}
