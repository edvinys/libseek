export default class mappers
{
    private constructor(){}

    /**
     * Converts a TypeScript date to a C# DateOnly parsable string. Returns null if received null.
     * @param typeScriptDate The TypeScript date to convert.
     */

    static dateFromTypeScriptToCSharp(typeScriptDate : Date | null) : string | null
    {
        if (typeScriptDate == null)
            return null;

        // PROBLEM: TypeScript Date looks like this: 2024-2-5
        //          C# DateOnly looks like this: 2024-02-05

        const monthIsOneDigit: boolean = typeScriptDate.getMonth() + 1 < 10;
        const dayIsOneDigit : boolean = typeScriptDate.getDay() < 10;

        if (monthIsOneDigit && dayIsOneDigit)
        {
            return typeScriptDate.getFullYear() + "-" + "0" +
                (typeScriptDate.getMonth() + 1) + "-" + "0" +
                typeScriptDate.getDate();
        }

        else if (monthIsOneDigit)
        {
            return typeScriptDate.getFullYear() + "-" + "0" +
                (typeScriptDate.getMonth() + 1) + "-" +
                typeScriptDate.getDate();
        }

        else if (dayIsOneDigit)
        {
            return typeScriptDate.getFullYear() + "-"  +
                (typeScriptDate.getMonth() + 1) + "-" + "0" +
                typeScriptDate.getDate();
        }

        return "";
    }
}