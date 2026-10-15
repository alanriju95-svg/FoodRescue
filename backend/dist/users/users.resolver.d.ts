import { UsersService } from './users.service.js';
import { User } from './models/user.model.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    user(id: string): Promise<User>;
    updateProfile(user: any, input: UpdateProfileInput): Promise<User>;
}
