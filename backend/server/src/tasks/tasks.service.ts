import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) { }

    async createTask(userId: number, dto: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                status: dto.status,
                dueDate: new Date(dto.dueDate),
                userId,
            },
        });
    }

    async getTasks(userId: number) {
        return this.prisma.task.findMany({
            where: { userId },
            orderBy: { dueDate: 'asc' },
        });
    }

    async getTaskById(userId: number, id: number) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) throw new NotFoundException('Tarea no encontrada');
        if (task.userId !== userId) throw new ForbiddenException();
        return task;
    }

    async updateTask(userId: number, id: number, dto: UpdateTaskDto) {
        await this.getTaskById(userId, id);
        return this.prisma.task.update({
            where: { id },
            data: {
                ...(dto.title !== undefined && { title: dto.title }),
                ...(dto.description !== undefined && { description: dto.description }),
                ...(dto.status !== undefined && { status: dto.status }),
                ...(dto.dueDate !== undefined && { dueDate: new Date(dto.dueDate) }),
            },
        });
    }

    async deleteTask(userId: number, id: number) {
        await this.getTaskById(userId, id);
        return this.prisma.task.delete({ where: { id } });
    }
}