import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: AuthCredentialsDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { email: dto.email, hash },
        });
        return { id: user.id, email: user.email };
    }

    async login(dto: AuthCredentialsDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || !(await bcrypt.compare(dto.password, user.hash))) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const payload = { sub: user.id, email: user.email };
        return { accessToken: this.jwtService.sign(payload) };
    }
}