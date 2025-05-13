import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async getById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true, email: true, createdAt: true },
        });
        if (!user) throw new NotFoundException('Usuario no encontrado');
        return user;
    }
}