import { AuthService } from './auth.service.js';
import { AuthResponse } from './dto/auth-response.type.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { User } from '../users/models/user.model.js';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    register(input: RegisterInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    me(user: any): Promise<User>;
}
