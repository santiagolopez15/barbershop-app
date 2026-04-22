import React from "react";

type Barber = {
  id: string;
  name: string;
  specialty: string;
};

type BarberCardProps = {
  barber: Barber;
  selected: boolean;
  onSelect: () => void;
};

const BarberCard: React.FC<BarberCardProps> = ({ barber, selected, onSelect }) => (
  <div
    className={`border rounded-xl p-4 cursor-pointer transition ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}`}
    onClick={onSelect}
  >
    <h2 className="text-xl font-bold mb-2">{barber.name}</h2>
    <p className="text-gray-600 mb-2">{barber.specialty}</p>
    {selected && <span className="text-blue-600 font-semibold">Seleccionado</span>}
  </div>
);

export default BarberCard;
