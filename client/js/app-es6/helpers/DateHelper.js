export class DateHelper {

    construct() {
        // avoiding the instatiation of this class. 
        throw new Error('This class can not be instantiated!')
    }

    // like java, static reserved word gives the class method status to any method where this word is applied
    static textToDate(text) {

        // fail fast
        // regular expressions always wrapped between two backslash /content/
        // \d refers to digits only and {x} x for the number of characters
        // \D refers to anything that is not a digit
        if(!/\d{4}-\d{2}-\d{2}/.test(text)) throw new Error('Date must be in format yyyy-mm-dd')

        // ... spread operator for desconstructing an array spreading its elements
        // a more complicate way of converting a String into Date
        return new Date(... text.split('-').map((v, i) => v - i % 2))
    }

    static dateToText(date) {
        // string template interpolation ....
        // ` two back stick character wrapping the content and variables into ${} structure
        // useful if you want to break the content into multiple lines
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

}