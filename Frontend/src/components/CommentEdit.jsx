import { useState } from "react";

function CommentEdit({ initialText, onSave, onCancel }) {
    const [text, setText] = useState(initialText);

    return (
        <div className="flex gap-2">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-3 py-1 bg-zinc-800 rounded"
            />
            <button
                onClick={() => onSave(text)}
                className="px-3 bg-blue-600 rounded"
            >
                Save
            </button>
            <button
                onClick={onCancel}
                className="px-3 bg-zinc-600 rounded"
            >
                Cancel
            </button>
        </div>
    );
}

export default CommentEdit;
