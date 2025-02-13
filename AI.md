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
   None

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
      "weight": 3
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
