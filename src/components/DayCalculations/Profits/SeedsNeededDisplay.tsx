import { crops } from "@/data/crops";
import { initialSeedsNeededState } from "../ProfitCalc";

type SeedsNeededDisplayProps = {
    seedsNeeded: initialSeedsNeededState;
    expandSeedsNeeded: boolean;
    setExpandSeedsNeeded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SeedsNeededDisplay: React.FC<SeedsNeededDisplayProps> = ({ seedsNeeded, expandSeedsNeeded, setExpandSeedsNeeded }) => {
    return (
        <div className="flex justify-center">

        
        <div className="mt-4 font-pt-serif">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 transition duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-900" onClick={() => setExpandSeedsNeeded((prev) => !prev)}>
                Reveal Seeds Needed with Replants (includes original planting)
            </button>
            {expandSeedsNeeded && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="border-b border-gray-200 pb-2 mb-3">
                        <h3 className="font-semibold text-xl">Seeds Needed:</h3>
                    </div>
                    {Object.keys(seedsNeeded).map((seedType) => {
                        return (
                            seedsNeeded[seedType].amount > 0 && (
                                <div key={seedType} className="flex justify-between py-1 border-b border-gray-100">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-lg font-semibold">{seedType} seed</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="font-medium text-gray-600">Qty: {seedsNeeded[seedType].amount}</span>
                                        <span className="font-medium text-blue-500">Cost: {seedsNeeded[seedType].amount * (crops[seedType].seedCost || 1)}</span>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
        </div></div>
    );
    
    
    
};


export default SeedsNeededDisplay