import { ApiProperty } from "@nestjs/swagger";

// src/user/user-message.model.ts
export class UserMessage {
  @ApiProperty({ description: 'User Id' })
  id: string;
}

