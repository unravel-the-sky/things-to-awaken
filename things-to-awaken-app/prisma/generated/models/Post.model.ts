import { IsString, IsDefined, IsBoolean } from "class-validator";
import "./";

export class Post {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    url!: string;

    @IsDefined()
    @IsString()
    description!: string;

    @IsDefined()
    @IsString()
    source!: string;

    @IsDefined()
    @IsBoolean()
    isSent!: boolean;
}
