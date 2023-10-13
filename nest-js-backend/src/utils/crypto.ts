import * as crypto from 'crypto';

export function generateCustomCode(): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';

    // Generate the first 3 characters
    for (let i = 0; i < 3; i++) {
        const randomIndex = crypto.randomInt(characters.length);
        code += characters[randomIndex];
    }

    // Add a dash
    code += '-';

    // Generate the next 3 characters
    for (let i = 0; i < 3; i++) {
        const randomIndex = crypto.randomInt(characters.length);
        code += characters[randomIndex];
    }

    // Add another dash
    code += '-';

    // Generate the last 3 characters
    for (let i = 0; i < 3; i++) {
        const randomIndex = crypto.randomInt(characters.length);
        code += characters[randomIndex];
    }

    return code;
}

// Example: Generate a custom code with 9 alphanumeric characters and 2 dashes
const customCode = generateCustomCode();
