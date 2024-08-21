import React from 'react';

interface ContextMenuProps {
    x: number;
    y: number;
    show: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, show, onClose, onEdit, onDelete }) => {
    if (!show) return null;

    return (
        <div
            className="context-menu"
            style={{ top: y, left: x, position: 'absolute', zIndex: 1000 }}
            onMouseLeave={onClose}
        >
            <ul>
                <li onClick={onEdit}>Edit</li>
                <li onClick={onDelete}>Delete</li>
            </ul>
        </div>
    );
};

export default ContextMenu;