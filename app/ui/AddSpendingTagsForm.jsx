'use client';

import { useEffect, useState } from "react";


export default function AddSpendingTagsForm({ spendingTagNames, addSpendingTagsToTransaction }) {
    const [showTagTextInput, setShowTagTextInput] = useState(false);
    const [selectedSpendingTags, setSelectedSpendingTags] = useState([]);

    useEffect(() => {
        if(selectedSpendingTags.length > 0) {
            addSpendingTagsToTransaction(selectedSpendingTags);
        }
    }, [selectedSpendingTags]);


    function handleUpdateSpendingTags(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const spendingTagValue = formData.get("spendingTag");
        let selectedTag = null;

        // if creating a new tag not in database
        if(spendingTagValue === 'new') {
            selectedTag = {
                tagID: null,
                tagName: formData.get('newSpendingTagName')
            }
        }

        // // if tag exists in database already
        if(spendingTagValue !== 'new' && spendingTagValue !== '') {
            selectedTag = JSON.parse(formData.get('spendingTag'));
        }

        const tagHasBeenSelected = selectedSpendingTags.some(tag => tag.tagName === selectedTag.tagName);

        if(!tagHasBeenSelected) {
            setSelectedSpendingTags(prevTags => [...prevTags, selectedTag])
        }
    }


    return (
        <div>
            <form onSubmit={handleUpdateSpendingTags}>
                <div className="input-contain">
                    <label htmlFor="spendingTag">SPENDING TAG: </label>
                    <select 
                        name="spendingTag" 
                        id="spendingTag"
                        onChange={(e) => setShowTagTextInput(e.target.value === "new")}
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
                        <input 
                            type="text"
                            name="newSpendingTagName"
                            placeholder="Enter New Tag Name"
                        />
                    )}
                </div>
                <button type="submit">ADD TAG</button>
            </form>

            {selectedSpendingTags.length > 0 && 
                <div>
                    <p>ADDED SPENDING TAGS:</p>
                    {selectedSpendingTags.map((tag) => (
                        <p key={tag.tagName}>{tag.tagName}</p>
                    ))}

                    <button onClick={() => setSelectedSpendingTags([])}>CLEAR TAGS</button>
                </div>
            }
        </div>
    )
}