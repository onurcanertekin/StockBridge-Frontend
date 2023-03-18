export interface LoginResponseDto {
  data: LoginResponseDatumDto;
  error: string;
  status: ApiStatus;
}
export interface LoginResponseDatumDto {
  token: string;
  userGroup: 0;
}
export enum ApiStatus {
  Ok = 0,
  Error = 1
}
