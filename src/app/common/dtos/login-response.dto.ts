import { ApiStatus } from "../enums/api-status.enum";

export interface LoginResponseDto {
  data: LoginResponseDatumDto;
  error: string;
  status: ApiStatus;
}
export interface LoginResponseDatumDto {
  token: string;
  userGroup: number;
}
