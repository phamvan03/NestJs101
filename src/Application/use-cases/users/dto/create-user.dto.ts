import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    user_id: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}
