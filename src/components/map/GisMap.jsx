import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet'

const STATUS_COLOR = {
  green: '#20B486',
  yellow: '#F59E0B',
  red: '#D64545',
  blue: '#2684E8'
}

/**
 * Shared GIS basemap for beat navigation, GVP blackspots, weighbridge
 * corridors, drain networks, etc. `markers` and `route` are plain
 * lat/lng data so every module can reuse this with its own points.
 */
export default function GisMap({ center = [18.5204, 73.8567], zoom = 14, markers = [], route = [], height = 320 }) {
  return (
    <div style={{ height }} className="rounded-2xl overflow-hidden border border-border shadow-soft">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {route.length > 1 && <Polyline positions={route} pathOptions={{ color: '#13B889', weight: 4, opacity: 0.9 }} />}
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
