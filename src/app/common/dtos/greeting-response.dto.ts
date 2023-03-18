import { BaseResponseDto } from "./base-response.dto";

export interface GreetingResponseDto extends BaseResponseDto {
  data: string;
}
