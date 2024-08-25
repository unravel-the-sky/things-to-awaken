import { IsString, IsDefined, IsOptional, IsDate } from "class-validator";
import { Account, Session } from "./";

export class User {
    @IsDefined()
    @IsString()
    id!: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsDate()
    emailVerified?: Date;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsDefined()
    accounts!: Account[];

    @IsDefined()
    sessions!: Session[];
}
