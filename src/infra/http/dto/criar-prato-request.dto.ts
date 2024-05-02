import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CriarPratoRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  nome: string

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  ingredientes: string

  @IsNotEmpty()
  @IsNumber(undefined, { message: '{preco} precisa ser um número' })
  preco: number
}
