import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import places from "../data/places";
import "leaflet/dist/leaflet.css";
import './style.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Corrige o bug de caminhos do Leaflet com o Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapView() {
  const navigate = useNavigate();
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/sergipe.geojson")
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error("Erro ao carregar o GeoJSON:", error));
  }, []);

  const colors = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="map-wrapper" style={{ position: "relative" }}>
      
      <MapContainer
        center={[-10.57, -37.45]}
        zoom={9}
        minZoom={8}
        maxZoom={16}
        maxBounds={[
          [-11.8, -38.5],
          [-9.5, -36.0],
        ]}
        maxBoundsViscosity={1.0}
        className="map"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Proteção adicionada: Só roda se geoData e geoData.features existirem */}
        {geoData && geoData.features &&
          geoData.features.map((feature, index) => (
            <GeoJSON
              key={index}
              data={feature}
              style={{
                fillColor: colors[index % colors.length],
                fillOpacity: 0.8,
                color: "white",
                weight: 1.5,
              }}
            />
          ))
        }

        {places.map((place) => (
          <Marker key={place.id} position={place.position}>
            <Popup>
              <div style={{ width: "200px" }}>
                <img
                  src={place.image}
                  alt={place.title}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
                <h3>{place.title}</h3>
                <p>{place.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
                  <a href={place.route} target="_blank" rel="noopener noreferrer">
                    Como chegar
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button className="btn-voltar-mapa" onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <div className="title">
        VISITE SERGIPE
      </div>

    </div>
  );
}

export default MapView;