import { useState } from "react";

export default function useNotification(): {
    notificationVisible: boolean;
    notificationText: string;
    showNotification: (text: string, ms: number) => void; }
{
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");

    const showNotification = (text: string, ms: number): void =>
    {
        setVisible(true);
        setText(text);
        setTimeout(() => {
            setVisible(false);
        }, ms);
    };

    return {
        notificationVisible: visible,
        notificationText: text,
        showNotification
    };
}