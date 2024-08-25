import { IsString, IsDefined, IsDate } from "class-validator";
import { User } from "./";

export class Session {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    sessionToken!: string;

    @IsDefined()
    @IsString()
    userId!: string;

    @IsDefined()
    @IsDate()
    expires!: Date;

    @IsDefined()
    user!: User;
}
