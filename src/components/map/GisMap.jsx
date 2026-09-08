import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet'

const STATUS_COLOR = {
  green: '#4CC77E',
  yellow: '#EFA23D',
  red: '#E96A6A',
  blue: '#3FA9DA'
}

/**
 * Shared GIS basemap for beat navigation, GVP blackspots, weighbridge
 * corridors, drain networks, etc. `markers` and `route` are plain
 * lat/lng data so every module can reuse this with its own points.
 */
export default function GisMap({ center = [18.5204, 73.8567], zoom = 14, markers = [], route = [], height = 320 }) {
  return (
    <div style={{ height }} className="rounded-md overflow-hidden border border-border">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors, &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {route.length > 1 && <Polyline positions={route} pathOptions={{ color: '#22B8A6', weight: 3, opacity: 0.8 }} />}
        {markers.map((m, i) => (
          <CircleMarker
            key={i}
            center={[m.lat, m.lng]}
            radius={m.status === 'blue' ? 7 : 6}
            pathOptions={{
              color: STATUS_COLOR[m.status] || '#3FA9DA',
              fillColor: STATUS_COLOR[m.status] || '#3FA9DA',
              fillOpacity: 0.85,
              weight: 2
            }}
          >
            {m.label && (
              <Popup>
                <span style={{ fontSize: 12 }}>{m.label}</span>
              </Popup>
            )}
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
