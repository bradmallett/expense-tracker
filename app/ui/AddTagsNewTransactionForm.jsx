'use client';

import { useEffect, useState } from "react";
import { PlusCircleIcon, ChevronDownIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';


export default function AddTagsNewTransactionForm({ spendingTagNames, addSpendingTagsToTransaction }) {
    const [selectedSpendingTags, setSelectedSpendingTags] = useState([]);
    const [newSelectedTagName, setNewSelectedTagName] = useState('');
    const [existingSelectedTagName, setExistingSelectedTagName] = useState(null);
    const [showTagOptions, setShowTagOptions] = useState(false);
    const [showNewInput, setShowNewInput] = useState(false);

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
    

    

    useEffect(() => {
        addSpendingTagsToTransaction(selectedSpendingTags);
    }, [selectedSpendingTags]);





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






    return (
        <div className="mt-5 mb-5 ml-2 mr-2 p-2 text-slate-400 bg-slate-800">

            {selectedSpendingTags.length > 0 && 
                <div className="">
                    <button
                        onClick={() => setSelectedSpendingTags([])}
                        className="p-1 border-2 border-orange-600 text-orange-600 font-bold hover:text-slate-900 hover:bg-orange-600"
                    >
                        CLEAR TAGS
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
                </div>
            }


            <p>SELECT TAG</p>
            <button
                className="mb-3 p-2 font-bold bg-slate-950 border border-slate-500 flex text-slate-400 hover:border-orange-600 hover:text-orange-600 group"
                name="spendingTag"
                id="spendingTag"
                onClick={() => setShowTagOptions(!showTagOptions)}
            >
                EXISTING TAGS...<ChevronDownIcon className="size-5 ml-1 group-hover:text-orange-600"/>
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

            <div>
                {!showNewInput &&
                <div className="flex align-center">
                    <p className="font-bold">NEW TAG</p>
                    <ArrowDownCircleIcon
                        className="size-6 ml-1 cursor-pointer hover:text-orange-600 group-hover:text-orange-600"
                        onClick={() => setShowNewInput(!showNewInput)}
                    />
                </div>
                }
                {showNewInput &&
                <ArrowUpCircleIcon
                    className="size-6 cursor-pointer hover:text-orange-600 group-hover:text-orange-600"
                    onClick={() => setShowNewInput(!showNewInput)}
                />
                
                }

            </div>


            {showNewInput &&
                <div className="mt-3">
                    <p>CREATE NEW TAG</p>
                    <div className="flex align-middle group">
                        <input 
                            className="p-2 border font-bold border-slate-500 bg-slate-950 text-slate-400 hover:border-orange-600"
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
            }
        </div>
    )
}