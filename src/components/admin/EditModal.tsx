import { useEffect, useState } from 'react';
import { components as types } from '../../types/api'
import { UserInput } from '../../utils/table';
import CorsTable from '../CorsTable';
import { splitCamelCaseAndCapitalize } from '../../utils/stringUtils';
type User = types["schemas"]["StrangeUser"];
const typeToInputTypeMap: { [key: string]: string } = {
    string: "text",
    number: "number",
    boolean: "checkbox",
    Date: "datetime-local",
    array: "table",
};
function getInputType(key: string, user: User): string | null {
    const value = user[key as keyof User];
    if (Array.isArray(value)) {
        return typeToInputTypeMap["array"];
    }
    const type = typeof value;
    return typeToInputTypeMap[type] || null;
}
export function EditModal(props: { type: string | null, message: string | null, data: { cell: string, user: User, }, toggleModalEvent: boolean, updateUserEvent: (updatedUser: User, property: string) => void }) {
    const { type, data, toggleModalEvent } = props;
    const selectedKey: string = data.cell;
    const user: User = data.user;
    const [updatedUser, setUpdatedUser] = useState<User | null>(null);

    useEffect(() => {
        if (user && updatedUser == null) {
            setUpdatedUser(user);
        }
    }, [user, updatedUser]);

    function toggleModal() {
        toggleModalEvent(false);
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser((prevInputValue) => ({
            ...prevInputValue,
            [name]: value,
        }));
    };
    const inputType = getInputType(selectedKey, user);

    return (
        <div id="loading-modal" className={`modal modal-${type}`}>
            <div className="modal-content p-3">
                {
                    type === "user" && updatedUser != null ? (
                        <div className="modal-edit-wrap d-flex flex-column align-items-center" role="status">
                            <h3>Viewing {splitCamelCaseAndCapitalize(selectedKey)} for user {user.username}</h3>
                            {
                                inputType === "table" ? (
                                    <>
                                    {JSON.stringify(updatedUser[selectedKey])}
                                    <CorsTable users={updatedUser} selectedKey={selectedKey} toggleModalEvent={null} updateUserEvent={props.updateUserEvent} />
                                    </>
                                ) : (
                                    <div className="modal-edit-row">
                                        <p><span>Current Value:</span> {user[selectedKey]}</p>
                                        {
                                            !inputType ? (
                                                <p className="text-danger fw-bold text-center">This value cannot be changed</p>
                                            ) :
                                                inputType === "checkbox" ? (
                                                    <input onChange={handleInputChange} type="checkbox" id={selectedKey} name={selectedKey} checked={updatedUser[selectedKey]} />
                                                ) : (
                                                    <input onChange={handleInputChange} type={inputType} id={selectedKey} name={selectedKey} value={updatedUser[selectedKey]} />
                                                )
                                        }
                                    </div>
                                )
                            }
                            <div className="button-wrap">
                                <button id="save" className="" onClick={() => props.updateUserEvent(updatedUser, selectedKey)}>Save Changes</button>
                                <button id="close" className="" onClick={toggleModal}>Cancel</button>
                            </div>

                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}