export default class Book
{
    public id : string;
    public title : string;
    public genre : string;
    public authorName : string;
    public authorSurname : string;
    public authorBirthDate? : Date | null;

    constructor(id : string, title : string, genre : string, authorSurname : string, authorBirthDate : Date | null = null)
    {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.authorName = authorSurname;
        this.authorSurname  = authorSurname;
        this.authorBirthDate = authorBirthDate;
    }
}