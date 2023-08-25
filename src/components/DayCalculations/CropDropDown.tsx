import React from "react";
import { CropStates } from "./DayContainer";
import { CrafterObjects } from "./PreservationContainer";
import { CropList, CropTyping } from "@/data/crops";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLeaf} from '@fortawesome/free-solid-svg-icons'

type CropDropDownProps = {
    leftOverCrops: CropStates;
    type: CrafterObjects;
    handleSelect: (id: string, type: string, starred: 'starred' | 'regular') => void
    id: string;
    selectedCropName: string | null,
    selectedCropType: 'starred' | 'regular'
};

const CropDropDown: React.FC<CropDropDownProps> = ({ leftOverCrops, type, handleSelect, id, selectedCropName, selectedCropType }) => {
    const getOptionsForCropType = () => {
        switch (type) {
            case "Loom":
                return ["Cotton"];
            case "Preservation Jar":
                return [
                    "Onion",
                    "Carrot",
                    "Apple",
                    "Tomato",
                    "Potato",
                    "Blueberry",
                ];
            case "Seed Crafter":
                return [
                    "Onion",
                    "Carrot",
                    "Apple",
                    "Tomato",
                    "Potato",
                    "Blueberry",
                    "Wheat",
                    "Rice",
                    "Cotton",
                ];
            default:
                return [];
        }
    };

    const validCrops = getOptionsForCropType();

    const shouldDisplayCrop = (
        crop: string,
        cropTyping: "regular" | "starred"
    ) => {
        const cropData = leftOverCrops[crop];
        // Check if the crop is the currently selected crop for the crafter
        const isSelectedCrop = crop === selectedCropName && cropTyping === selectedCropType;
        return cropData && (cropData[cropTyping].count > 0 || isSelectedCrop);
    };
    

    const handleDropDownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let t = e.target.value.split('-');
        if (t[1] === 'starred' || t[1] === 'regular') {
            //@ts-ignore
            handleSelect(id, t[0], t[1]);
        }
        
    }
    
        


    return (
        <select
            disabled={validCrops.every(
                (crop) =>
                    !shouldDisplayCrop(crop, "regular") &&
                    !shouldDisplayCrop(crop, "starred")
            )}
            onChange={handleDropDownChange}
            className="bg-transparent text-white px-2 w-28"
        >
            <option
                            key={`$null-regular`}
                            value={`null-regular`}
                            
                        >
                            
                    </option>
            {validCrops.map((crop) => (
                <>
                    
                    {shouldDisplayCrop(crop, "regular") && (
                        <option
                            key={`${crop}-regular`}
                            value={`${crop}-regular`}
                            className="space-x-5"
                        >
                            {crop} 
                        </option>
                    )}
                    {
                        shouldDisplayCrop(crop, 'starred') && (
                            <option  className="space-x-5" key={`${crop}-starred`} value={`${crop}-starred`}>
                                {crop} <span className="pl-5">&#xf005;</span>
                            </option>
                        )
                    }
                </>
            ))}
        </select>
    );
};

export default CropDropDown;
