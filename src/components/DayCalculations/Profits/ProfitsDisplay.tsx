type ProfitsDisplayProps = {
    profits: number;
    costs: number;
};

const ProfitsDisplay: React.FC<ProfitsDisplayProps> = ({ profits, costs }) => {
    return (
        <div className="text-center space-y-2 font-pt-serif">
            <h2 className="text-green-600 text-xl font-bold">Gold From Selling Everything: {profits}</h2>
            <h2 className="text-red-600 text-xl font-bold">Gold Needed To Rebuy Seeds: {costs}</h2>
            <h2 className={`text-xl font-bold ${profits - costs > 0 ? 'text-green-600' : 'text-red-600'}`}>Total: {profits - costs}</h2>
        </div>
    );
  
    
};


export default ProfitsDisplay