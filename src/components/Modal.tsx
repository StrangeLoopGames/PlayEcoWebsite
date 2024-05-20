export function Modal(props: { type: string | null, message: string | null, data: any}) {
    const { type, message, data } = props;
    return (
        <div id="loading-modal" className={`modal modal-${type}`}>
        <div className="modal-content p-3">
        {
            type === "Loading" ? (
                <div className="spinner-border text-primary" role="status">
                </div>
            ) : null
        }
            <div className="pt-3" role="status">
                <span className="">
                    {message}
                </span>
            </div>
        </div>
    </div>
    );
}