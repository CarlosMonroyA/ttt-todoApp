import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'Obtener perfil del usuario' })
    @Get('me')
    getProfile(@Req() req) {
        return this.usersService.getById(req.user.id);
    }
}