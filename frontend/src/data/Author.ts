export default class Author
{
    public id : number | null;
    public name : string;
    public surname : string;
    public birthdate : Date | null;

    constructor(id: number | null = null, name : string, surname : string, birthdate : Date | null = null)
    {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
    }
}