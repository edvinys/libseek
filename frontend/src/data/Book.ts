export default class Book
{
    public id : string;
    public title : string;
    public genre : string;
    public authorName : string;
    public authorSurname : string;

    constructor(id : string, title : string, genre : string, authorSurname : string)
    {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.authorName = authorSurname;
        this.authorSurname  = authorSurname;
    }
}