import React from "react";
import {
    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs,
} from "react-google-maps";

const MapWithAMarker = ({ hosts, onMarkerClick }) => {
    if (!hosts) {
        return null;
    }

    return (
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{ lat: 45.508888, lng: -73.561668 }}
        >
            {hosts.map((host, index) => {
                return (
                    <Marker
                        onClick={() => onMarkerClick(host)}
                        key={index}
                        position={{ lat: +host.lat, lng: +host.lng }}
                    />
                );
            })}
        </GoogleMap>
    );
};

const WrappedMap = withScriptjs(withGoogleMap(MapWithAMarker));

const Map = ({ hosts, onMarkerClick }) => {
    return (
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB4BUaEXVyi3KTdMUrMH2UmWy8bdMc0Sd0`}
            loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%`, width: "100%" }} />}
            hosts={hosts}
            onMarkerClick={onMarkerClick}
        />
    );
};

export default Map;
