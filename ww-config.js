export default {
  editor: {
    label: {
      en: "Leaflet",
    },
    icon: "map",
    customSettingsPropertiesOrder: [
      ["height"],
      ["mapOptions"],
      ["tileLayer"],
      ["layers"],
      ["geoJSON"],
      ["controls"],
      ["enableMarkerCluster"],
    ],
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
      description: "Smooth pan + zoom animation to the given coordinates.",
      actionName: "flyTo",
      args: [
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
        { name: "zoom", type: "number" },
        { name: "duration", type: "number" },
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
      description:
        "Fit the map view to the given geographic bounds (north/south/east/west in degrees).",
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
      description:
        "Try to detect the user's location and center the map on it. Triggers Leaflet locationfound/locationerror events.",
      actionName: "locate",
      args: [
        { name: "enableHighAccuracy", type: "boolean" },
        { name: "timeout", type: "number" },
      ],
    },
    {
      label: "Invalidate size",
      description:
        "Force the map to recompute its container size. Call after the surrounding container is resized or revealed.",
      actionName: "invalidateSize",
    },
  ],

  properties: {
    height: {
      label: { en: "Height" },
      type: "Text",
      section: "settings",
      defaultValue: "400px",
      bindable: true,
      options: { placeholder: "400px" },
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "CSS height applied to the map container (e.g. `400px`, `100%`, `60vh`). Required — Leaflet has no intrinsic height; an empty container renders a blank map.",
      },
      bindingValidation: { type: "string", tooltip: "A CSS length, e.g. `\"400px\"`" },
      /* wwEditor:end */
    },

    mapOptions: {
      label: { en: "Map options" },
      type: "Object",
      section: "settings",
      defaultValue: {
        center: [46.603354, 1.888334],
        zoom: 4,
      },
      bindable: true,
      options: {
        item: {
          center: {
            label: { en: "Center [lat, lng]" },
            type: "Array",
            defaultValue: [46.603354, 1.888334],
            bindable: true,
            options: { item: { type: "Number", defaultValue: 0 } },
          },
          zoom: {
            label: { en: "Zoom" },
            type: "Number",
            defaultValue: 4,
            bindable: true,
            options: { min: 0, max: 20, step: 1 },
          },
          minZoom: { label: { en: "Min zoom" }, type: "Number", bindable: true },
          maxZoom: { label: { en: "Max zoom" }, type: "Number", bindable: true },
          dragging: { label: { en: "Dragging" }, type: "OnOff", defaultValue: true, bindable: true },
          scrollWheelZoom: { label: { en: "Scroll wheel zoom" }, type: "OnOff", defaultValue: true, bindable: true },
          doubleClickZoom: { label: { en: "Double click zoom" }, type: "OnOff", defaultValue: true, bindable: true },
          touchZoom: { label: { en: "Touch zoom" }, type: "OnOff", defaultValue: true, bindable: true },
          keyboard: { label: { en: "Keyboard" }, type: "OnOff", defaultValue: true, bindable: true },
          boxZoom: { label: { en: "Box zoom" }, type: "OnOff", defaultValue: true, bindable: true },
        },
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Object passed directly to `L.map(el, options)`. Mirrors Leaflet's [Map options](https://leafletjs.com/reference.html#map-option). Common keys: `center: [lat, lng]`, `zoom`, `minZoom`, `maxZoom`, `dragging`, `scrollWheelZoom`, `doubleClickZoom`, `touchZoom`, `keyboard`, `boxZoom`, `worldCopyJump`. Coordinates use Leaflet's `[lat, lng]` order (NOT GeoJSON `[lng, lat]`).",
      },
      bindingValidation: {
        type: "object",
        tooltip:
          "An object matching Leaflet Map options. Example: `{ center: [48.85, 2.35], zoom: 12, scrollWheelZoom: false }`",
      },
      /* wwEditor:end */
    },

    tileLayer: {
      label: { en: "Tile layer" },
      type: "Object",
      section: "settings",
      defaultValue: {
        provider: "OpenStreetMap.Mapnik",
      },
      bindable: true,
      options: {
        item: {
          provider: {
            label: { en: "Provider" },
            type: "Text",
            defaultValue: "OpenStreetMap.Mapnik",
            bindable: true,
            options: { placeholder: "OpenStreetMap.Mapnik" },
          },
          url: {
            label: { en: "Custom URL" },
            type: "Text",
            bindable: true,
            options: { placeholder: "https://{s}.tile.example/{z}/{x}/{y}.png" },
          },
          options: {
            label: { en: "Options" },
            type: "Object",
            bindable: true,
            options: { item: {} },
          },
        },
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Configures the base tile layer. Two mutually exclusive forms:\n\n- **Provider preset** (recommended) — `{ provider: 'OpenStreetMap.Mapnik', options: {...} }`. Uses [leaflet-providers](https://leaflet-extras.github.io/leaflet-providers/preview/) registry. Free presets that work without API key: `OpenStreetMap.Mapnik`, `OpenStreetMap.HOT`, `CartoDB.Positron`, `CartoDB.DarkMatter`, `CartoDB.Voyager`, `OpenTopoMap`, `Esri.WorldImagery`, `Esri.WorldStreetMap`. Some providers need an API key passed via `options`.\n\n- **Custom URL** — `{ url: 'https://{s}.tile.example.com/{z}/{x}/{y}.png', options: { attribution, maxZoom, ... } }`.",
      },
      bindingValidation: {
        type: "object",
        tooltip:
          "Object: `{ provider: 'OpenStreetMap.Mapnik' }` OR `{ url: '...', options: { attribution: '...' } }`",
      },
      /* wwEditor:end */
    },

    layers: {
      label: { en: "Layers" },
      type: "Array",
      section: "settings",
      defaultValue: [],
      bindable: true,
      options: {
        getItemLabel(item, index) {
          return item?.id ? `${item.type || "layer"} · ${item.id}` : `Layer ${index + 1}`;
        },
        movable: true,
        expandable: true,
        item: {
          type: "Object",
          defaultValue: { id: "", type: "marker", latlng: [0, 0] },
          options: {
            item: {
              id: { label: { en: "Id" }, type: "Text", bindable: true, options: { placeholder: "unique-id" } },
              type: {
                label: { en: "Type" },
                type: "TextSelect",
                defaultValue: "marker",
                options: {
                  options: [
                    { value: "marker", label: "Marker" },
                    { value: "circleMarker", label: "Circle marker" },
                    { value: "circle", label: "Circle" },
                    { value: "polygon", label: "Polygon" },
                    { value: "polyline", label: "Polyline" },
                    { value: "rectangle", label: "Rectangle" },
                    { value: "imageOverlay", label: "Image overlay" },
                  ],
                },
                bindable: true,
              },
              latlng: { label: { en: "Latlng [lat, lng]" }, type: "Array", bindable: true, options: { item: { type: "Number", defaultValue: 0 } } },
              latlngs: { label: { en: "Latlngs (polygon/polyline)" }, type: "Array", bindable: true, options: { item: { type: "Array", options: { item: { type: "Number", defaultValue: 0 } } } } },
              bounds: { label: { en: "Bounds [[s,w],[n,e]]" }, type: "Array", bindable: true, options: { item: { type: "Array", options: { item: { type: "Number", defaultValue: 0 } } } } },
              url: { label: { en: "URL (imageOverlay)" }, type: "Text", bindable: true },
              options: { label: { en: "Options" }, type: "Object", bindable: true, options: { item: {} } },
              popup: { label: { en: "Popup HTML" }, type: "Text", bindable: true, options: { placeholder: "<b>Title</b>" } },
              tooltip: { label: { en: "Tooltip text" }, type: "Text", bindable: true },
            },
          },
        },
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Array of declarative layer descriptors. Each item: `{ id, type, ... }` where `type` is one of `marker`, `circle`, `circleMarker`, `polygon`, `polyline`, `rectangle`, `imageOverlay`. \n\nShape per type:\n- `marker` / `circleMarker`: `{ id, type, latlng: [lat, lng], options?: {}, popup?: 'string', tooltip?: 'string' }`\n- `circle`: same as marker + `options.radius` in meters\n- `polygon` / `polyline`: `{ id, type, latlngs: [[lat,lng], ...], options?: { color, weight, fill, fillColor, ... } }`\n- `rectangle`: `{ id, type, bounds: [[s,w],[n,e]], options?: {} }`\n- `imageOverlay`: `{ id, type, url, bounds: [[s,w],[n,e]], options?: { opacity } }`\n\nThe unique `id` enables incremental diffing (only changed/added/removed layers are re-rendered). Coordinates use Leaflet `[lat, lng]` order. See [L.marker](https://leafletjs.com/reference.html#marker), [L.circle](https://leafletjs.com/reference.html#circle), [L.polygon](https://leafletjs.com/reference.html#polygon), [L.polyline](https://leafletjs.com/reference.html#polyline) for full options.",
      },
      bindingValidation: {
        type: "array",
        tooltip:
          "Array of layer descriptors. Example: `[{ id: 'a', type: 'marker', latlng: [48.85, 2.35], popup: 'Paris' }]`",
      },
      /* wwEditor:end */
    },

    geoJSON: {
      label: { en: "GeoJSON" },
      type: "Object",
      section: "settings",
      defaultValue: {},
      bindable: true,
      options: {
        item: {
          data: { label: { en: "Data (FeatureCollection)" }, type: "Object", bindable: true, options: { item: {} } },
          style: { label: { en: "Style" }, type: "Object", bindable: true, options: { item: {} } },
          pointToLayer: {
            label: { en: "Point to layer" },
            type: "TextSelect",
            options: {
              options: [
                { value: "marker", label: "Marker" },
                { value: "circleMarker", label: "Circle marker" },
              ],
            },
            bindable: true,
          },
          onEachFeature: {
            label: { en: "On each feature" },
            type: "TextSelect",
            options: {
              options: [
                { value: "bindPopup", label: "Bind popup" },
                { value: "bindTooltip", label: "Bind tooltip" },
              ],
            },
            bindable: true,
          },
          popupProperty: { label: { en: "Popup property key" }, type: "Text", defaultValue: "name", bindable: true },
          filter: { label: { en: "Filter" }, type: "Object", bindable: true, options: { item: {} } },
          swapCoords: { label: { en: "Swap coords [lng,lat] → [lat,lng]" }, type: "OnOff", defaultValue: false, bindable: true },
        },
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Renders a GeoJSON FeatureCollection (or single Feature) via [L.geoJSON](https://leafletjs.com/reference.html#geojson). Object shape:\n\n- `data`: FeatureCollection or Feature object (required)\n- `style`: static object applied to vector features — `{ color, weight, opacity, fillColor, fillOpacity }`\n- `pointToLayer`: `'marker'` or `'circleMarker'` (how Point geometries are rendered)\n- `onEachFeature`: `'bindPopup'` or `'bindTooltip'` (auto-binds the value of `popupProperty` from each feature's properties)\n- `popupProperty`: feature property key used by `bindPopup`/`bindTooltip` (default: `'name'`)\n- `filter`: `{ property, value, operator? }` — only render features matching this rule (operator: `'eq'` (default), `'neq'`, `'gt'`, `'lt'`)\n- `swapCoords`: `true` if the GeoJSON has standard `[lng, lat]` ordering and you want Leaflet to interpret it correctly (Leaflet supports GeoJSON natively, but use this if your data was inverted)\n\nSet to `null` or omit to disable GeoJSON rendering.",
      },
      bindingValidation: {
        type: "object",
        tooltip:
          "GeoJSON config. Example: `{ data: featureCollection, style: { color: 'red' }, onEachFeature: 'bindPopup', popupProperty: 'name' }`",
      },
      /* wwEditor:end */
    },

    controls: {
      label: { en: "Controls" },
      type: "Object",
      section: "settings",
      defaultValue: {
        zoom: { enabled: true, position: "topleft" },
        attribution: { enabled: true },
      },
      bindable: true,
      options: {
        item: {
          zoom: { label: { en: "Zoom" }, type: "Object", bindable: true, options: { item: {} } },
          attribution: { label: { en: "Attribution" }, type: "Object", bindable: true, options: { item: {} } },
          scale: { label: { en: "Scale" }, type: "Object", bindable: true, options: { item: {} } },
          layers: { label: { en: "Layers switcher" }, type: "Object", bindable: true, options: { item: {} } },
        },
      },
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "Native Leaflet controls. Object keys are control names, each value an object `{ enabled, position, ...specific }`.\n\n- `zoom`: `{ enabled, position }` — zoom +/- buttons. Position: `topleft|topright|bottomleft|bottomright`.\n- `attribution`: `{ enabled, prefix }` — attribution badge (legal in production for OSM).\n- `scale`: `{ enabled, position, metric, imperial, maxWidth }` — distance scale bar.\n- `layers`: `{ enabled, position, collapsed, baseLayers, overlays }` — base layer / overlay switcher. `baseLayers` and `overlays` are objects mapping label → layer descriptor (same shape as `layers[]` items, or `{ provider, url, options }` for tile layers).\n\nSee [L.control](https://leafletjs.com/reference.html#control).",
      },
      bindingValidation: {
        type: "object",
        tooltip:
          "Controls config. Example: `{ zoom: { enabled: true, position: 'topright' }, scale: { enabled: true, metric: true } }`",
      },
      /* wwEditor:end */
    },

    enableMarkerCluster: {
      label: { en: "Enable marker cluster" },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
      bindable: true,
      /* wwEditor:start */
      propertyHelp: {
        tooltip:
          "When ON, all markers (from `layers` and from `geoJSON` Point features) are wrapped in a [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) group. Recommended for >100 markers. Adds spiderfication, zoom-aware grouping, and animated transitions.",
      },
      /* wwEditor:end */
    },
  },
};
