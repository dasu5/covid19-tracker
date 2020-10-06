import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    rgba: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 80000,
  },
  recovered: {
    hex: "#7dd71d",
    rgba: "rgb(125 , 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 12000,
  },
  deaths: {
    hex: "#fb4443",
    rgba: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 20000,
  },
};

export const sortData = (data) => {
  //[...data] - copy data to an array
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData;
};

export const prettyrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on the map with tooltip
export const showDataonMap = (data, caseTye = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseTye].hex}
      fillColor={caseTypeColors[caseTye].hex}
      radius={Math.sqrt(country[caseTye] * caseTypeColors[caseTye].multiplier)}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
