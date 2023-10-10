import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'nest-access-control';
import { ROLES_KEY } from '../decorator/get-role.decorator';
import { User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }


        const { user } = context.switchToHttp().getRequest<Request & { user: User, }>();


        if (requiredRoles.includes(user.role as Role)) {
            return requiredRoles.includes(user.role as Role)
        } else {
            throw new ForbiddenException("You don't have permission to access this resource")
        }

    }
}