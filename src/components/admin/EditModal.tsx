import { useEffect, useState } from 'react';
import { components as types } from '../../types/api'
import { UserInput } from '../../utils/table';
import CorsTable from '../CorsTable';
type User = types["schemas"]["StrangeUser"];

// set the input types for each key in the user object so the correct input can be displayed
// false means the key should not be editable
const inputTypes = {
    steamId: "text",
    twitchId: "text",
    twitchUsername: "text",
    username: "text",
    avatarUrl: "text",
    avatarDna: "text",
    achievements: "table",
    ecoCredits: "number",
    ownsEco: "checkbox",
    verified: "checkbox",
    items: "table",
    blockPurchasing: "checkbox",
    isDeveloper: "checkbox",
    isCloudAdmin: "checkbox",
    isSlg: "checkbox",
    bannedUntil: "datetime",
    bannedReason: "textarea",
    isBanned: "checkbox",
    lastWorldId: false,
    lastWorldJoinTime: false,
    heartBeatTime: false,
    creationTime: false,
    online: false,
    timeOnlineTotal: false,
    lastEmailSent: false,
};

export function EditModal(props: { type: string | null, message: string | null, data: {cell: string, user: User, }, toggleModalEvent: boolean, updateUserEvent: (updatedUser: User) => void}) {
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
    return (
        <div id="loading-modal" className={`modal modal-${type}`}>
        <div className="modal-content p-3">
        {
            type === "user" && updatedUser != null ? (
                <div className="modal-edit-wrap d-flex flex-column align-items-center" role="status">
                    <h3>Viewing {selectedKey} for user {user.username}</h3>
                            {
                                Array.isArray(updatedUser[selectedKey]) ? (
                                    <CorsTable users={updatedUser} selectedKey={selectedKey} toggleModalEvent={null} updateUserEvent={props.updateUserEvent} />
                                ) : (
                                    <div className="modal-edit-row">
                                        <p><span>Current Value:</span> {user[selectedKey]}</p>
                                        {
                                            !inputTypes[selectedKey] ? (
                                                <p class="text-danger fw-bold text-center">This value cannot be changed</p>
                                            ) :
                                            // display the correct input type based on inputTypes
                                            inputTypes[selectedKey] === "number" ? (
                                                <input onChange={handleInputChange} type="number" id={selectedKey} name={selectedKey} value={updatedUser[selectedKey]} />
                                            ) : inputTypes[selectedKey] === "checkbox" ? (
                                                <input onChange={handleInputChange} type="checkbox" id={selectedKey} name={selectedKey} value={updatedUser[selectedKey]} />
                                            ) : inputTypes[selectedKey] === "textarea" ? (
                                                <textarea onChange={handleInputChange} id={selectedKey} name={selectedKey} value={updatedUser[selectedKey]} />
                                            ) :
                                            inputTypes[selectedKey] === "text" ? (
                                                <input onChange={handleInputChange} type="text" id={selectedKey} name={selectedKey} value={updatedUser[selectedKey]} />
                                            ) : null
                                            
                                        }
                                    </div>
                                )
                            }
                            <div className="button-wrap">
                                <button id="save" className="" onClick={() => props.updateUserEvent(updatedUser)}>Save Changes</button>
                                <button id="close" className="" onClick={toggleModal}>Cancel</button>
                            </div>
                            
                </div>
            ) : null
        }
        </div>
    </div>
    );
}