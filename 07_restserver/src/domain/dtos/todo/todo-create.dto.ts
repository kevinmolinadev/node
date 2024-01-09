
export class CreateDto {
    private constructor(public title: string) { }

    static create = (object: { [key: string]: any }): [string | null, CreateDto | null] => {
        const { title } = object;
        if (title !== undefined && title.length === 0) return ["The title can't a empty.", null];
        if (!title) return ["Title property is requiered.", null];
        return [null, new CreateDto(title)];
    }
}