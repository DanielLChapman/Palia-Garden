type SettingsProps = {
    useStarSeeds: boolean;
    setUseStarSeeds: React.Dispatch<React.SetStateAction<boolean>>;
    reinvestSeeds: boolean;
    setReinvestSeeds: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfitSettings: React.FC<SettingsProps> = ({ useStarSeeds, setUseStarSeeds, reinvestSeeds, setReinvestSeeds }) => {
    return (
        <fieldset>
            <legend>Settings</legend>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={useStarSeeds}
                        onChange={() => setUseStarSeeds((prev) => !prev)}
                    />
                    Use Starred Seeds
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={reinvestSeeds}
                        onChange={() => setReinvestSeeds((prev) => !prev)}
                    />
                    Reinvest in Seeds
                </label>
            </div>
        </fieldset>
    );
};

export default ProfitSettings