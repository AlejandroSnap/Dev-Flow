import { IsNotEmpty, IsString } from "class-validator";

export class RequestBoard {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class RequestID {
    @IsString()
    @IsNotEmpty()
    Id: string;
}

