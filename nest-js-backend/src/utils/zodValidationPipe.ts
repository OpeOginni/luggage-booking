import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

interface ValidationParams {
    body?: ZodObject<any>,
    param?: ZodObject<any>,
    custom?: ZodObject<any>
}

export class ZodValidationPipe implements PipeTransform {
    constructor(private schemas: ValidationParams) { }

    transform(value: unknown, metadata: ArgumentMetadata) {
        // Removes the ZodValidation when the Decorator is a custom one  TOOK 3 HOURS to FIX :(

        if (metadata.type == 'custom') {
            try {

                if (!this.schemas.custom) {
                    return value
                }
                this.schemas.custom.parse(value);
            } catch (error) {

                throw new BadRequestException('Validation failed');
            }
            return value;
        }


        if (metadata.type == 'body') {
            try {

                if (!this.schemas.body) {
                    return value
                }
                this.schemas.body.parse(value);
            } catch (error) {
                throw new BadRequestException('Validation failed');
            }
            return value;
        }

        if (metadata.type == 'param') {
            try {
                if (!this.schemas.param) {
                    return value
                }
                this.schemas.param.parse(value);
            } catch (error) {
                throw new BadRequestException('Validation failed');
            }
            return value;
        }

    }
}