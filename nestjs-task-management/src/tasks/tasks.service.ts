import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    deleteTaskById(id: string): Task {
        const deletedTask: Task = this.tasks.find((task) => task.id === id)

        this.tasks.splice(this.tasks.indexOf(deletedTask), 1);
        
        return deletedTask;
    }
}
