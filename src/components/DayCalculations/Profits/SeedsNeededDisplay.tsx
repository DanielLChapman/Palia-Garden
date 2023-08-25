import { crops } from "@/data/crops";
import { initialSeedsNeededState } from "../ProfitCalc";

type SeedsNeededDisplayProps = {
    seedsNeeded: initialSeedsNeededState;
    expandSeedsNeeded: boolean;
    setExpandSeedsNeeded: React.Dispatch<React.SetStateAction<boolean>>;
};

const SeedsNeededDisplay: React.FC<SeedsNeededDisplayProps> = ({ seedsNeeded, expandSeedsNeeded, setExpandSeedsNeeded }) => {
    return (
        <div>
            <button onClick={() => setExpandSeedsNeeded((prev) => !prev)}>
                Reveal Seeds Needed with Replants (includes original planting)
            </button>
            {expandSeedsNeeded && (
                <div className="flex flex-col">
                    {Object.keys(seedsNeeded).map((seedType) => {
                        return (
                            seedsNeeded[seedType].amount > 0 && (
                                <div
                                    className="flex flex-row justify-center"
                                    key={seedType}
                                >
                                    <span className="">{seedType} seed </span>
                                    <span>
                                        #: {seedsNeeded[seedType].amount}
                                    </span>
                                    <span>
                                        Cost:{" "}
                                        {seedsNeeded[seedType].amount *
                                            (crops[seedType].seedCost || 1)}
                                    </span>
                                </div>
                            )
                        );
                    })}
                </div>
            )}
        </div>
    );
};


export default SeedsNeededDisplay