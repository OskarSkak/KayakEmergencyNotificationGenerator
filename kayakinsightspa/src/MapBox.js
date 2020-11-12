import { bgColor } from "ansi-styles";
import React, { Component } from "react";
import {
  Circle,
  CircleMarker,
  Map,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
  Marker,
  MapContainer,
} from "react-leaflet";
import { CSVReader } from "react-papaparse";
import PersonInformationComponent from "./PersonInformationComponent";

const gps = [
  [55.649344, 12.547095],
  [55.649507, 12.5468],
  [55.649638, 12.546753],
  [55.649918, 12.547053],
];

const MapBox = () => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "65%", float: "left" }}>
        <MapContainer
          style={{ height: "100vh" }}
          center={[55.649918, 12.547053]}
          zoom={17}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle
            fill={false}
            color="red"
            className={"blink"}
            center={[55.649918, 12.547053]}
            radius={10}
            weight={10}
            fillOpacity={10}
          />
          <Polyline color="green" positions={gps} />
          {gps.forEach((e) => {
            return (
              <>
                <CircleMarker
                  center={e}
                  color="green"
                  fillOpacity={10}
                  radius={3}
                />
              </>
            );
          })}
        </MapContainer>
      </div>
      <div
        style={{
          backgroundColor: "#edf2f7",
          height: "100vh",
          float: "left",
          width: "35%",
          display: "block",
        }}
      >
        <PersonInformationComponent />
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default MapBox;
