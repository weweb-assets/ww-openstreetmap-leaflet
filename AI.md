---
name: ww-openstreetmap-leaflet
description: AI-first Leaflet/OpenStreetMap component. Two props (`map` + `layers`) that mirror Leaflet's API 1:1 — paste snippets straight from the Leaflet docs.
keywords:
  - map
  - openstreetmap
  - leaflet
  - geo
  - marker
  - polygon
  - geojson
  - tile
  - cluster
---

# ww-openstreetmap-leaflet — AI Spec

This element wraps Leaflet 1:1 with **two props** — `map` and `layers`. Generate config the way the Leaflet docs would. There is **no** WeWeb-specific DSL.

## Mandatory rules (priority order)

1. **`map.height` is required.** CSS length, e.g. `"400px"`. Leaflet has no intrinsic height — empty container = blank map.
2. **`map.center` and `map.zoom` are required.** Reasonable seed: `center: [46.603354, 1.888334], zoom: 4`. Use city coords if the prompt names one.
3. **First item of `layers` should be a `tileLayer`.** Default: `{ id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' }`. Without it the background is empty.
4. **Coordinates use Leaflet `[lat, lng]` order.** Never `[lng, lat]` (GeoJSON). For incoming GeoJSON with `[lng, lat]`, set `swapCoords: true` on the geoJSON layer.
5. **Stable `id` per layer.** Required for diffing.

## The 2 props

```js
map: {
  height: '400px',                  // REQUIRED
  center: [lat, lng],               // REQUIRED
  zoom: 4,                          // REQUIRED
  // optional Leaflet Map options:
  minZoom, maxZoom, maxBounds,
  zoomControl, attributionControl,  // booleans
  dragging, scrollWheelZoom, doubleClickZoom, touchZoom,
  keyboard, boxZoom, worldCopyJump, inertia,
}

layers: [
  // tile (always include one as the first item):
  { id, type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' },
  { id, type: 'tileLayer', url: 'https://{s}.tile/{z}/{x}/{y}.png', options: { attribution } },

  // overlays (popup/tooltip apply to all):
  { id, type: 'marker',       latlng: [lat, lng], popup?, tooltip?, options? },
  { id, type: 'circleMarker', latlng: [lat, lng], options: { radius (px), color, fillColor } },
  { id, type: 'circle',       latlng: [lat, lng], options: { radius (m), color, fillColor } },
  { id, type: 'polygon',      latlngs: [[lat,lng], ...], options: { color, fillColor } },
  { id, type: 'polyline',     latlngs: [[lat,lng], ...], options: { color, weight } },
  { id, type: 'rectangle',    bounds: [[s,w],[n,e]], options },
  { id, type: 'imageOverlay', url, bounds: [[s,w],[n,e]], options: { opacity } },

  // GeoJSON:
  { id, type: 'geoJSON',
    data: <FeatureCollection | Feature>,
    style: { color, weight, fillColor, fillOpacity },
    pointToLayer: 'marker' | 'circleMarker',
    onEachFeature: 'bindPopup' | 'bindTooltip',
    popupProperty: 'name',
    filter: { property, value, operator: 'eq' | 'neq' | 'gt' | 'lt' },
    swapCoords: false,
  },

  // Cluster (for >100 markers):
  { id, type: 'markerClusterGroup', options?, children: [<marker descriptors>] },

  // Controls:
  { id, type: 'scaleControl',  position?, metric?, imperial?, maxWidth? },
  { id, type: 'layersControl', position?, collapsed?, baseLayers: { Label: <tileLayer descriptor> }, overlays?: {...} },
]
```

(Zoom and attribution toggles live on `map`: `map.zoomControl`, `map.attributionControl`.)

## Triggers

- `map:ready` — `{}`
- `map:click` — `{ lat, lng, containerPoint }`
- `map:moveend` — `{ center: {lat,lng}, zoom, bounds: {north,south,east,west} }`
- `layer:click` — `{ id, type, latlng, properties }`

## Variables

`currentCenter` `{lat, lng}` · `currentZoom` `number` · `currentBounds` `{north, south, east, west}` · `isReady` `boolean`.

## Actions

`setView(lat, lng, zoom)` · `flyTo(lat, lng, zoom, duration?)` · `panTo(lat, lng)` · `setZoom(zoom)` · `fitBounds(north, south, east, west, padding?)` · `locate(enableHighAccuracy?, timeout?)` · `invalidateSize()`.

## Tile providers without API key

`OpenStreetMap.Mapnik` (default), `OpenStreetMap.HOT`, `CartoDB.Positron`, `CartoDB.DarkMatter`, `CartoDB.Voyager`, `OpenTopoMap`, `Esri.WorldImagery`, `Esri.WorldStreetMap`. Anything else likely needs `tileLayer.options.apikey`.

## Constraints

- The element renders no slots.
- DO NOT inject custom CSS via `classes`/`styles`; Leaflet owns its DOM. The only sizing knob is `map.height`.
- The Leaflet map instance is NOT exposed. Use the actions for imperative ops.

## Examples

### Basic Paris map

```js
map: { height: '500px', center: [48.85, 2.35], zoom: 12 }
layers: [{ id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' }]
```

### 5 US cities

```js
map: { height: '500px', center: [39.5, -98.5], zoom: 4 }
layers: [
  { id: 'base', type: 'tileLayer', provider: 'CartoDB.Positron' },
  { id: 'ny',  type: 'marker', latlng: [40.7128, -74.0060], popup: 'New York' },
  { id: 'la',  type: 'marker', latlng: [34.0522, -118.2437], popup: 'Los Angeles' },
  { id: 'chi', type: 'marker', latlng: [41.8781, -87.6298], popup: 'Chicago' },
  { id: 'hou', type: 'marker', latlng: [29.7604, -95.3698], popup: 'Houston' },
  { id: 'phx', type: 'marker', latlng: [33.4484, -112.0740], popup: 'Phoenix' },
]
```

### Markers bound to a `cities` variable, with clustering

```js
map: { height: '600px', center: [46.6, 1.9], zoom: 5 }
layers: [
  { id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' },
  {
    id: 'cluster', type: 'markerClusterGroup',
    children: cities.map(c => ({
      id: c.id, type: 'marker', latlng: [c.lat, c.lng], popup: c.name,
    })),
  },
]
```

### Circle around Paris (no stroke, red fill)

```js
map: { height: '500px', center: [48.85, 2.35], zoom: 11 }
layers: [
  { id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' },
  {
    id: 'zone', type: 'circle', latlng: [48.85, 2.35],
    options: { radius: 5000, stroke: false, fill: true, fillColor: '#ff3b30', fillOpacity: 0.4 },
  },
]
```

### GeoJSON country borders

```js
map: { height: '600px', center: [20, 0], zoom: 2 }
layers: [
  { id: 'base', type: 'tileLayer', provider: 'CartoDB.Positron' },
  {
    id: 'countries', type: 'geoJSON',
    data: countriesFeatureCollection,
    style: { color: '#3388ff', weight: 1, fillOpacity: 0.3 },
    onEachFeature: 'bindPopup', popupProperty: 'name',
  },
]
```
