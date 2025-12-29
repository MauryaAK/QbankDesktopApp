import Card from "../common/Card";
import LocationRow from "./LocationRow";

const LocationsCard = () => {
    return (
        <Card
            title="Location & mapping"
            className="
        border border-blue-dark/50
        bg-gradient-to-br from-blue-light via-blue-base to-white
        rounded-xl
        shadow-sm
      "
        >
            <LocationRow
                code="DEL"
                name="Indira Gandhi Intl"
                airlines={5}
                agents={32}
            />

            <LocationRow
                code="BOM"
                name="Chhatrapati Shivaji"
                airlines={4}
                agents={21}
            />

            <LocationRow
                code="MAA"
                name="Chennai Intl"
                airlines={3}
                agents={12}
            />
        </Card>
    );
};

export default LocationsCard;
