type ProfitsDisplayProps = {
    profits: number;
    costs: number;
};

const ProfitsDisplay: React.FC<ProfitsDisplayProps> = ({ profits, costs }) => {
    return (
        <div>
            <h2>Gold From Selling Everything: {profits}</h2>
            <h2>Gold Needed To Rebuy Seeds: {costs}</h2>
            <h2>Total: {profits - costs}</h2>
        </div>
    );
};


export default ProfitsDisplay