---
name: ww-openstreetmap-leaflet
description: A versatile OpenStreetMap component based on Leaflet.js, supporting various map features including markers, polygons, circles, rectangles, polylines, and GeoJSON layers with customizable styles and tooltips.
keywords:
  - map
  - openstreetmap
  - leaflet
  - geolocation
  - markers
  - polygons
  - geojson
---

#### ww-openstreetmap-leaflet

1. **Component Purpose:**
   A highly customizable map component based on Leaflet.js that supports various map features including markers, polygons, circles, rectangles, polylines, and GeoJSON layers. It's designed to handle both static and dynamic data with comprehensive styling options and tooltip support.

2. **Properties:**

   - `tileLayer`: `string` - Map tile provider name. Default: `"OpenStreetMap.Mapnik"`. See [available providers](https://leaflet-extras.github.io/leaflet-providers/preview/)
   - `providerConfiguration`: `object` - Configuration for tile providers requiring registration. Default: `{}`
   - `lat`: `string` - Initial latitude. Default: `"46.603354"`
   - `lng`: `string` - Initial longitude. Default: `"1.888334"`
   - `zoom`: `number` - Initial zoom level (0-20). Default: `4`
   - `zoomControl`: `boolean` - Show zoom controls. Default: `true`
   - `attributionControl`: `boolean` - Show attribution. Default: `true`
   - `scaleControl`: `boolean` - Show scale control. Default: `false`
   - `fullscreenControl`: `boolean` - Show fullscreen control. Default: `false`
   - `layerControl`: `boolean` - Show layer control for multiple layers. Default: `false`
   - `locationControl`: `boolean` - Show current location control. Default: `false`
   - `clusterMarkers`: `boolean` - Enable marker clustering. Default: `false`
   - `clusterRadius`: `number` - Radius for clustering markers. Default: `80`
   - `draggableMarkers`: `boolean` - Allow markers to be dragged. Default: `false`
   - `editableShapes`: `boolean` - Allow shapes to be edited. Default: `false`
   - `drawingTools`: `boolean` - Show drawing tools for shapes. Default: `false`

   **Markers:**

   - `markers`: `Array<{
  data: [number, number],
  customIcon: boolean,
  iconUrl: string,
  iconWidth: string,
  iconHeight: string,
  tooltip: boolean,
  tooltipContent: string,
  tooltipDirection: "auto" | "top" | "bottom" | "left" | "right",
  tooltipPermanent: boolean
}>`

   **Circles:**

   - `circles`: `Array<{
  data: [number, number],
  radius: number,
  stroke: boolean,
  color: string,
  weight: number,
  opacity: number,
  lineCap: "butt" | "round" | "square",
  lineJoin: "miter" | "round" | "bevel",
  dashArray: string | null,
  dashOffset: string | null,
  fill: boolean,
  fillColor: string,
  fillOpacity: number,
  fillRule: "nonzero" | "evenodd",
  tooltip: boolean,
  tooltipContent: string,
  tooltipDirection: string,
  tooltipPermanent: boolean
}>`

   **Polygons:**

   - `polygons`: `Array<{
  data: Array<[number, number]>,
  ...same style properties as circles
}>`

   **Rectangles:**

   - `rectangles`: `Array<{
  data: [[number, number], [number, number]],
  ...same style properties as circles
}>`

   **Polylines:**

   - `polylines`: `Array<{
  data: Array<[number, number]>,
  smoothFactor: number,
  noClip: boolean,
  ...same style properties as circles
}>`

   **GeoJSON:**

   - `geoJSONs`: `Array<{
  data: GeoJSON,
  ...same style properties as circles
}>`

3. **Children Components:**
   None

4. **Special Features:**

   - Support for multiple map tile providers
   - Custom marker icons with size configuration
   - Various vector layer types (circles, polygons, rectangles, polylines)
   - GeoJSON support for complex geographical data
   - Comprehensive styling options for all layer types
   - Tooltip support for all layers with customizable position and behavior
   - Responsive design
   - Zoom and attribution controls
   - Support for both static and dynamic (bound) data

5. **Events:**

   **Map Events:**

   - `map:click` - Triggered when clicking the map. Payload: `{ latlng: [number, number], originalEvent: Event }`
   - `map:zoom` - Triggered when zoom level changes. Payload: `{ zoom: number }`
   - `map:move` - Triggered when map position changes. Payload: `{ center: [number, number], bounds: [[number, number], [number, number]] }`
   - `map:bounds` - Triggered when map bounds change. Payload: `{ bounds: [[number, number], [number, number]] }`

   **Marker Events:**

   - `marker:click` - Triggered when clicking a marker. Payload: `{ marker: Object, latlng: [number, number], originalEvent: Event }`
   - `marker:dragstart` - Triggered when marker drag starts. Payload: `{ marker: Object, latlng: [number, number] }`
   - `marker:drag` - Triggered during marker drag. Payload: `{ marker: Object, latlng: [number, number] }`
   - `marker:dragend` - Triggered when marker drag ends. Payload: `{ marker: Object, latlng: [number, number] }`

   **Shape Events:**

   - `shape:click` - Triggered when clicking a shape. Payload: `{ type: 'circle'|'polygon'|'rectangle'|'polyline', shape: Object, latlng: [number, number] }`
   - `shape:edit` - Triggered when shape is edited. Payload: `{ type: string, shape: Object, latlng: Array<[number, number]> }`
   - `shape:delete` - Triggered when shape is deleted. Payload: `{ type: string, shape: Object }`

   **Drawing Events:**

   - `draw:start` - Triggered when drawing starts. Payload: `{ type: string }`
   - `draw:end` - Triggered when drawing ends. Payload: `{ type: string, shape: Object }`

   **Cluster Events:**

   - `cluster:click` - Triggered when clicking a cluster. Payload: `{ cluster: Object, markers: Array<Object> }`

6. **Notes:**

- All geometry types support data binding for dynamic updates
- Vector layers (circles, polygons, rectangles, polylines) share common styling properties
- GeoJSON data must follow the GeoJSON specification
- Custom marker icons support both local and remote URLs
- Tooltip direction can be auto-calculated or explicitly set
- Provider configuration is required for some tile providers

7. **Example:**

```json
{
  "tileLayer": "OpenStreetMap.Mapnik",
  "lat": "48.8566",
  "lng": "2.3522",
  "zoom": 13,
  "markers": [
    {
      "data": [48.8566, 2.3522],
      "customIcon": true,
      "iconUrl": "https://example.com/marker.png",
      "iconWidth": "32px",
      "iconHeight": "32px",
      "tooltip": true,
      "tooltipContent": "Welcome to Paris!",
      "tooltipDirection": "top",
      "tooltipPermanent": false
    }
  ],
  "circles": [
    {
      "data": [48.8566, 2.3522],
      "radius": 1000,
      "color": "#3388ff",
      "fillColor": "#3388ff",
      "fillOpacity": 0.2,
      "weight": 3,
      "tooltip": true,
      "tooltipContent": "1km radius around Paris",
      "tooltipDirection": "auto",
      "tooltipPermanent": false
    }
  ],
  "polygons": [
    {
      "data": [
        [48.8566, 2.3522],
        [48.8766, 2.3522],
        [48.8766, 2.3722],
        [48.8566, 2.3722]
      ],
      "color": "#ff3388",
      "fillColor": "#ff3388",
      "fillOpacity": 0.2,
      "weight": 2,
      "tooltip": true,
      "tooltipContent": "Paris District",
      "tooltipDirection": "auto"
    }
  ],
  "rectangles": [
    {
      "data": [
        [48.8566, 2.3522],
        [48.8766, 2.3722]
      ],
      "color": "#88ff33",
      "fillColor": "#88ff33",
      "fillOpacity": 0.2,
      "weight": 2
    }
  ],
  "polylines": [
    {
      "data": [
        [48.8566, 2.3522],
        [48.8766, 2.3522],
        [48.8766, 2.3722]
      ],
      "color": "#8833ff",
      "weight": 3,
      "smoothFactor": 1.0,
      "noClip": false
    }
  ],
  "geoJSONs": [
    {
      "data": {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "name": "Paris Center"
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [2.3522, 48.8566],
                  [2.3722, 48.8566],
                  [2.3722, 48.8766],
                  [2.3522, 48.8766],
                  [2.3522, 48.8566]
                ]
              ]
            }
          }
        ]
      },
      "color": "#ff8833",
      "fillColor": "#ff8833",
      "fillOpacity": 0.2,
      "weight": 2
    }
  ]
}
```

8. **Best Practices:**

- Always provide valid coordinates (latitude between -90 and 90, longitude between -180 and 180)
- Use appropriate zoom levels based on your use case (0 for world view, 18+ for building details)
- Consider using tooltips to provide additional information about map features
- When using custom marker icons, ensure proper image dimensions for optimal display
- For large GeoJSON datasets, consider data optimization techniques
- Use appropriate color and opacity values for overlapping layers
- Test the map at different zoom levels and viewport sizes
- Use marker clustering when displaying large numbers of markers (>100) for better performance
- Enable shape editing only when necessary as it can impact performance
- Consider using the scale control when distance measurement is important
- Use the layer control when working with multiple tile layers or overlays
- Enable location control for mobile-focused applications
- Implement proper event handling for interactive features
- Consider adding loading states for asynchronous operations
- Implement error handling for tile loading and geolocation failures
