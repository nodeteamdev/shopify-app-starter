import { UserService } from '@modules/user/user.service';
import { UserBeforeFilterHook } from '@modules/casl';
import { User } from '@prisma/client';
export declare class UserHook implements UserBeforeFilterHook<User> {
    readonly userService: UserService;
    constructor(userService: UserService);
    run(request: any): Promise<import("./entities/user.entity").UserEntity>;
}
