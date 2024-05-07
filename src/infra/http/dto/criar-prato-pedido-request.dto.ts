import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CriarPratoPedidoRequestDto {
  @IsNotEmpty()
  @IsNumber(undefined, { message: '{pratoId} precisa ser um número' })
  pratoId: number

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(100)
  emailResponsavel: string
}
