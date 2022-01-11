import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  max,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
  @IsString()
  model: string;
  @IsLatitude()
  lat: number;
  @IsLongitude()
  lng: number;
  @IsNumber()
  @Min(1990)
  year: number;
  @IsNumber()
  @Max(1000000)
  milage: number;
}
