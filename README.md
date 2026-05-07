# ww-openstreetmap-leaflet

WeWeb element wrapping [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) tiles.

## Philosophy

This element mirrors Leaflet's native API 1:1 instead of exposing a no-code DSL. Each prop maps directly to a Leaflet primitive, and the snippets in the official Leaflet docs paste in unchanged.

## Properties

| Prop | Type | Maps to |
|---|---|---|
| `height` | CSS length | container `height` (required — Leaflet has no intrinsic height) |
| `mapOptions` | Object | [`L.map(el, options)`](https://leafletjs.com/reference.html#map-option) — `center`, `zoom`, `minZoom`, `maxZoom`, `dragging`, `scrollWheelZoom`, `doubleClickZoom`, `touchZoom`, `keyboard`, `boxZoom`, `worldCopyJump`, ... |
| `tileLayer` | Object | `{ provider }` → [`L.tileLayer.provider(name)`](https://github.com/leaflet-extras/leaflet-providers) **OR** `{ url, options }` → [`L.tileLayer(url, options)`](https://leafletjs.com/reference.html#tilelayer) |
| `layers` | Array | declarative descriptors — see below |
| `geoJSON` | Object | [`L.geoJSON(data, options)`](https://leafletjs.com/reference.html#geojson) |
| `controls` | Object | `zoom`, `attribution`, `scale`, `layers` — each [`L.control.*`](https://leafletjs.com/reference.html#control) |
| `enableMarkerCluster` | Boolean | wraps markers in [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) |

### `layers` items

Each item: `{ id, type, ...payload, options?, popup?, tooltip? }`. The `id` enables incremental diffing.

| `type` | Payload | Maps to |
|---|---|---|
| `marker` | `latlng: [lat, lng]` | `L.marker(latlng, options)` |
| `circleMarker` | `latlng: [lat, lng]` | `L.circleMarker(latlng, options)` |
| `circle` | `latlng: [lat, lng]`, `options.radius` (m) | `L.circle(latlng, options)` |
| `polygon` | `latlngs: [[lat,lng], ...]` | `L.polygon(latlngs, options)` |
| `polyline` | `latlngs: [[lat,lng], ...]` | `L.polyline(latlngs, options)` |
| `rectangle` | `bounds: [[s,w],[n,e]]` | `L.rectangle(bounds, options)` |
| `imageOverlay` | `url`, `bounds: [[s,w],[n,e]]` | `L.imageOverlay(url, bounds, options)` |

### `geoJSON` shape

```js
{
  data: <FeatureCollection | Feature>,    // required
  style: { color, weight, opacity, fillColor, fillOpacity },
  pointToLayer: 'marker' | 'circleMarker',
  onEachFeature: 'bindPopup' | 'bindTooltip',
  popupProperty: 'name',                  // feature.properties[key] used by bind*
  filter: { property, value, operator },  // operator: 'eq'|'neq'|'gt'|'lt'
  swapCoords: false,                      // true if your data is [lng, lat]
}
```

Callbacks are exposed as named enum values (no user-supplied JS code) to keep the surface declarative and safe.

## Triggers

| Event | Payload |
|---|---|
| `map:ready` | `{}` |
| `map:click` | `{ lat, lng, containerPoint }` |
| `map:moveend` | `{ center, zoom, bounds }` |
| `layer:click` | `{ id, type, latlng, properties }` |

## Variables

`currentCenter`, `currentZoom`, `currentBounds`, `isReady`.

## Actions

`setView(lat, lng, zoom)` · `flyTo(lat, lng, zoom, duration?)` · `panTo(lat, lng)` · `setZoom(zoom)` · `fitBounds(north, south, east, west, padding?)` · `locate(enableHighAccuracy?, timeout?)` · `invalidateSize()`.

## Example — basic Paris map

```js
mapOptions: { center: [48.85, 2.35], zoom: 12 }
tileLayer:  { provider: 'OpenStreetMap.Mapnik' }
layers:     [{ id: 'paris', type: 'marker', latlng: [48.85, 2.35], popup: 'Paris' }]
height:     '500px'
```

## Example — clustered markers from a variable

```js
mapOptions: { center: [40, -98], zoom: 4 }
tileLayer:  { provider: 'CartoDB.Positron' }
layers:     cities.map(c => ({
              id: c.id,
              type: 'marker',
              latlng: [c.lat, c.lng],
              popup: c.name,
            }))
enableMarkerCluster: true
```

## Example — GeoJSON polygons with hover popup

```js
geoJSON: {
  data: countriesFeatureCollection,
  style: { color: '#3388ff', weight: 1, fillOpacity: 0.3 },
  onEachFeature: 'bindPopup',
  popupProperty: 'name',
}
```

## Gotchas

- **Coordinates use `[lat, lng]`** (Leaflet convention), **not** GeoJSON `[lng, lat]`.
- **Container height is required** — Leaflet has no intrinsic height. The `height` prop applies `height: <value>`; never omit it.
- **GeoJSON with inverted coords** — set `swapCoords: true` to feed Leaflet `[lng, lat]` data.
- **OSM tile usage policy** — for production, prefer `CartoDB.*` or providers with explicit terms.

## Installation

```sh
npm i
npm run serve
```

## Build

```sh
npm run build --name=ww-openstreetmap-leaflet
```
