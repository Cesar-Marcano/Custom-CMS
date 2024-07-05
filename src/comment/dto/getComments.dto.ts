import { IsInt, Max, Min } from 'class-validator';

export class GetCommentsDto {
  @IsInt()
  @Min(0)
  page: number;

  @IsInt()
  @Min(1)
  @Max(50)
  limit: number;
}
