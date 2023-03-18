/** To show notification to user with popup  */
export interface NotifyDto {
  /** To show success or warning badge  */
  isSuccess: boolean | null;

  /** Title of the notification  */
  title: string | null;

  /** Content of the notification  */
  message: string | null;
}
