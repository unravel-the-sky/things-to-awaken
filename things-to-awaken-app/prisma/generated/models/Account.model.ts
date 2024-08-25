import { IsString, IsDefined, IsOptional, IsInt } from "class-validator";
import { User } from "./";

export class Account {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    userId!: string;

    @IsDefined()
    @IsString()
    type!: string;

    @IsDefined()
    @IsString()
    provider!: string;

    @IsDefined()
    @IsString()
    providerAccountId!: string;

    @IsOptional()
    @IsString()
    refresh_token?: string;

    @IsOptional()
    @IsString()
    access_token?: string;

    @IsOptional()
    @IsInt()
    expires_at?: number;

    @IsOptional()
    @IsString()
    token_type?: string;

    @IsOptional()
    @IsString()
    scope?: string;

    @IsOptional()
    @IsString()
    id_token?: string;

    @IsOptional()
    @IsString()
    session_state?: string;

    @IsDefined()
    user!: User;
}
