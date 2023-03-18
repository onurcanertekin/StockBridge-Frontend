import { SocketMessageType } from "../enums/socket-message-type.enum";

export interface WebSocketMessageRequestDto {
  messageType: SocketMessageType,
}
export interface WebSocketResponseDto extends WebSocketMessageRequestDto {
  timeStamp: Date | string;
}
