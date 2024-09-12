import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type ToggleInputProps = {
    code: string;
    type: string;
};

const ToggleInput: React.FC<ToggleInputProps> = ({ code, type }) => {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className={`d-flex gap-2 w-100 ${type}-input`}>
            <input
                title={type}
                className="w-75"
                type="text"
                value={show ? code : "*******************"}
                readOnly
            />
            <button title={`Show ${type}`} onClick={toggleShow} className="btn btn-small">
                <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </button>
            <button title={`Copy ${type}`} onClick={copyToClipboard} className="btn btn-small">
                <FontAwesomeIcon icon={faCopy} />
            </button>
        </div>
    );
};

export default ToggleInput;