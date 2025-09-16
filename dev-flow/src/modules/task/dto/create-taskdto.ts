import { IsString} from 'class-validator';

export class taskCreate {
    @IsString()
    title: string;

    @IsString()
    description: string;
}