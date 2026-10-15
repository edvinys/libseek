import Alert from 'react-bootstrap/Alert';

type InfoAlertProps = {
    text: string;
    visible : boolean
}

/**
 * An info alert component, to make this component disappear after a set time use "../Hooks/useNotification.ts".
 * See example in "../Pages/BookRemove.tsx".
 * @param param0
 * @param param0.text The text the info alert should say.
 * @param param0.visible The visibility of the component.
 * @constructor
 */
export default function InfoAlert({text, visible} : InfoAlertProps)
{
    return (
        <Alert variant="info" show={visible} transition>
            <Alert.Heading style={{fontSize: "20px"}}>{text}</Alert.Heading>
        </Alert>
    );
}