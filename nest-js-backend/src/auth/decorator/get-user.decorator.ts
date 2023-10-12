import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request & { user: User, } = ctx.switchToHttp().getRequest();

        if (data) {
            return request.user[data];
        }
        return request.user;
    },
);

export const GetUserId = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request & { user: User, } = ctx.switchToHttp().getRequest();

        if (data) {
            return request.user[data];
        }
        return request.user.id;
    },
);