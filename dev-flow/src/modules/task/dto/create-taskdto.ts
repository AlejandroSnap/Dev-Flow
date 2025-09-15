import { IsString} from 'class-validator';

export class taskCreate {

    @IsString()
    name: string;

    @IsString()
    description: string;
}