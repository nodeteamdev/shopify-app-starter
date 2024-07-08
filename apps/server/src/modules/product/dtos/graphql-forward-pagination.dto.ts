import { ApiProperty } from '@nestjs/swagger';
import { Cursor } from '@modules/product/types/cursor-type';

export class GraphqlForwardPaginationPageInfoDto {
  @ApiProperty({
    type: String,
    example:
      'eyJsYXN0X2lkIjo4NTIzNTM2MDQwMjE4LCJsYXN0X3ZhbHVlIjoiODUyMzUzNjA0MDIxO444',
  })
  readonly endCursor: Cursor;

  @ApiProperty({ type: Boolean, example: false })
  readonly hasNextPage: boolean;
}
