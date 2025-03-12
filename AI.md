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

# OpenStreetMap Leaflet Component

## Component Purpose

A highly customizable map component based on Leaflet.js that supports various map features including markers, polygons, circles, rectangles, polylines, and GeoJSON layers. It's designed to handle both static and dynamic data with comprehensive styling options and tooltip support.

## Critical Configuration for Variable Binding

For the map to work correctly with variable binding, you must configure:

1. **Variable Binding Objects**: Each map element type (markers, circles, etc.) should be bound to a variable using this structure:

   ```json
   "markers": {
       "__wwtype": "f",
       "code": "variables['your-variable-id']",
       "defaultValue": []
   }
   ```

2. **Field Mapping Properties**: These tell the component which properties in your data objects contain the required information:
   ```json
   "markerDataField": "['data']",
   "markers_tooltipContentField": "['tooltipContent']",
   ```

### Understanding Field Mapping

The field mapping properties are crucial for the component to correctly interpret your data. For example:

- `markerDataField: "['data']"` means: "Look for the coordinates in a property called 'data' in each marker object"
- `circles_colorField: "['color']"` means: "Look for the circle stroke color in a property called 'color' in each circle object"

These mappings must match the structure of your data objects in the bound variables.

## Data Structure Requirements

For each map element type, your variable data must follow these structures:

### Markers

```javascript
[
  {
    data: [48.8566, 2.3522], // [latitude, longitude]
    customIcon: true,
    iconUrl: "path/to/icon.png",
    iconWidth: "32px",
    iconHeight: "32px",
    tooltip: true,
    tooltipContent: "Paris",
    tooltipDirection: "top",
    tooltipPermanent: false,
  },
  // More markers...
];
```

### Circles

```javascript
[
  {
    data: [48.8566, 2.3522], // [latitude, longitude] - center point
    radius: 5000, // radius in meters
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "5km Radius",
    tooltipDirection: "top",
    tooltipPermanent: false,
  },
  // More circles...
];
```

### Polygons

```javascript
[
  {
    data: [
      [37, -109.05],
      [41, -109.03],
      [41, -102.05],
      [37, -102.04],
    ],
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "Area",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
  // More polygons...
];
```

### Rectangles

```javascript
[
  {
    data: [
      [54.559322, -5.767822], // [latitude, longitude] - bottom left
      [56.1210604, -3.02124], // [latitude, longitude] - top right
    ],
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "Rectangle",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
  // More rectangles...
];
```

### Polylines

```javascript
[
  {
    data: [
      [45.51, -122.68],
      [37.77, -122.43],
      [34.04, -118.2],
    ],
    smoothFactor: 1.0,
    noClip: false,
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    tooltip: true,
    tooltipContent: "Path",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
  // More polylines...
];
```

### GeoJSON

```javascript
[
  {
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-122.42, 37.77],
          },
          properties: {
            name: "San Francisco",
          },
        },
        // More features...
      ],
    },
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "GeoJSON Feature",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
  // More GeoJSON objects...
];
```

## Properties

### Base Map Configuration

