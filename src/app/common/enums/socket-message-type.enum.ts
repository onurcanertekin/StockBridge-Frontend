
/** Incoming request's types  */
export enum SocketMessageType {
  /** Just to check if connection is there  */
  Ping = 0,

  /** Force current user to log out  */
  LogOff = 1
}
