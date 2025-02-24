'use client';

import { useEffect, useState } from "react";
import addSpendingTags from "../lib/actions/addSpendingTags";


export default function AddTagsExistingTransForm({ spendingTagNames, transactionID, selectedMonth }) {
    const [selectedSpendingTags, setSelectedSpendingTags] = useState([]);
    const [showTagTextInput, setShowTagTextInput] = useState(false);
    const [newSelectedTagName, setNewSelectedTagName] = useState('');
    const [existingSelectedTagName, setExistingSelectedTagName] = useState('');
    const [showAddTagButton, setShowAddTagButton] = useState(false);

    useEffect(() => {
        if(transactionID && selectedSpendingTags.length > 0) {
            setShowAddTagButton(true);
        }

        if(!transactionID || selectedSpendingTags.length === 0) {
            setShowAddTagButton(false);
        }
    }, [selectedSpendingTags]);


    useEffect(() => {
        if(existingSelectedTagName && existingSelectedTagName !== 'new' && existingSelectedTagName != '') {
            const tagHasAlreadyBeenSelected = selectedSpendingTags.some(tag => tag.tagName === existingSelectedTagName.tagName);

            if(!tagHasAlreadyBeenSelected) {
                setSelectedSpendingTags(prevTags => [...prevTags, existingSelectedTagName]);
            }

            setExistingSelectedTagName('');
        }
    }, [existingSelectedTagName]);


    function handleUpdateNewSpendingTagName(e) {
        e.preventDefault();

        if(newSelectedTagName === '') {
            return;
        }

        const selectedTag = {
            tagID: null,
            tagName: newSelectedTagName
        }

        const tagHasAlreadyBeenSelected = selectedSpendingTags.some(tag => tag.tagName === selectedTag.tagName);

        if(!tagHasAlreadyBeenSelected) {
            setSelectedSpendingTags(prevTags => [...prevTags, selectedTag])
        }

        setNewSelectedTagName('');
    }


    function handleAddTagsToTransaction() {
        if(!transactionID || selectedSpendingTags.length === 0) {
            return;
        }

        addSpendingTags(selectedSpendingTags, transactionID, selectedMonth);
    }


    return (
        <div className="addSpendingTagsForm">
            <form>
                <div className="input-contain">
                    <label htmlFor="spendingTag">SPENDING TAG: </label>
                    <select 
                        name="spendingTag"
                        id="spendingTag"
                        value={existingSelectedTagName}
                        onChange={(e) => {
                            if(e.target.value === "new") {
                                setShowTagTextInput(true);
                                setExistingSelectedTagName('');
                            }
                            else if(e.target.value === '') {
                                setShowTagTextInput(false);
                                setExistingSelectedTagName(''); 
                            }
                            else {
                                const selectedValue = JSON.parse(e.target.value);
                                setShowTagTextInput(false);
                                setExistingSelectedTagName(selectedValue); 
                            }        
                        }}
                    >
                        <option value="">Select a tag...</option>
                        <option value="new">+ Create New Tag...</option>
                        {spendingTagNames.map((tagName) => (
                            <option
                                key={tagName.id} 
                                value={JSON.stringify({
                                    tagID: tagName.id,
                                    tagName: tagName.name
                                })}
                            >
                                    {tagName.name}
                            </option>
                        ))}
                    </select>

                    {showTagTextInput && (
                        <div>
                            <input 
                                type="text"
                                name="newSpendingTagName"
                                placeholder="Enter New Tag Name"
                                value={newSelectedTagName}
                                onChange={(e) => setNewSelectedTagName(e.target.value)}
                            />
                            <button onClick={(e) => handleUpdateNewSpendingTagName(e)}>ADD TAG</button>
                        </div>
                    )}
                </div>
            </form>

            {selectedSpendingTags.length > 0 && 
                <div>
                    {/* CLEAR TAGS FROM FORM */}
                    <button onClick={() => setSelectedSpendingTags([])}>CLEAR</button>
                    {selectedSpendingTags.map((tag) => (
                        <p key={tag.tagName}>{tag.tagName}</p>
                    ))}
                </div>
            }

            {/* Show button if rendered from existing transaction */}
            {showAddTagButton && 
                <button className="addTagsToTransaction" onClick={handleAddTagsToTransaction}>ADD SPENDING TAGS</button>
            }
        </div>
    )
}