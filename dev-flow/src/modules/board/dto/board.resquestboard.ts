import { IsNotEmpty, IsString } from "class-validator";

export class RequestBoard {
    @IsString()
    @IsNotEmpty()
    name: string;
}

