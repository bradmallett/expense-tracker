'use client';

import { useEffect, useState } from "react";
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import addSpendingTags from "../lib/actions/addSpendingTags";


export default function AddTagsExistingTransForm({ spendingTagNames, transactionID, selectedMonth }) {
    const [selectedSpendingTags, setSelectedSpendingTags] = useState([]);
    const [newSelectedTagName, setNewSelectedTagName] = useState('');
    const [existingSelectedTagName, setExistingSelectedTagName] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);

    // adding EXISTING tag to MAIN STATE LIST
    useEffect(() => {
        if(existingSelectedTagName) {
            const tagHasAlreadyBeenSelected = selectedSpendingTags.some(tag => tag.tagName === existingSelectedTagName.tagName);

            if(!tagHasAlreadyBeenSelected) {
                setSelectedSpendingTags(prevTags => [...prevTags, existingSelectedTagName]);
            }

            setExistingSelectedTagName(null);
        }
    }, [existingSelectedTagName]);



    // adding NEW tag to MAIN STATE LIST
    function handleAddNewSelectedTag() {
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



    // calling SERVER ACTION with MAIN STATE
    function handleAddTagsToTransaction() {
        if(!transactionID || selectedSpendingTags.length === 0) {
            return;
        }

        addSpendingTags(selectedSpendingTags, transactionID, selectedMonth);
    }


    return (
        <div className="m-2 mt-5">
            <button
                className="mb-2 p-2 bg-slate-900 border-2 flex"
                name="spendingTag"
                id="spendingTag"
                value={existingSelectedTagName}
                onClick={() => setShowTagOptions(!showTagOptions)}
            >
                ADD EXISTING TAG...<ChevronDownIcon className="size-5 ml-1"/>
            </button>

            {showTagOptions &&
                <ul className="bg-slate-900 fixed p-1 flex flex-col">
                    {spendingTagNames.map((tagName) => (
                        <button
                            className="p-1 hover:bg-orange-600 hover:text-slate-900"
                            key={tagName.id}
                            onClick={() => setExistingSelectedTagName({
                                tagName: tagName.name,
                                tagID: tagName.id
                            })}
                        >
                                {tagName.name}
                        </button>
                    ))}
                </ul>
            }

            <p>---or---</p>


            <div className="mt-2 flex align-middle">
                <input 
                    className="p-2 border-2 bg-slate-900"
                    type="text"
                    placeholder="CREATE NEW TAG..."
                    value={newSelectedTagName}
                    onChange={(e) => setNewSelectedTagName(e.target.value)}
                />
                
                <PlusCircleIcon
                    className="size-8 self-center cursor-pointer hover:text-orange-600"
                    onClick={handleAddNewSelectedTag}
                />
            </div>


            {selectedSpendingTags.length > 0 && 
                <div className="mt-5 pt-2 border-t-2 border-orange-600">
                    <button 
                        onClick={() => setSelectedSpendingTags([])}
                        className="p-1 border-2 border-orange-600 text-orange-600 font-bold hover:text-slate-900 hover:bg-orange-600"
                    >
                        CLEAR
                    </button>
                    <div className="mb-5 text-orange-600 font-bold">
                        {selectedSpendingTags.map(tag => (
                            <p 
                                key={tag.tagName}
                                className=""
                            >
                                {tag.tagName}
                            </p>
                        ))}
                    </div>
                    <button 
                        // onClick={() => setSelectedSpendingTags([])}
                        className="w-full p-2 border-2 text-base border-orange-600 bg-orange-600 text-slate-900 font-bold hover:text-slate-700"
                    >
                        ADD TAGS TO TRANSACTION
                    </button>
                </div>
            }
        </div>
    )
}