import { SocketMessageType } from "../enums/socket-message-type.enum";

/** Incoming request from web socket  */
export interface WebSocketMessageRequestDto {
  messageType: SocketMessageType,
}
/** Returning response to web socket  */
export interface WebSocketResponseDto extends WebSocketMessageRequestDto {
  timeStamp: Date | string;
}
