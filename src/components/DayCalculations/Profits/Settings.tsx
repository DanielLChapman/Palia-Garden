type SettingsProps = {
    useStarSeeds: boolean;
    setUseStarSeeds: React.Dispatch<React.SetStateAction<boolean>>;
    reinvestSeeds: boolean;
    setReinvestSeeds: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfitSettings: React.FC<SettingsProps> = ({ useStarSeeds, setUseStarSeeds, reinvestSeeds, setReinvestSeeds }) => {
    return (
        <div className="flex justify-center space-x-6 items-center">
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    className="form-checkbox bg-blue-500 border-none rounded-md text-white h-5 w-5"
                    checked={useStarSeeds}
                    onChange={() => setUseStarSeeds((prev) => !prev)}
                />
                <span>Use Starred Seeds</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    className="form-checkbox bg-blue-500 border-none rounded-md text-white h-5 w-5"
                    checked={reinvestSeeds}
                    onChange={() => setReinvestSeeds((prev) => !prev)}
                />
                <span>Reinvest in Seeds</span>
            </label>
        </div>
    );
    
};

export default ProfitSettings