import {
    Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, ValidationPipe, ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @ApiOperation({ summary: 'Crear nueva tarea' })
    @Post()
    create(@Req() req, @Body(new ValidationPipe()) dto: CreateTaskDto) {
        return this.tasksService.createTask(req.user.id, dto);
    }

    @ApiOperation({ summary: 'Listar tareas del usuario' })
    @Get()
    findAll(@Req() req) {
        return this.tasksService.getTasks(req.user.id);
    }

    @ApiOperation({ summary: 'Ver detalle de una tarea' })
    @Get(':id')
    findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(req.user.id, id);
    }

    @ApiOperation({ summary: 'Actualizar tarea' })
    @Put(':id')
    update(
        @Req() req,
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) dto: UpdateTaskDto
    ) {
        return this.tasksService.updateTask(req.user.id, id, dto);
    }

    @ApiOperation({ summary: 'Eliminar tarea' })
    @Delete(':id')
    remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
        return this.tasksService.deleteTask(req.user.id, id);
    }
}