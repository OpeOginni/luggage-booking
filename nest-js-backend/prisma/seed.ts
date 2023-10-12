import { PrismaClient, User } from "@prisma/client";
import { faker } from '@faker-js/faker';
import * as argon from "argon2"
import { Role, TransportType } from "../src/auth/enums";

const transportTypes = Object.values(TransportType);
const userRoles = Object.values(Role);

export async function createRandomUser(userRole: Role) {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        role: userRole,
        passwordHash: await argon.hash('pwned'),
    };
}

export async function createRandomTransport() {
    return {
        departure: faker.date.future(),
        transportCode: faker.string.alphanumeric(7),
        transportType: faker.helpers.arrayElement(transportTypes),
        destination: `${faker.location.city()} - ${faker.location.city()}`,
        maxBookingSlots: faker.number.int({ min: 1, max: 100 }),
    };
}

export async function main() {


    const prisma = new PrismaClient({})

    try {



        // Clean DB
        await prisma.$transaction([
            prisma.transport.deleteMany(),
            prisma.booking.deleteMany(),
            prisma.user.deleteMany()
        ]);

        console.log("DB CLEANED")

        // Create Admin
        await prisma.user.create({
            data: {
                email: "admin@gmail.com",
                passwordHash: await argon.hash("123456"),
                role: Role.ADMIN,
                firstName: "Admin",
                lastName: "Admin"
            }
        })

        // Create Luggage Attendant
        await prisma.user.create({
            data: {
                email: "Attendant@gmail.com",
                passwordHash: await argon.hash("123456"),
                role: Role.LUGGAGE_ATTENDANT,
                firstName: "Attendant",
                lastName: "Attendant"
            }
        })

        // Create Check In Personnel
        await prisma.user.create({
            data: {
                email: "Personnel@gmail.com",
                passwordHash: await argon.hash("123456"),
                role: Role.CHECK_IN_PERSONNEL,
                firstName: "Personnel",
                lastName: "Personnel"
            }
        })

        // Create Users

        for (let i = 0; i < 30; i++) {
            const userData = await createRandomUser(Role.USER);

            await prisma.user.create({
                data: userData
            })
        }

        // Create Trasports

        for (let i = 0; i < 5; i++) {
            const transportData = await createRandomTransport()

            await prisma.transport.create({
                data: transportData
            })
        }


        console.log("Seeded")

    }
    catch (e) {
        console.log(e)
    }
}
main()