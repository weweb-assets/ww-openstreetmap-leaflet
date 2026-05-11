export default {
  editor: {
    label: { en: "Leaflet" },
    icon: "map",
    customSettingsPropertiesOrder: [["map"], ["layers"]],
  },

  triggerEvents: [
    {
      name: "map:ready",
      label: { en: "On map ready" },
      event: {},
    },
    {
      name: "map:click",
      label: { en: "On map click" },
      event: {
        lat: 48.84872727506581,
        lng: 2.351657694024656,
        containerPoint: { x: 0, y: 0 },
      },
    },
    {
      name: "map:moveend",
      label: { en: "On map move end" },
      event: {
        center: { lat: 48.84872727506581, lng: 2.351657694024656 },
        zoom: 13,
        bounds: { north: 48.86, south: 48.83, east: 2.37, west: 2.33 },
      },
    },
    {
      name: "layer:click",
      label: { en: "On layer click" },
      event: {
        id: "marker-1",
        type: "marker",
        latlng: { lat: 48.84872727506581, lng: 2.351657694024656 },
        properties: {},
      },
    },
  ],

  actions: [
    {
      label: "Set view",
      description: "Recenter the map on the given coordinates and zoom level (no animation).",
      actionName: "setView",
      args: [
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
        { name: "zoom", type: "number" },
      ],
    },
    {
      label: "Fly to",
      description:
        "Smooth pan + zoom animation to the given coordinates. `duration` is in MILLISECONDS (e.g. 1500 = 1.5s). Leave empty for Leaflet's distance-based default.",
      actionName: "flyTo",
      args: [
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
        { name: "zoom", type: "number" },
        { name: "duration (ms)", type: "number" },
      ],
    },
    {
      label: "Pan to",
      description: "Pan the map to the given coordinates without zooming.",
      actionName: "panTo",
      args: [
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
      ],
    },
    {
      label: "Set zoom",
      description: "Set the map zoom level.",
      actionName: "setZoom",
      args: [{ name: "zoom", type: "number" }],
    },
    {
      label: "Fit bounds",
      description: "Fit the map view to the given geographic bounds (north/south/east/west in degrees).",
      actionName: "fitBounds",
      args: [
        { name: "north", type: "number" },
        { name: "south", type: "number" },
        { name: "east", type: "number" },
        { name: "west", type: "number" },
        { name: "padding", type: "number" },
      ],
    },
    {
      label: "Locate user",
      description: "Try to detect the user's location and center the map on it.",
      actionName: "locate",
      args: [
        { name: "enableHighAccuracy", type: "boolean" },
        { name: "timeout", type: "number" },
      ],
    },
    {
      label: "Invalidate size",
      description: "Force the map to recompute its container size after a parent resize/reveal.",
      actionName: "invalidateSize",
    },
  ],

  properties: {
    map: {
      label: { en: "Map" },
      type: "RawObject",
      section: "settings",
      defaultValue: {
        height: "500px",
        center: [46.603354, 1.888334],
        zoom: 4,
      },
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Object passed to `L.map(el, options)` plus one wrapper-only key.\n\n**Required:**\n- `height` — CSS length on the map ITSELF (e.g. `\"500px\"`, `\"60vh\"`). The map has no intrinsic height. **Do NOT rely on a parent container** — set the height directly here. Use `\"100%\"` ONLY when the immediate parent has an explicit non-auto height. Default suggestion: `\"500px\"`.\n- `center: [lat, lng]` — initial center.\n- `zoom` — initial zoom level.\n\n**Optional Leaflet [Map options](https://leafletjs.com/reference.html#map-option):**\n`minZoom`, `maxZoom`, `maxBounds`, `zoomControl`, `attributionControl`, `dragging`, `scrollWheelZoom`, `doubleClickZoom`, `touchZoom`, `keyboard`, `boxZoom`, `worldCopyJump`, `inertia`, …\n\nCoordinates use Leaflet `[lat, lng]` order — NOT GeoJSON `[lng, lat]`.",
      },
      bindingValidation: {
        type: "object",
        tooltip: "Example: `{ height: \"500px\", center: [48.85, 2.35], zoom: 12, scrollWheelZoom: false }`",
      },
      /* wwEditor:end */
    },

    layers: {
      label: { en: "Layers" },
      type: "RawObject",
      section: "settings",
      defaultValue: [
        { id: "base", type: "tileLayer", provider: "OpenStreetMap.Mapnik" },
      ],
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Array of everything to add to the map — tile layers, markers, shapes, GeoJSON, controls, clusters. Order in the array = render order. Each item: `{ id, type, ...payload }`. The `id` enables incremental diffing (only changed/added/removed entries re-render). Coordinates use Leaflet `[lat, lng]` order.\n\n**Tile layer:**\n- `{ id, type: 'tileLayer', provider: 'OpenStreetMap.Mapnik', options? }` — uses [leaflet-providers](https://leaflet-extras.github.io/leaflet-providers/preview/). Free providers without API key: `OpenStreetMap.Mapnik`, `OpenStreetMap.HOT`, `CartoDB.Positron`, `CartoDB.DarkMatter`, `CartoDB.Voyager`, `OpenTopoMap`, `Esri.WorldImagery`.\n- `{ id, type: 'tileLayer', url: 'https://{s}.tile.example/{z}/{x}/{y}.png', options? }`\n\n**Overlays** (all support `popup?: string` and `tooltip?: string`):\n- `marker` / `circleMarker`: `{ id, type, latlng: [lat, lng], options? }`\n- `circle`: `{ id, type: 'circle', latlng: [lat, lng], options: { radius (m), color, fillColor } }`\n- `polygon` / `polyline`: `{ id, type, latlngs: [[lat,lng], ...], options? }`\n- `rectangle`: `{ id, type: 'rectangle', bounds: [[s,w],[n,e]], options? }`\n- `imageOverlay`: `{ id, type: 'imageOverlay', url, bounds: [[s,w],[n,e]], options? }`\n- `geoJSON`: `{ id, type: 'geoJSON', data: <FeatureCollection|Feature>, style?, pointToLayer?: 'marker'|'circleMarker', onEachFeature?: 'bindPopup'|'bindTooltip', popupProperty?: 'name', filter?: { property, value, operator? }, swapCoords?: boolean }`\n- `markerClusterGroup` ([markercluster](https://github.com/Leaflet/Leaflet.markercluster)): `{ id, type: 'markerClusterGroup', options?, children: [<marker descriptors>] }` — wraps children for clustering. Use for >100 markers.\n\n**Controls** (each supports `position: 'topleft'|'topright'|'bottomleft'|'bottomright'`):\n- `scaleControl`: `{ id, type: 'scaleControl', position?, metric?, imperial?, maxWidth? }`\n- `layersControl`: `{ id, type: 'layersControl', position?, collapsed?, baseLayers: { Label: <tileLayer descriptor> }, overlays?: { Label: <layer descriptor> } }`\n\n(Zoom and attribution controls are toggled via the `map` prop — `map.zoomControl`, `map.attributionControl`.)",
      },
      bindingValidation: {
        type: "array",
        tooltip:
          "Array of layer descriptors. Example: `[{ id: 'base', type: 'tileLayer', provider: 'OpenStreetMap.Mapnik' }, { id: 'paris', type: 'marker', latlng: [48.85, 2.35], popup: 'Paris' }]`",
      },
      /* wwEditor:end */
    },
  },
};
