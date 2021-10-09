import React from "react";

interface MapQuestProps {
  city: string;
  width?: number;
  height?: number;
  zoom?: 1 | 2 | 3 | 4 | 10;
}

export const MapQuest = (props: MapQuestProps) => {
  const { height = 400, width = 600, zoom = 10 } = props;
  console.log("render");
  return (
    <div>
      <img
        src={`https://www.mapquestapi.com/staticmap/v5/map?key=OTVRApJgZK4fD9dhzeJXfvh8ltqA7Npa&center=${props.city}&size=${width},${height}&zoom=${zoom}`}
        alt="img"
      />
    </div>
  );
};
