import { ApiStatus } from "../enums/api-status.enum";

/** Base response interface */
export interface BaseResponseDto {
  /** If there is a error to show user */
  error: string | null;

  /** Status of response */
  status: ApiStatus;
}
