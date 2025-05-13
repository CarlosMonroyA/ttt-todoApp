import { IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TaskStatus {
    PENDING = 'pendiente',
    IN_PROGRESS = 'en progreso',
    DONE = 'completada',
}

export class CreateTaskDto {
    @ApiProperty({ example: 'Comprar libros' })
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: 'Prisma y NestJS' })
    @IsOptional()
    description?: string;

    @ApiProperty({ enum: TaskStatus })
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @ApiProperty({ example: '2025-05-20T12:00:00.000Z' })
    @IsDateString()
    dueDate: string;
}