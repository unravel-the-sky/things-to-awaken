import { IsString, IsDefined, IsOptional, IsDate } from "class-validator";
import "./";

export class Subscriber {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsDate()
    emailVerified?: Date;
}
