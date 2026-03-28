import { TaskStatus } from '../models/task.model';

export type CreateTaskDTO = {
  title: string;
  description: string;
};
export type UpdateTaskDTO = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};
