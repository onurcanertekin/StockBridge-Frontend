import { ApiStatus } from "../enums/api-status.enum";

export interface GreetingResponseDto {
  data: string;
  error: string;
  status: ApiStatus;
}
