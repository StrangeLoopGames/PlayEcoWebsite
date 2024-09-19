import { components as types } from '../types/api';
type User = types["schemas"]["StrangeUser"];
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
type InputType<T> = {
    [K in keyof T]: T[K] extends string
      ? { type: 'text'; value: string }
      : T[K] extends number
      ? { type: 'number'; value: number }
      : T[K] extends boolean
      ? { type: 'checkbox'; checked: boolean }
      : T[K] extends Array<any>
      ? { type: 'table'; value: T[K] }
      : { type: 'text'; value: any }; // default case
  };
type UserInputTypes = InputType<User>;
export function generateInputTypes<T>(): InputType<T> {
    return {} as InputType<T>;
}
