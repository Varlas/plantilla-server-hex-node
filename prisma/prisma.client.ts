import { PrismaClient } from '@prisma/client';

/**
 * Cliente singleton de Prisma
 * Asegura que solo haya una instancia de PrismaClient en toda la aplicación
 */
class PrismaClientSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      });
    }
    return PrismaClientSingleton.instance;
  }

  static async disconnect(): Promise<void> {
    if (PrismaClientSingleton.instance) {
      await PrismaClientSingleton.instance.$disconnect();
    }
  }
}

export const prisma = PrismaClientSingleton.getInstance();
export const disconnectPrisma = PrismaClientSingleton.disconnect;