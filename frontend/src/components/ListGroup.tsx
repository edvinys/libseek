export default function ListGroup()
{
    const items : string[] = [
        'new York'
    ]
    return (
    <ul className="list-group">
        {items.map(item => <li>{item}</li>)}
    </ul>
    );
}