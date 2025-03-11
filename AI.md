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

## Content Structure Example

Below is an example of how the component's content structure should look when properly configured:

```json
{
    "default": {
        "lat": "46.603354",
        "lng": "1.888334",
        "zoom": 7,
        "tileLayer": "OpenStreetMap.Mapnik",
        "zoomControl": true,
        "attributionControl": true,
        "providerConfiguration": "{}",

        // Map elements arrays (can be bound to variables)
        "markers": [...],
        "circles": [...],
        "polygons": [...],
        "rectangles": [...],
        "polylines": [...],
        "geoJSONs": [...],

        // Data field mappings for dynamic binding
        "markerDataField": "['data']",
        "circleDataField": "['data']",
        "polygonDataField": "['data']",
        "rectangleDataField": "['data']",
        "polylineDataField": "['data']",
        "geoJSONsDataField": "['data']",

        // Style field mappings
        "circles_strokeField": "['stroke']",
        "circles_colorField": "['color']",
        "circles_weightField": "['weight']",
        "circles_opacityField": "['opacity']",
        "circles_fillField": "['fill']",
        "circles_fillColorField": "['fillColor']",
        "circles_fillOpacityField": "['fillOpacity']",

        // Similar style mappings for other shape types
        "polygons_strokeField": "['stroke']",
        "polygons_colorField": "['color']",
        // ...

        // Tooltip field mappings
        "circles_tooltipContentField": "['tooltipContent']",
        "circles_tooltipDirectionField": "['tooltipDirection']",
        "circles_tooltipPermanentField": "['tooltipPermanent']",
        // Similar tooltip mappings for other shape types
    }
}
```

When generating content for this component, ensure that:

1. Base map properties (`lat`, `lng`, `zoom`, `tileLayer`) are properly set
2. Map element arrays follow the structure defined in the Properties section
3. Data field mappings use the correct property path syntax (e.g., `"['data']"`)
4. Style and tooltip field mappings are correctly configured for each shape type
5. When using bound data, the field mappings must correspond to the actual structure of your data

### Field Mapping Syntax

Note the specific syntax used for field mappings:

- Simple property access: `"['propertyName']"`
- Nested property access: `"['parent']['child']"` or `"['parent.child']"`
- For GeoJSON and complex data structures, ensure the paths correctly point to the required properties

### GeoJSON Data Structure Example

Here's a detailed example of how GeoJSON data should be structured in the component:

```json
"geoJSONs": [
    {
        "data": {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [2.3522, 48.8566]
                    },
                    "properties": {
                        "name": "Île-de-France",
                        "description": "The region surrounding Paris, known for its rich history and culture."
                    }
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [1.4442, 43.6045],
                                [1.4460, 43.6050],
                                [1.4480, 43.6060],
                                [1.4500, 43.6070],
                                [1.4521, 43.6108],
                                [1.4540, 43.6090],
                                [1.4560, 43.6080],
                                [1.4580, 43.6070],
                                [1.4600, 43.6045],
                                [1.4580, 43.6030],
                                [1.4560, 43.6020],
                                [1.4540, 43.6010],
                                [1.4442, 43.6045]
                            ]
                        ]
                    },
                    "properties": {
                        "name": "Occitanie",
                        "description": "A region in southern France known for its medieval cities and Mediterranean beaches."
                    }
                }
            ]
        },
        "fill": true,
        "color": "#F06F5C",
        "stroke": true,
        "weight": 3,
        "opacity": 1,
        "lineCap": "round",
        "lineJoin": "round",
        "dashArray": null,
        "dashOffset": null,
        "fillColor": "#F45252",
        "fillOpacity": 0.2,
        "fillRule": "evenodd",
        "tooltip": true,
        "tooltipContent": "<b>Hello world!</b><br>I am a tooltip",
        "tooltipDirection": "auto",
        "tooltipPermanent": false
    }
]
```

Important notes about GeoJSON:

1. The GeoJSON format follows the [GeoJSON specification](https://geojson.org/)
2. GeoJSON uses `[longitude, latitude]` coordinate order (opposite of Leaflet's default)
3. Each feature can have its own properties that can be used for tooltips or styling
4. The component applies the style properties (color, weight, etc.) to all features in the GeoJSON
5. For feature-specific styling, you would need to use multiple GeoJSON objects or implement custom styling logic

### Variable and Formula Binding

The component supports binding map elements to variables and formulas. Here's how the binding structure looks in the content:

```json
{
    "default": {
        "circles": {
            "__wwtype": "f",
            "defaultValue": [],
            "code": "variables['89d75e62-d069-4861-b08d-17a46b96ec33']"
        },
        "markers": {
            "__wwtype": "f",
            "defaultValue": [],
            "code": "variables['b0bf44f7-f0a4-44b0-abe9-a65019b80c0a']"
        },
        "geoJSONs": {
            "__wwtype": "f",
            "defaultValue": [...],  // Can include default GeoJSON data
            "code": "formulas['69269f44-66c1-4ff8-b91d-835c6a1eab9d']()"
        }
    }
}
```

When binding map elements:

1. Use `__wwtype: "f"` to indicate a binding
2. Provide a `defaultValue` array that will be used if the binding returns null or is unavailable
3. Use `code` to specify the binding source:
   - `variables['variable-id']` for binding to a variable
   - `formulas['formula-id']()` for binding to a formula

This allows for dynamic map data that can be updated through variables or calculated through formulas. When combined with the field mapping properties, you can create highly dynamic maps that respond to user interactions or data changes.

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

## Troubleshooting Content Structure Issues

When working with this component, you might encounter these common issues related to content structure:

### Map Elements Not Displaying

If map elements (markers, circles, etc.) are not displaying:

1. **Check Data Format**: Ensure coordinates are in the correct format:

   - Most Leaflet elements use `[latitude, longitude]` order
   - GeoJSON uses `[longitude, latitude]` order
   - Verify that coordinates are valid numbers within range

2. **Verify Field Mappings**: If using dynamic binding:

   - Confirm that field mappings (e.g., `markerDataField`) correctly point to your data
   - Check the syntax of property paths (e.g., `"['data']"`)
   - Ensure bound variables or formulas are returning the expected data structure

3. **Inspect Bound Data**: If binding to variables or formulas:
   - Verify the variable or formula exists and returns data
   - Check that the returned data matches the expected structure
   - Ensure defaultValue is properly formatted as a fallback

### Styling Issues

If map elements appear but with incorrect styling:

1. **Check Style Field Mappings**: Verify that style field mappings (e.g., `circles_colorField`) correctly point to your style properties
2. **Inspect Style Values**: Ensure color values are valid CSS colors (hex, rgb, etc.)
3. **Check Numeric Properties**: Properties like weight, opacity, and radius should be numbers

### Tooltip Issues

If tooltips are not appearing or displaying incorrectly:

1. **Verify Tooltip Content**: Check that tooltipContent is a non-empty string
2. **Check Tooltip Field Mappings**: Ensure tooltip field mappings point to the correct properties
3. **Tooltip Settings**: Verify tooltipDirection is one of: "auto", "top", "bottom", "left", "right"

### GeoJSON-Specific Issues

Common issues with GeoJSON data:

1. **Invalid GeoJSON Structure**: Ensure your GeoJSON follows the specification
2. **Coordinate Order**: Remember GeoJSON uses `[longitude, latitude]` order
3. **Feature Properties**: If using properties for tooltips, ensure they exist in your GeoJSON
4. **Complex GeoJSON**: For large or complex GeoJSON, consider simplifying geometries

By addressing these common issues, you can ensure your map displays correctly with the proper content structure.
