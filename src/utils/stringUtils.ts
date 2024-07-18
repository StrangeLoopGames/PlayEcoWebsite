export function splitCamelCaseAndCapitalize(inputString: string) {
    // Split the string at each capital letter
    const words = inputString.split(/(?=[A-Z])/);

    // Capitalize each word
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    // Join the words together with a space
    return words.join(' ');
}