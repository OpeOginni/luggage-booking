import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
    .grant(Role.USER)
    .readOwn('userData')
    .readOwn('bookingData')
    .updateOwn('userData')
    .createOwn('luggageData')


RBAC_POLICY.grant(Role.LUGGAGE_ATTENDANT)
    .extend(Role.ADMIN)
    .read('luggageData')
    .read('transportData')
    .read('bookingData')
    .update('bookingData')


RBAC_POLICY.grant(Role.ADMIN)
    .read('userData')
    .readAny('bookingData')
    .create('transportData')
    .update('transportData')
    .update('attendantData')
    .delete('attendantData')
    .create('attendantData')