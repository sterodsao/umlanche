import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { PrismaPratoRepository } from './prisma/repositories/prisma-prato-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PratoRepository,
      useClass: PrismaPratoRepository,
    },
  ],
  exports: [PrismaService, PratoRepository],
})
export class DatabaseModule {}
