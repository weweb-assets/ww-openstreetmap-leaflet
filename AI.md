---
name: ww-openstreetmap-leaflet
description: AI-first Leaflet/OpenStreetMap component. Each prop mirrors a Leaflet API primitive — paste snippets straight from the Leaflet docs.
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

This element wraps Leaflet 1:1. Generate config the way the Leaflet docs would: as plain objects matching the native API. There is **no** WeWeb-specific DSL.

## Mandatory rules (priority order)

1. **Container height is required.** Always set `height` (CSS length, e.g. `"400px"`). Leaflet has no intrinsic height; an empty container renders blank.
2. **Coordinates use Leaflet `[lat, lng]` order.** Never `[lng, lat]` (which is the GeoJSON convention). For GeoJSON inputs that genuinely use `[lng, lat]`, set `geoJSON.swapCoords: true`.
3. **Pick the right prop for the job.**
   - Static or bound list of overlays → `layers` (declarative array with `id`).
   - GeoJSON FeatureCollection from an API → `geoJSON.data`.
   - Tile background → `tileLayer.provider` (e.g. `"OpenStreetMap.Mapnik"`).
4. **Default tile** is `OpenStreetMap.Mapnik`. Don't change it unless the user asks. For production, recommend `CartoDB.Positron` (no API key, friendlier policy).
5. **`mapOptions.center` and `mapOptions.zoom` are required.** Reasonable seed: `center: [46.603354, 1.888334], zoom: 4` (centre of France, country-wide view) — or city-specific if the prompt names one.

## Property cheat sheet

```js
mapOptions: { center: [lat, lng], zoom, minZoom, maxZoom, scrollWheelZoom, dragging, ... }
tileLayer:  { provider: "OpenStreetMap.Mapnik" }
            // OR
            { url: "https://{s}.tile.example/{z}/{x}/{y}.png", options: { attribution } }
layers:     [
  { id, type: "marker",       latlng: [lat, lng], popup?, tooltip?, options? },
  { id, type: "circleMarker", latlng: [lat, lng], options: { radius: 8, color: "red" } },
  { id, type: "circle",       latlng: [lat, lng], options: { radius: 1000 /* meters */ } },
  { id, type: "polygon",      latlngs: [[lat,lng], ...], options: { color, fillColor } },
  { id, type: "polyline",     latlngs: [[lat,lng], ...], options: { color, weight } },
  { id, type: "rectangle",    bounds: [[s,w],[n,e]], options },
  { id, type: "imageOverlay", url, bounds: [[s,w],[n,e]], options: { opacity } },
]
geoJSON: {
  data: <FeatureCollection|Feature>,
  style: { color, weight, opacity, fillColor, fillOpacity },
  pointToLayer: "marker" | "circleMarker",
  onEachFeature: "bindPopup" | "bindTooltip",
  popupProperty: "name",       // feature.properties[key] used by bind*
  filter: { property, value, operator: "eq"|"neq"|"gt"|"lt" },
  swapCoords: false,
}
controls: {
  zoom:        { enabled: true, position: "topleft" },
  attribution: { enabled: true, prefix: "Leaflet" },
  scale:       { enabled: false, metric: true, imperial: false, position: "bottomleft" },
  layers:      { enabled: false, baseLayers: { Light: {provider:"CartoDB.Positron"}, Dark: {provider:"CartoDB.DarkMatter"} }, overlays: {} },
}
enableMarkerCluster: false   // set true for >100 markers
height: "400px"
```

## Triggers

- `map:ready` — `{}`
- `map:click` — `{ lat, lng, containerPoint }`
- `map:moveend` — `{ center: {lat,lng}, zoom, bounds: {north,south,east,west} }`
- `layer:click` — `{ id, type, latlng, properties }`

## Variables

`currentCenter` `{lat, lng}` · `currentZoom` `number` · `currentBounds` `{north, south, east, west}` · `isReady` `boolean`.

## Actions (workflow methods)

- `setView(lat, lng, zoom)` — instant recentre.
- `flyTo(lat, lng, zoom, duration?)` — animated.
- `panTo(lat, lng)` · `setZoom(zoom)`.
- `fitBounds(north, south, east, west, padding?)`.
- `locate(enableHighAccuracy?, timeout?)` — geolocate the user and centre.
- `invalidateSize()` — call this after revealing a panel/resizing the container.

## Tile providers without API key

`OpenStreetMap.Mapnik` (default), `OpenStreetMap.HOT`, `CartoDB.Positron`, `CartoDB.DarkMatter`, `CartoDB.Voyager`, `OpenTopoMap`, `Esri.WorldImagery`, `Esri.WorldStreetMap`. Anything else likely needs `tileLayer.options.apikey` or similar.

## Constraints

- The element renders no slots and contains no WeWeb children.
- Don't inject custom CSS via `classes`/`styles`; Leaflet owns its DOM. The `height` prop is the only sizing knob.
- The Leaflet map instance is **not** exposed. Use the actions above for imperative operations.

## Examples

### Basic Paris map
```js
height: "500px"
mapOptions: { center: [48.85, 2.35], zoom: 12 }
tileLayer:  { provider: "OpenStreetMap.Mapnik" }
```

### 5 US cities
```js
height: "500px"
mapOptions: { center: [39.5, -98.5], zoom: 4 }
tileLayer:  { provider: "CartoDB.Positron" }
layers: [
  { id: "ny",  type: "marker", latlng: [40.7128, -74.0060], popup: "New York" },
  { id: "la",  type: "marker", latlng: [34.0522, -118.2437], popup: "Los Angeles" },
  { id: "chi", type: "marker", latlng: [41.8781, -87.6298], popup: "Chicago" },
  { id: "hou", type: "marker", latlng: [29.7604, -95.3698], popup: "Houston" },
  { id: "phx", type: "marker", latlng: [33.4484, -112.0740], popup: "Phoenix" },
]
```

### Markers bound to a variable, with clustering
```js
mapOptions: { center: [46.6, 1.9], zoom: 5 }
layers: cities.map(c => ({
  id:     c.id,
  type:   "marker",
  latlng: [c.lat, c.lng],
  popup:  c.name,
}))
enableMarkerCluster: true
```

### Circle around Paris (no stroke, red fill)
```js
layers: [{
  id: "zone",
  type: "circle",
  latlng: [48.85, 2.35],
  options: { radius: 5000, stroke: false, fill: true, fillColor: "#ff3b30", fillOpacity: 0.4 },
}]
```

### GeoJSON country borders
```js
geoJSON: {
  data: countriesFeatureCollection,
  style: { color: "#3388ff", weight: 1, fillOpacity: 0.3 },
  onEachFeature: "bindPopup",
  popupProperty: "name",
}
```
