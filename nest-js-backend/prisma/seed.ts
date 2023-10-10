import { PrismaClient } from "@prisma/client";
import * as argon from "argon2"
import { Role } from "../src/auth/enums";

async function main() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });

    try {

        await prisma.$transaction([
            prisma.transport.deleteMany(),
            prisma.booking.deleteMany(),
            prisma.user.deleteMany()
        ]);

        await prisma.user.create({
            data: {
                email: "admin@gmail.com",
                passwordHash: await argon.hash("123456"),
                role: Role.ADMIN,
                firstName: "Admin",
                lastName: "Admin"
            }
        })

        console.log("Seeded")
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();