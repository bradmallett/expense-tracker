'use client';

import { useEffect, useState } from "react";
import { PlusCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import addSpendingTags from "../lib/actions/addSpendingTags";


export default function AddTagsExistingTransForm({ spendingTagNames, transactionID, selectedMonth, transactionTags }) {
    const [selectedSpendingTags, setSelectedSpendingTags] = useState([]);
    const [newSelectedTagName, setNewSelectedTagName] = useState('');
    const [existingSelectedTagName, setExistingSelectedTagName] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);

    // CLOSE DROPDOWN WITH CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(showTagOptions && !event.target.closest(".options")) {
                setShowTagOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [showTagOptions])


    // adding EXISTING tag to MAIN STATE LIST
    useEffect(() => {
        if(existingSelectedTagName) {
            const tagHasAlreadyBeenSelected = selectedSpendingTags.some(tag => tag.tagName === existingSelectedTagName.tagName);
            const tagAlreadyInTransaction = transactionTags.some(tag => tag.tag_name === existingSelectedTagName.tagName);

            if(!tagHasAlreadyBeenSelected && !tagAlreadyInTransaction) {
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
        const tagAlreadyInTransaction = transactionTags.some(tag => tag.tag_name === selectedTag.tagName);

        if(!tagHasAlreadyBeenSelected && !tagAlreadyInTransaction) {
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
        <div className="m-2 mt-5 text-slate-500">
            <p className="text-xs">SELECT TAG</p>
            <button
                className="mb-3 p-2 bg-slate-950 border border-slate-500 flex text-slate-400 hover:border-orange-600 group"
                name="spendingTag"
                id="spendingTag"
                onClick={() => setShowTagOptions(!showTagOptions)}
            >
                ADD EXISTING TAG...<ChevronDownIcon className="size-5 ml-1 group-hover:text-orange-600"/>
            </button>

            {showTagOptions &&
                <ul className="options bg-slate-950 text-slate-400 fixed p-1 flex flex-col border-t-2 border-orange-600 max-h-48 overflow-auto sm:max-h-[400px]">
                    {spendingTagNames.map((tagName) => (
                        <button
                            className="p-1 hover:bg-orange-600 hover:text-slate-900"
                            key={tagName.id}
                            onClick={() => {
                                setExistingSelectedTagName({
                                        tagName: tagName.name,
                                        tagID: tagName.id
                                    })
                                setShowTagOptions(false);
                                }}
                        >
                                {tagName.name}
                        </button>
                    ))}
                </ul>
            }

            <p>---or---</p>

            <div className="mt-3">
                <p className="text-xs">ENTER NEW TAG</p>
                <div className="flex align-middle group">
                    <input 
                        className="p-2 border border-slate-500 bg-slate-950 text-slate-400 hover:border-orange-600"
                        type="text"
                        placeholder="Enter Tag..."
                        value={newSelectedTagName}
                        onChange={(e) => setNewSelectedTagName(e.target.value)}
                    />
                    
                    <PlusCircleIcon
                        className="size-8 ml-1 self-center cursor-pointer hover:text-orange-600 group-hover:text-orange-600"
                        onClick={handleAddNewSelectedTag}
                    />
                </div>
            </div>

            {selectedSpendingTags.length > 0 && 
                <div className="mt-5 pt-2 border-t-2 border-orange-600">
                    <button
                        onClick={() => setSelectedSpendingTags([])}
                        className="p-1 border-2 border-orange-600 text-orange-600 font-bold hover:text-slate-900 hover:bg-orange-600"
                    >
                        CLEAR
                    </button>
                    <div className="mb-5 mt-3 text-orange-600 font-bold flex flex-wrap">
                        {selectedSpendingTags.map(tag => (
                            <p 
                                key={tag.tagName}
                                className="pr-2 mr-1 border-orange-600"
                            >
                                {tag.tagName}
                            </p>
                        ))}
                    </div>
                    <button 
                        // onClick={handleAddTagsToTransaction}
                        className="w-full p-2 border-2 text-base border-orange-600 bg-orange-600 text-slate-900 font-bold hover:text-slate-700"
                    >
                        ADD TAGS TO TRANSACTION
                    </button>
                </div>
            }
        </div>
    )
}