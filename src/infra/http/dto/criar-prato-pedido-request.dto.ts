import { IsNotEmpty, IsNumber } from 'class-validator'

export class CriarPratoPedidoRequestDto {
  @IsNotEmpty()
  @IsNumber(undefined, { message: '{pratoId} precisa ser um número' })
  pratoId: number
}
