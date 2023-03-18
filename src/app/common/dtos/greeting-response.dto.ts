import { BaseResponseDto } from "./base-response.dto";

/** Holds greeting data, takes inheritance from BaseResponseDto  */
export interface GreetingResponseDto extends BaseResponseDto {
  /** User based welcome message  */
  data: string;
}
