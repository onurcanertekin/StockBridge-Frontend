import { BaseResponseDto } from "./base-response.dto";

/** Holds login response data  */
export interface LoginResponseDto extends BaseResponseDto {
  /** If succesfully logged, this object will hold data  */
  data: LoginResponseDatumDto;
}

/** User based token and group data  */
export interface LoginResponseDatumDto {
  /** User token to auth  */
  token: string;

  /** User group  */
  userGroup: number;
}
