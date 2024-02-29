// import { PrismaClient } from '@prisma/client'


// const client = global.prismadb || new PrismaClient()
// if (process.env.NODE_ENV !== 'production') global.prismadb = client

// export default client
import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    prisma = global.prisma || new PrismaClient();
    if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
}

export default prisma;