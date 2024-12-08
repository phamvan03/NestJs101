import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional } from 'class-validator';

export abstract class PagingParameters {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  public lastEvaluatedKey: object | null;
  @ApiProperty({ required: true })
  @IsNumber()
  public pageSize: number;

  constructor(pageSize: number, lastEvaluatedKey: object | null) {
    this.pageSize = pageSize;
    this.lastEvaluatedKey = lastEvaluatedKey;
  }
}
