import Alert from 'react-bootstrap/Alert';
import type {Variant} from "react-bootstrap/cjs/types";

type InfoAlertProps = {
    text: string;
    visible : boolean;
    variant? : Variant;
}

/**
 * An info alert component, to make this component disappear after a set time use "../Hooks/useNotification.ts".
 * See example in "../Pages/BookRemove.tsx".
 * @param param0
 * @param param0.text The text the info alert should say.
 * @param param0.visible The visibility of the component.
 * @constructor
 */

export default function InfoAlert({text, visible, variant} : InfoAlertProps)
{
    return (
        <Alert variant={variant} show={visible} transition
               style={{width:'20%', position:"fixed", bottom:"20px", right:"20px"}} >
            <Alert.Heading style={{fontSize: "20px"}}>{text}</Alert.Heading>
        </Alert>
    );
}