import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PratoRepository } from '@/domain/gerenciamento/application/repositories/prato-repository'
import { PrismaPratoRepository } from './prisma/repositories/prisma-prato-repository'
import { PratoPedidoRepository } from '@/domain/gerenciamento/application/repositories/prato-pedido-repository'
import { PrismaPratoPedidoRepository } from './prisma/repositories/prisma-prato-pedido-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: PratoRepository,
      useClass: PrismaPratoRepository,
    },
    {
      provide: PratoPedidoRepository,
      useClass: PrismaPratoPedidoRepository,
    },
  ],
  exports: [PrismaService, PratoRepository, PratoPedidoRepository],
})
export class DatabaseModule {}
