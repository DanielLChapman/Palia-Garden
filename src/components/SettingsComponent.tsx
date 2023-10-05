import { useSettings } from "./useSettings";

export const SettingsComponent: React.FC = () => {
    const {
        plantStarSeeds,
        setPlantStarSeeds,
        overTwentyFive,
        setOverTwentyFive,
        reinvestSeeds,
        setReinvestSeeds,
        useStarSeeds,
        setUseStarSeeds,
    } = useSettings();

    return (
        <div>
            {/* Render your checkboxes or input boxes here using the values and setters */}
        </div>
    );
};
