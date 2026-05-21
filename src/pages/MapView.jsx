import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import places from "../data/places";
import { getCompletedPhasesCount, getRestoredRegionsCount } from "../utils/progress";
import "leaflet/dist/leaflet.css";
import "./style.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function getFeatureAnchor(feature) {
  if (!feature?.geometry?.coordinates) {
    return { latitude: 0, longitude: 0 };
  }

  if (feature.geometry.type === "Polygon") {
    const [longitude, latitude] = feature.geometry.coordinates[0]?.[0] ?? [0, 0];
    return { latitude, longitude };
  }

  if (feature.geometry.type === "MultiPolygon") {
    const [longitude, latitude] = feature.geometry.coordinates[0]?.[0]?.[0] ?? [0, 0];
    return { latitude, longitude };
  }

  return { latitude: 0, longitude: 0 };
}

function getMarkerLatitude(place) {
  return Array.isArray(place.position) ? place.position[0] : 0;
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
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

  const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
  const totalFasesRestauradas = getCompletedPhasesCount();
  const totalRegioes = geoData?.features?.length ?? 0;
  const regioesRestauradas = useMemo(() => getRestoredRegionsCount(totalRegioes), [totalRegioes]);
  const restoredFeatureIds = useMemo(() => {
    if (!geoData?.features?.length || totalFasesRestauradas === 0) {
      return new Set();
    }

    const featuresOrdenadas = [...geoData.features].sort((featureA, featureB) => {
      const anchorA = getFeatureAnchor(featureA);
      const anchorB = getFeatureAnchor(featureB);

      if (anchorA.latitude !== anchorB.latitude) {
        return anchorA.latitude - anchorB.latitude;
      }

      return anchorA.longitude - anchorB.longitude;
    });

    const tamanhoBloco = Math.ceil(featuresOrdenadas.length / 3);
    const quantidadeLiberada = Math.min(featuresOrdenadas.length, totalFasesRestauradas * tamanhoBloco);

    return new Set(
      featuresOrdenadas
        .slice(0, quantidadeLiberada)
        .map((feature) => feature.properties?.id)
        .filter(Boolean)
    );
  }, [geoData, totalFasesRestauradas]);
  const unlockedPlaces = useMemo(() => {
    if (!places.length || totalFasesRestauradas === 0) {
      return [];
    }

    const placesOrdenados = [...places].sort((placeA, placeB) => getMarkerLatitude(placeA) - getMarkerLatitude(placeB));
    const tamanhoBloco = Math.ceil(placesOrdenados.length / 3);
    const quantidadeLiberada = Math.min(placesOrdenados.length, totalFasesRestauradas * tamanhoBloco);

    return placesOrdenados.slice(0, quantidadeLiberada);
  }, [totalFasesRestauradas]);

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[-10.57, -37.45]}
        zoom={9}
        minZoom={8}
        maxZoom={16}
        maxBounds={[
          [-11.8, -38.5],
          [-9.5, -36.0]
        ]}
        maxBoundsViscosity={1.0}
        className="map"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {geoData?.features?.map((feature, index) => {
          const ativa = restoredFeatureIds.has(feature.properties?.id);

          return (
            <GeoJSON
              key={index}
              data={feature}
              style={{
                fillColor: ativa ? colors[index % colors.length] : "#d9d4cc",
                fillOpacity: ativa ? 0.85 : 0.4,
                color: ativa ? "white" : "#a6a09a",
                weight: 1.5
              }}
            />
          );
        })}

        {unlockedPlaces.map((place) => (
          <Marker key={place.id} position={place.position}>
            <Popup>
              <div style={{ width: "200px" }}>
                <img
                  src={place.image}
                  alt={place.title}
                  style={{
                    width: "100%",
                    borderRadius: "10px"
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
        Voltar
      </button>

      <div className="title">Visite Sergipe</div>

      <aside className="map-progress-card">
        <p className="map-progress-kicker">Mapa sendo restaurado</p>
        <h2>{totalFasesRestauradas}/3 fases concluidas</h2>
        <p className="map-progress-text">
          Cada fase vencida reacende uma faixa continua do territorio sergipano.
        </p>
        <div className="map-progress-bar">
          <span style={{ width: `${(totalFasesRestauradas / 3) * 100}%` }} />
        </div>
        <strong className="map-progress-value">
          {regioesRestauradas} regioes de Sergipe destacadas
        </strong>
        <strong className="map-progress-value">
          {unlockedPlaces.length} pontos turisticos liberados
        </strong>
      </aside>
    </div>
  );
}

export default MapView;
