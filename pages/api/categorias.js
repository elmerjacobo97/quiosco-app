import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
    const prisma = new PrismaClient();

    const categorias = await prisma.categoria.findMany({
        // Que me incluya los productos que pertenecen a cada categoría
        include: {
            productos: true,
        },
    });

    res.status(200).json(categorias);
}
