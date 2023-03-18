import { ApiStatus } from "../enums/api-status.enum";

export interface BaseResponseDto {
  error: string | null;
  status: ApiStatus;
}
