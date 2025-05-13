import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Registrar nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado' })
    @Post('register')
    register(@Body() dto: AuthCredentialsDto) {
        return this.authService.register(dto);
    }

    @ApiOperation({ summary: 'Login de usuario' })
    @ApiResponse({ status: 200, description: 'Token JWT' })
    @Post('login')
    login(@Body() dto: AuthCredentialsDto) {
        return this.authService.login(dto);
    }
}