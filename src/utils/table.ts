export function generateColumns(data) {
    // Get keys from the first data object  
    const keys = Object.keys(data[0]);
    // Map keys to array of objects with required structure
    const arrayOfObjects: User[] = keys.map(key => ({
        id: key,
        accessorFn: row => `${row[key]}`, // Accessor function to get value by key
        header: () => <span>{splitCamelCaseAndCapitalize(key)}</span>, // Header cell
        cell: (info) => <span>{formatCell(key, info.getValue(), info)}</span>, // Data cell
    }));

    return arrayOfObjects;
}