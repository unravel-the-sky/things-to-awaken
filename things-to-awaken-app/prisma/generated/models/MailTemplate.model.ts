import { IsString, IsDefined, IsDate } from "class-validator";
import "./";

export class MailTemplate {
    @IsDefined()
    @IsString()
    id!: string;

    @IsDefined()
    @IsString()
    template!: string;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    @IsString()
    udpatedBy!: string;
}
