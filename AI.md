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

## Implementation Approaches

The component supports two distinct approaches for configuring map elements:

### Static Configuration

In this approach, you manually configure each map element individually through the editor interface. This is suitable for:

- Maps with a fixed, predetermined set of elements
- Simple implementations with few elements
- Cases where elements rarely change

For static configuration, you would:

1. Add an item to the relevant property array (e.g., Markers, Polygons)
2. Configure its data points manually
3. Set styling options individually (stroke, color, weight, etc.)
4. Configure tooltip content if desired

### Dynamic Data Binding

This more powerful approach allows binding an entire array of data to populate map elements. Instead of configuring each element individually, you:

1. Bind the entire property (e.g., Polygons) to a data array
2. Use ObjectPropertyPath properties to map your data structure to component properties

When binding data dynamically, you use special mapping properties to tell the component how to interpret your data structure:

- `[propertyName]DataField`: Maps to the coordinates data for the element
- `[propertyName]_strokeField`: Maps to the stroke visibility property
- `[propertyName]_colorField`: Maps to the stroke color property
- `[propertyName]_weightField`: Maps to the stroke weight property
- `[propertyName]_opacityField`: Maps to the stroke opacity property
- `[propertyName]_fillField`: Maps to the fill visibility property
- `[propertyName]_fillColorField`: Maps to the fill color property
- `[propertyName]_fillOpacityField`: Maps to the fill opacity property
- `[propertyName]_tooltipContentField`: Maps to the tooltip content
- `[propertyName]_tooltipDirectionField`: Maps to the tooltip direction
- `[propertyName]_tooltipPermanentField`: Maps to the tooltip permanence setting

For example, with a polygon data array like:

```
[
  {
    id: 1,
    name: "Region A",
    boundary: [
      [37.5, -109.5],
      [40.5, -109.5],
      [40.5, -102.5],
      [37.5, -102.5],
    ],
    regionColor: "#FF5500",
    regionOpacity: 0.3,
    details: "Important industrial area",
  },
  // More regions...
];
```

You would set:

- `polygonDataField` to "boundary"
- `polygons_colorField` to "regionColor"
- `polygons_fillColorField` to "regionColor"
- `polygons_fillOpacityField` to "regionOpacity"
- `polygons_tooltipContentField` to "details"

The component automatically resolves these property paths for each item in your bound array, creating map elements dynamically.

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

## Data Binding Examples

For each type of map element, here's how the data should be structured when binding:

### Markers

```
const markersData = [
  {
    data: [48.8566, 2.3522], // [latitude, longitude]
    customIcon: true, // optional
    iconUrl: "path/to/icon.png", // required if customIcon is true
    iconWidth: "32px", // optional
    iconHeight: "32px", // optional
    tooltip: true, // optional
    tooltipContent: "Paris", // optional
    tooltipDirection: "top", // optional: "auto", "top", "bottom", "left", "right"
    tooltipPermanent: false, // optional
  },
];
```

### Circles

```
const circlesData = [
  {
    data: [48.8566, 2.3522], // [latitude, longitude] - center point
    radius: 5000, // radius in meters
    stroke: true, // optional
    color: "#3388ff", // optional
    weight: 3, // optional
    opacity: 1, // optional
    lineCap: "round", // optional: "butt", "round", "square"
    lineJoin: "round", // optional: "miter", "round", "bevel"
    dashArray: null, // optional
    dashOffset: null, // optional
    fill: true, // optional
    fillColor: "#3388ff", // optional
    fillOpacity: 0.2, // optional
    fillRule: "evenodd", // optional: "nonzero", "evenodd"
    tooltip: true, // optional
    tooltipContent: "5km Radius", // optional
    tooltipDirection: "top", // optional
    tooltipPermanent: false, // optional
  },
];
```

### Polygons

```
const polygonsData = [
  {
    data: [
      // Array of [latitude, longitude] points
      [37, -109.05],
      [41, -109.03],
      [41, -102.05],
      [37, -102.04],
    ],
    // Same style options as circles
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "Area",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

### Rectangles

```
const rectanglesData = [
  {
    data: [
      // Array of 2 points: [bottomLeft, topRight]
      [54.559322, -5.767822], // [latitude, longitude] - bottom left
      [56.1210604, -3.02124], // [latitude, longitude] - top right
    ],
    // Same style options as circles and polygons
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "Rectangle",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

### Polylines

```
const polylinesData = [
  {
    data: [
      // Array of [latitude, longitude] points
      [45.51, -122.68],
      [37.77, -122.43],
      [34.04, -118.2],
    ],
    smoothFactor: 1.0, // optional: how much to simplify the polyline
    noClip: false, // optional: disable polyline clipping
    // Same style options as other shapes
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    tooltip: true,
    tooltipContent: "Path",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

### GeoJSON

```
const geoJSONsData = [
  {
    data: {
      // Valid GeoJSON object
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
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-74.006, 40.7128],
          },
          properties: {
            name: "New York",
          },
        },
      ],
    },
    // Same style options as other shapes
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    tooltip: true,
    tooltipContent: "GeoJSON Feature",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

## Dynamic Binding Example Using ObjectPropertyPath

When using dynamic binding with a data source that has a different structure than the component expects, you can use ObjectPropertyPath properties to map your data:

```
// Your data source
const myRegionsData = [
  {
    regionName: "District A",
    geoCoordinates: [
      [37, -109.05],
      [41, -109.03],
      [41, -102.05],
      [37, -102.04],
    ],
    regionStyleInfo: {
      borderColor: "#FF5500",
      fillShade: "#FF7722",
      transparency: 0.4,
    },
    showInfo: true,
    regionDescription: "Economic center with 5 million residents",
  },
  // More regions...
];

// ObjectPropertyPath mapping configuration
// polygonDataField: "geoCoordinates"
// polygons_colorField: "regionStyleInfo.borderColor"
// polygons_fillColorField: "regionStyleInfo.fillShade"
// polygons_fillOpacityField: "regionStyleInfo.transparency"
// polygons_tooltipContentField: "regionDescription"
// polygons_tooltipPermanentField: "showInfo"
```

## Best Practices

- Always provide valid coordinates (latitude between -90 and 90, longitude between -180 and 180)
- Use appropriate zoom levels based on your use case (0 for world view, 18+ for building details)
- Consider using tooltips to provide additional information about map features
- When using custom marker icons, ensure proper image dimensions for optimal display
- For large GeoJSON datasets, consider data optimization techniques
- Use appropriate color and opacity values for overlapping layers
- Test the map at different zoom levels and viewport sizes
- When using dynamic binding, ensure your ObjectPropertyPath mappings are correctly set to match your data structure
- For complex data structures, prefer dynamic binding with ObjectPropertyPath mapping over static configuration
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
