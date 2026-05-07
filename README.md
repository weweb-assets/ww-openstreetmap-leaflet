# ww-openstreetmap-leaflet

WeWeb element wrapping [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) tiles.

## Philosophy

Two props only — `map` and `layers`. Each prop maps directly to how you'd write Leaflet by hand:

```js
const map = L.map(el, mapOptions);   // → `map` prop
L.tileLayer.provider('…').addTo(map); // ┐
L.marker([…]).addTo(map);             // │
L.geoJSON(data).addTo(map);           // ├─→ `layers` prop (array)
L.control.scale().addTo(map);         // │
L.markerClusterGroup().addTo(map);    // ┘
```

Snippets from the official Leaflet docs paste in unchanged.

## Properties

### `map`

Object passed to `L.map(el, options)` plus a wrapper-only `height`.

```js
{
  height: '400px',                  // REQUIRED — CSS length
  center: [46.603354, 1.888334],    // REQUIRED
  zoom: 4,                          // REQUIRED
  // optional Leaflet Map options:
  minZoom, maxZoom, maxBounds,
  zoomControl, attributionControl,
  dragging, scrollWheelZoom, doubleClickZoom, touchZoom,
  keyboard, boxZoom, worldCopyJump, inertia, …
}
```

### `layers`

Array of everything that goes on the map. Order = render order. Every item has `{ id, type, ...payload }`. The `id` enables incremental diffing.

| `type` | Payload | Maps to |
|---|---|---|
| `tileLayer` | `{ provider }` *or* `{ url, options }` | `L.tileLayer.provider(name)` / `L.tileLayer(url, options)` |
| `marker` / `circleMarker` | `latlng: [lat, lng]`, `options?`, `popup?`, `tooltip?` | `L.marker(latlng, options)` / `L.circleMarker(...)` |
| `circle` | `latlng`, `options.radius` (m) | `L.circle(latlng, options)` |
| `polygon` / `polyline` | `latlngs: [[lat,lng], ...]`, `options?` | `L.polygon(latlngs, options)` / `L.polyline(...)` |
| `rectangle` | `bounds: [[s,w],[n,e]]`, `options?` | `L.rectangle(bounds, options)` |
| `imageOverlay` | `url`, `bounds: [[s,w],[n,e]]`, `options?` | `L.imageOverlay(url, bounds, options)` |
| `geoJSON` | `data, style?, pointToLayer?, onEachFeature?, popupProperty?, filter?, swapCoords?` | `L.geoJSON(data, options)` |
| `markerClusterGroup` | `options?, children: [<marker descriptors>]` | `L.markerClusterGroup(options).addLayer(child).addLayer(child)…` |
| `scaleControl` | `position?, metric?, imperial?, maxWidth?` | `L.control.scale(options)` |
| `layersControl` | `position?, collapsed?, baseLayers, overlays?` | `L.control.layers(baseLayers, overlays, options)` |

### GeoJSON callbacks (declarative, no `eval`)

`pointToLayer`: `'marker'` | `'circleMarker'`. `onEachFeature`: `'bindPopup'` | `'bindTooltip'`. `popupProperty` selects which feature property to display (default `'name'`). `filter`: `{ property, value, operator? }`. `swapCoords: true` if your data uses GeoJSON `[lng, lat]`.

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

## Examples

### Basic Paris map

```js
map:    { height: '500px', center: [48.85, 2.35], zoom: 12 }
layers: [{ id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' }]
```

### Clustered markers from a `cities` variable

```js
map: { height: '600px', center: [46.6, 1.9], zoom: 5 }
layers: [
  { id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' },
  {
    id: 'cluster',
    type: 'markerClusterGroup',
    children: cities.map(c => ({
      id: c.id, type: 'marker', latlng: [c.lat, c.lng], popup: c.name,
    })),
  },
]
```

### GeoJSON polygons + scale control

```js
map: { height: '600px', center: [20, 0], zoom: 2 }
layers: [
  { id: 'base',    type: 'tileLayer', provider: 'CartoDB.Positron' },
  {
    id: 'countries', type: 'geoJSON', data: countriesFeatureCollection,
    style: { color: '#3388ff', weight: 1, fillOpacity: 0.3 },
    onEachFeature: 'bindPopup', popupProperty: 'name',
  },
  { id: 'scale', type: 'scaleControl', position: 'bottomleft', metric: true },
]
```

## Gotchas

- **Coordinates use `[lat, lng]`** — Leaflet convention, not GeoJSON `[lng, lat]`.
- **`map.height` is required** — Leaflet has no intrinsic height.
- **Always include a `tileLayer`** as the first item of `layers`, otherwise the background is empty.
- **Stable `id` per layer** — required for diffing.
- **OSM tile usage policy** — for production, prefer `CartoDB.*` or providers with explicit terms.

## Install / build

```sh
npm i
npm run serve              # dev server
npm run build name=ww-openstreetmap-leaflet type=wwobject
```
