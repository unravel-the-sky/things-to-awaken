import { IsString, IsDefined, IsDate } from "class-validator";
import "./";

export class VerificationToken {
    @IsDefined()
    @IsString()
    identifier!: string;

    @IsDefined()
    @IsString()
    token!: string;

    @IsDefined()
    @IsDate()
    expires!: Date;
}
