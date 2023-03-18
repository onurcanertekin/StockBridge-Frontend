import { BaseResponseDto } from "./base-response.dto";

export interface LoginResponseDto extends BaseResponseDto {
  data: LoginResponseDatumDto;
}
export interface LoginResponseDatumDto {
  token: string;
  userGroup: number;
}