- `tileLayer`: `string` - Map tile provider name. Default: `"OpenStreetMap.Mapnik"`. See [available providers](https://leaflet-extras.github.io/leaflet-providers/preview/)
- `providerConfiguration`: `object` - Configuration for tile providers requiring registration. Default: `{}`
- `lat`: `string` - Initial latitude. Default: `"46.603354"`
- `lng`: `string` - Initial longitude. Default: `"1.888334"`
- `zoom`: `number` - Initial zoom level (0-20). Default: `4`
- `zoomControl`: `boolean` - Show zoom controls. Default: `true`
- `attributionControl`: `boolean` - Show attribution. Default: `true`

### Map Elements

#### Markers

```
markers: Array<{
  data: [number, number];
  customIcon: boolean;
  iconUrl: string;
  iconWidth: string;
  iconHeight: string;
  tooltip: boolean;
  tooltipContent: string;
  tooltipDirection: "auto" | "top" | "bottom" | "left" | "right";
  tooltipPermanent: boolean;
}>;
```

#### Circles

```
circles: Array<{
  data: [number, number];
  radius: number;
  stroke: boolean;
  color: string;
  weight: number;
  opacity: number;
  lineCap: "butt" | "round" | "square";
  lineJoin: "miter" | "round" | "bevel";
  dashArray: string | null;
  dashOffset: string | null;
  fill: boolean;
  fillColor: string;
  fillOpacity: number;
  fillRule: "nonzero" | "evenodd";
  tooltip: boolean;
  tooltipContent: string;
  tooltipDirection: string;
  tooltipPermanent: boolean;
}>;
```

#### Polygons

```
polygons: Array<{
  data: Array<[number, number]>;
  // Same style properties as circles
}>;
```

#### Rectangles

```
rectangles: Array<{
  data: [[number, number], [number, number]];
  // Same style properties as circles
}>;
```

#### Polylines

```
polylines: Array<{
  data: Array<[number, number]>;
  smoothFactor: number;
  noClip: boolean;
  // Same style properties as circles
}>;
```

#### GeoJSON

```
geoJSONs: Array<{
  data: GeoJSON;
  // Same style properties as circles
}>;
```

## Content Structure Example

Below is an example of how the component's content structure should look when properly configured with variable bindings:

```json
{
  "default": {
    // Base map configuration
    "lat": "46.603354",
    "lng": "1.888334",
    "zoom": 7,
    "tileLayer": "OpenStreetMap.Mapnik",
    "zoomControl": true,
    "attributionControl": true,
    "providerConfiguration": "{}",

    // Map elements bound to variables
    "markers": {
      "__wwtype": "f",
      "code": "variables['b0bf44f7-f0a4-44b0-abe9-a65019b80c0a']",
      "defaultValue": []
    },
    "circles": {
      "__wwtype": "f",
      "code": "variables['89d75e62-d069-4861-b08d-17a46b96ec33']",
      "defaultValue": []
    },
    "polygons": {
      "__wwtype": "f",
      "code": "variables['744ef1e5-114a-4a84-a1d3-154bac30dd76']",
      "defaultValue": []
    },
    "rectangles": {
      "__wwtype": "f",
      "code": "variables['ee579c7e-7198-4cda-a07f-40dc0866069f']",
      "defaultValue": []
    },
    "polylines": {
      "__wwtype": "f",
      "code": "variables['481d5a42-50d5-44a1-a3fe-8e2f3a46ae98']",
      "defaultValue": []
    },
    "geoJSONs": {
      "__wwtype": "f",
      "code": "formulas['69269f44-66c1-4ff8-b91d-835c6a1eab9d']()",
      "defaultValue": []
    },

    // Data field mappings - these tell the component which properties in your data objects contain the required information
    "markerDataField": "['data']",
    "circleDataField": "['data']",
    "circleRadiusField": "['radius']",
    "polygonDataField": "['data']",
    "rectangleDataField": "['data']",
    "polylineDataField": "['data']",
    "geoJSONsDataField": "['data']",

    // Style field mappings for circles
    "circles_strokeField": "['stroke']",
    "circles_colorField": "['color']",
    "circles_weightField": "['weight']",
    "circles_opacityField": "['opacity']",
    "circles_fillField": "['fill']",
    "circles_fillColorField": "['fillColor']",
    "circles_fillOpacityField": "['fillOpacity']",
    "circles_tooltipContentField": "['tooltipContent']",
    "circles_tooltipDirectionField": "['tooltipDirection']",
    "circles_tooltipPermanentField": "['tooltipPermanent']",

    // Style field mappings for polygons
    "polygons_strokeField": "['stroke']",
    "polygons_colorField": "['color']",
    "polygons_weightField": "['weight']",
    "polygons_opacityField": "['opacity']",
    "polygons_fillField": "['fill']",
    "polygons_fillColorField": "['fillColor']",
    "polygons_fillOpacityField": "['fillOpacity']",
    "polygons_tooltipContentField": "['tooltipContent']",
    "polygons_tooltipDirectionField": "['tooltipDirection']",
    "polygons_tooltipPermanentField": "['tooltipPermanent']"

    // Similar style mappings for other shape types
    // ...
  }
}
```

### ⚠️ CRITICAL: All Field Mappings Must Be Configured

**IMPORTANT:** You MUST configure ALL the field mappings shown above for each map element type you're using. If any mapping is missing, your map elements will not display correctly or may not appear at all.

For example, if you're using circles, you must include:

- `circleDataField`
- `circleRadiusField`
- `circles_strokeField`
- `circles_colorField`
- `circles_weightField`
- `circles_opacityField`
- `circles_fillField`
- `circles_fillColorField`
- `circles_fillOpacityField`
- `circles_tooltipContentField`
- `circles_tooltipDirectionField`
- `circles_tooltipPermanentField`

Even if you don't need tooltips, you must still include the tooltip field mappings. The same applies to all other map element types.

Additionally, your data objects in the bound variables must include ALL the corresponding properties. Missing properties will cause elements to fail to render.

## ⚠️ CRITICAL: Required Properties for Map Elements

**IMPORTANT:** For map elements to display correctly, you MUST include ALL required properties in your data objects. If any of these properties are missing, the map elements may not appear at all.

For all vector elements (circles, polygons, rectangles, polylines, geoJSONs):

- `[element]_DataField`: Coordinates array or geoJSONs object (required)
- `[element]_strokeField`: Boolean to enable stroke (required, set to `true`)
- `[element]_colorField`: Stroke color (required, e.g., "#3388ff")
- `[element]_weightField`: Stroke width (required, e.g., 3)
- `[element]_opacityField`: Stroke opacity (required, e.g., 1)
- `[element]_fillField`: Boolean to enable fill (required, set to `true`)
- `[element]_fillColorField`: Fill color (required, e.g., "#3388ff")
- `[element]_fillOpacityField`: Fill opacity (required, e.g., 0.5)

For tooltips:

- `[element]_tooltipContentField`: Content to display (required, e.g., "My tooltip")
- `[element]_tooltipDirectionField`: Direction to display (required, e.g., "auto")
- `[element]_tooltipPermanentField`: Boolean to make permanent (required, set to `true` or `false`)

For markers with custom icons:

- `customIcon`: Boolean to enable custom icon (if custom icon in the data, set to `true`)
- `iconUrl`: URL to icon image (if custom icon in the data)
- `iconWidth`: Width of icon (requiif custom icon in the datared, e.g., "32px")
- `iconHeight`: Height of icon (if custom icon in the data, e.g., "32px")

**Even if you don't need certain features** (like tooltips), you must still include the properties with appropriate values (e.g., `tooltip: false`). Omitting these properties entirely can cause the map elements to fail to render.

## Special Features

- Support for multiple map tile providers
- Custom marker icons with size configuration
- Various vector layer types (circles, polygons, rectangles, polylines)
- GeoJSON support for complex geographical data
- Comprehensive styling options for all layer types
- Tooltip support for all layers with customizable position and behavior
- Responsive design
- Zoom and attribution controls
- Support for both static and dynamic (bound) data

## Best Practices

- Always provide valid coordinates (latitude between -90 and 90, longitude between -180 and 180)
- Use appropriate zoom levels based on your use case (0 for world view, 18+ for building details)
- Consider using tooltips to provide additional information about map features
- When using custom marker icons, ensure proper image dimensions for optimal display
- For large GeoJSON datasets, consider data optimization techniques
- Use appropriate color and opacity values for overlapping layers
- Test the map at different zoom levels and viewport sizes
- When using dynamic binding, ensure your field mappings are correctly set to match your data structure
- For complex data structures, prefer dynamic binding with field mapping over static configuration
- Remember that latitude comes first [lat, lng] in this component's data format, while GeoJSON uses [lng, lat] order

## Technical Notes

- All geometry types support data binding for dynamic updates
- Vector layers (circles, polygons, rectangles, polylines) share common styling properties
- GeoJSON data must follow the GeoJSON specification
- Custom marker icons support both local and remote URLs
- Tooltip direction can be auto-calculated or explicitly set
- Provider configuration is required for some tile providers
- The component is fully responsive and will adjust to container size changes
- For large datasets, consider loading data incrementally or using clustering techniques
