---
name: ww-openstreetmap-leaflet
description: An OpenStreetMap component based on Leaflet.js, supporting map features including markers, circles, and polygons with customizable styles and tooltips.
keywords:
  - map
  - openstreetmap
  - leaflet
  - geolocation
  - markers
  - circles
  - polygons
---

# OpenStreetMap Leaflet Component

## Component Overview

A map component based on Leaflet.js that enables displaying interactive maps with markers, circles, and polygons. Key features include:

- Interactive OpenStreetMap maps with various tile providers
- Custom markers with optional custom icons
- Circles with customizable radius and styling
- Polygons with customizable styling
- Tooltip support for all map elements
- Comprehensive styling options for all features
- Responsive design that adapts to container size
- Support for both static and variable-bound data

## Configuration Basics

### Base Map Configuration

| Property                | Type    | Description                                        | Default                  |
| ----------------------- | ------- | -------------------------------------------------- | ------------------------ |
| `tileLayer`             | string  | Map tile provider name                             | `"OpenStreetMap.Mapnik"` |
| `providerConfiguration` | object  | Configuration for providers requiring registration | `{}`                     |
| `lat`                   | string  | Initial latitude                                   | `"46.603354"`            |
| `lng`                   | string  | Initial longitude                                  | `"1.888334"`             |
| `zoom`                  | number  | Initial zoom level (0-20)                          | `4`                      |
| `zoomControl`           | boolean | Show zoom controls                                 | `true`                   |
| `attributionControl`    | boolean | Show attribution                                   | `true`                   |

For available tile providers, see [Leaflet providers preview](https://leaflet-extras.github.io/leaflet-providers/preview/).

## Variable Binding Setup

To use dynamic data with this component, follow these two critical steps:

### 1. Create Variable Bindings

Bind each map element type to a variable with this structure:

```json
"markers": {
    "__wwtype": "f",
    "code": "variables['your-variable-id']",
    "defaultValue": []
}
```

### 2. Configure Field Mappings

Field mappings tell the component where to find specific properties in your data:

```json
"markerDataField": "['data']",
"circles_colorField": "['color']",
"polygonDataField": "['data']"
```

This means:

- Look for coordinates in a property called `data` in each marker object
- Look for circle stroke color in a property called `color` in each circle object
- Look for polygon coordinates in a property called `data` in each polygon object

## ⚠️ CRITICAL: Variable Data Structure Requirements

**THE MOST IMPORTANT ASPECT OF THIS COMPONENT:** Your variables MUST contain data formatted EXACTLY as shown in the examples below. This connection between field mappings and data structure is absolutely critical:

1. The component uses field mappings (like `markerDataField: "['data']"`) to look for specific properties in your variable data
2. Your variable data MUST include ALL properties that correspond to ALL field mappings
3. The property names must EXACTLY match what is specified in the field mappings
4. Missing properties or mismatched names will cause the component to silently fail with NO error messages

The examples below show the EXACT format required for:

- Marker variable data (required for all markers to display correctly)
- Circle variable data (required for all circles to display correctly)
- Polygon variable data (required for all polygons to display correctly)

**COPY THESE EXAMPLES EXACTLY** and only change the specific values (coordinates, colors, etc.) while keeping all property names and structure identical.

## Complete Implementation Example

Below is a comprehensive example showing both component configuration and the matching data structure:

### Component Configuration

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
      "code": "variables['c3e7a2d8-f5b1-42e9-9a83-87c6149b31c9']",
      "defaultValue": []
    },

    // === MARKERS FIELD MAPPINGS ===
    // Data field mapping
    "markerDataField": "['data']",
    // Icon field mappings
    "markerIconUrlField": "['iconUrl']",
    "markerIconWidthField": "['iconWidth']",
    "markerIconHeightField": "['iconHeight']",
    // Tooltip field mappings
    "markers_tooltipContentField": "['tooltipContent']",
    "markers_tooltipDirectionField": "['tooltipDirection']",
    "markers_tooltipPermanentField": "['tooltipPermanent']",

    // === CIRCLES FIELD MAPPINGS ===
    // Data and radius field mappings
    "circleDataField": "['data']",
    "circleRadiusField": "['radius']",
    // Style field mappings
    "circles_strokeField": "['stroke']",
    "circles_colorField": "['color']",
    "circles_weightField": "['weight']",
    "circles_opacityField": "['opacity']",
    "circles_lineCapField": "['lineCap']",
    "circles_lineJoinField": "['lineJoin']",
    "circles_dashArrayField": "['dashArray']",
    "circles_dashOffsetField": "['dashOffset']",
    "circles_fillField": "['fill']",
    "circles_fillColorField": "['fillColor']",
    "circles_fillOpacityField": "['fillOpacity']",
    "circles_fillRuleField": "['fillRule']",
    // Tooltip field mappings
    "circles_tooltipContentField": "['tooltipContent']",
    "circles_tooltipDirectionField": "['tooltipDirection']",
    "circles_tooltipPermanentField": "['tooltipPermanent']",

    // === POLYGONS FIELD MAPPINGS ===
    // Data field mapping
    "polygonDataField": "['data']",
    // Style field mappings
    "polygons_strokeField": "['stroke']",
    "polygons_colorField": "['color']",
    "polygons_weightField": "['weight']",
    "polygons_opacityField": "['opacity']",
    "polygons_lineCapField": "['lineCap']",
    "polygons_lineJoinField": "['lineJoin']",
    "polygons_dashArrayField": "['dashArray']",
    "polygons_dashOffsetField": "['dashOffset']",
    "polygons_fillField": "['fill']",
    "polygons_fillColorField": "['fillColor']",
    "polygons_fillOpacityField": "['fillOpacity']",
    "polygons_fillRuleField": "['fillRule']",
    // Tooltip field mappings
    "polygons_tooltipContentField": "['tooltipContent']",
    "polygons_tooltipDirectionField": "['tooltipDirection']",
    "polygons_tooltipPermanentField": "['tooltipPermanent']"
  }
}
```

### ⚠️ CRITICAL: Variable Data Format Requirements

**EXTREMELY IMPORTANT:** The variable data referenced in the configuration above MUST EXACTLY match the format shown in the examples below. For instance:

- The variable `variables['b0bf44f7-f0a4-44b0-abe9-a65019b80c0a']` (markers) MUST contain an array of objects with ALL the properties shown in the Markers Variable Example below.
- The variable `variables['89d75e62-d069-4861-b08d-17a46b96ec33']` (circles) MUST contain an array of objects with ALL the properties shown in the Circles Variable Example below.
- The variable `variables['c3e7a2d8-f5b1-42e9-9a83-87c6149b31c9']` (polygons) MUST contain an array of objects with ALL the properties shown in the Polygons Variable Example below.

If the data in your variables does not exactly match these formats, with all required properties and correct property names, **the component will silently fail to render the map elements without any error messages**. This mapping between the variable binding and the data format is PRIMORDIAL for the component to function correctly.

### Required Data Structure

Your variables must contain data with properties that exactly match your field mappings. Below are comprehensive examples including ALL required properties:

#### Markers Variable Example

```javascript
[
  {
    // Required for markerDataField
    data: [48.8566, 2.3522], // [latitude, longitude]

    // Required for custom icon field mappings
    customIcon: true,
    iconUrl: "https://example.com/marker-icon.png",
    iconWidth: "32px",
    iconHeight: "32px",

    // Required for tooltip field mappings
    tooltip: true,
    tooltipContent: "Paris - The City of Light",
    tooltipDirection: "top", // "auto", "top", "bottom", "left", or "right"
    tooltipPermanent: false,
  },
  {
    // Second marker with different properties
    data: [51.5074, -0.1278],
    customIcon: false, // Will use default icon
    iconUrl: "", // Not needed when customIcon is false, but include it anyway
    iconWidth: "32px", // Still include even if customIcon is false
    iconHeight: "32px", // Still include even if customIcon is false
    tooltip: true,
    tooltipContent: "London",
    tooltipDirection: "bottom",
    tooltipPermanent: false,
  },
];
```

#### Circles Variable Example

```javascript
[
  {
    // Required for circleDataField and circleRadiusField
    data: [48.8566, 2.3522], // [latitude, longitude]
    radius: 5000, // radius in meters

    // Required for circles_strokeField and related style mappings
    stroke: true,
    color: "#3388ff", // Stroke color
    weight: 3, // Stroke width in pixels
    opacity: 1, // Stroke opacity (0-1)

    // Required for line styling field mappings
    lineCap: "round", // "butt", "round", or "square"
    lineJoin: "round", // "miter", "round", or "bevel"
    dashArray: null, // For dashed lines, e.g., "5, 5" or null
    dashOffset: null, // Dash pattern offset or null

    // Required for circles_fillField and related style mappings
    fill: true,
    fillColor: "#3388ff", // Fill color
    fillOpacity: 0.2, // Fill opacity (0-1)
    fillRule: "evenodd", // "nonzero" or "evenodd"

    // Required for tooltip field mappings
    tooltip: true,
    tooltipContent: "5km Radius around Paris",
    tooltipDirection: "top", // "auto", "top", "bottom", "left", or "right"
    tooltipPermanent: false, // Whether tooltip is always visible
  },
  {
    // Second circle with different properties
    data: [51.5074, -0.1278],
    radius: 10000,

    stroke: true,
    color: "#ff3333",
    weight: 2,
    opacity: 0.8,

    lineCap: "round",
    lineJoin: "round",
    dashArray: "5, 5", // Example of a dashed line
    dashOffset: null,

    fill: true,
    fillColor: "#ff3333",
    fillOpacity: 0.1,
    fillRule: "evenodd",

    tooltip: true,
    tooltipContent: "10km Radius around London",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

#### Polygons Variable Example

```javascript
[
  {
    // Required for polygonDataField
    data: [
      [48.86, 2.34],
      [48.85, 2.35],
      [48.85, 2.33],
      [48.87, 2.33],
    ], // Array of [lat, lng] coordinates forming the polygon

    // Required for polygons_strokeField and related style mappings
    stroke: true,
    color: "#3388ff", // Stroke color
    weight: 3, // Stroke width in pixels
    opacity: 1, // Stroke opacity (0-1)

    // Required for line styling field mappings
    lineCap: "round", // "butt", "round", or "square"
    lineJoin: "round", // "miter", "round", or "bevel"
    dashArray: null, // For dashed lines, e.g., "5, 5" or null
    dashOffset: null, // Dash pattern offset or null

    // Required for polygons_fillField and related style mappings
    fill: true,
    fillColor: "#3388ff", // Fill color
    fillOpacity: 0.2, // Fill opacity (0-1)
    fillRule: "evenodd", // "nonzero" or "evenodd"

    // Required for tooltip field mappings
    tooltip: true,
    tooltipContent: "Paris District",
    tooltipDirection: "top", // "auto", "top", "bottom", "left", or "right"
    tooltipPermanent: false, // Whether tooltip is always visible
  },
  {
    // Second polygon with different properties
    data: [
      [51.51, -0.12],
      [51.5, -0.13],
      [51.52, -0.14],
      [51.53, -0.11],
    ],

    stroke: true,
    color: "#ff3333",
    weight: 2,
    opacity: 0.8,

    lineCap: "round",
    lineJoin: "round",
    dashArray: "5, 5", // Example of a dashed line
    dashOffset: null,

    fill: true,
    fillColor: "#ff3333",
    fillOpacity: 0.1,
    fillRule: "evenodd",

    tooltip: true,
    tooltipContent: "London District",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

**IMPORTANT:** Even if you set some features to `false` (like `tooltip: false` or `customIcon: false`), you must still include ALL the related properties in your data objects.

## ⚠️ Critical Implementation Requirements

The component performs strict property lookups with no fallbacks or error messages. Missing required properties will cause elements to silently fail to render.

### Required Field Mappings

You must include ALL field mappings for each map element type you use:

#### For Markers

- Data: `markerDataField`
- Icon (if using custom icons): `markerIconUrlField`, `markerIconWidthField`, `markerIconHeightField`
- Tooltip: `markers_tooltipContentField`, `markers_tooltipDirectionField`, `markers_tooltipPermanentField`

#### For Circles

- Data: `circleDataField`, `circleRadiusField`
- Stroke: `circles_strokeField`, `circles_colorField`, `circles_weightField`, `circles_opacityField`
- Line styling (optional): `circles_lineCapField`, `circles_lineJoinField`, `circles_dashArrayField`, `circles_dashOffsetField`
- Fill: `circles_fillField`, `circles_fillColorField`, `circles_fillOpacityField`, `circles_fillRuleField`
- Tooltip: `circles_tooltipContentField`, `circles_tooltipDirectionField`, `circles_tooltipPermanentField`

#### For Polygons

- Data: `polygonDataField`
- Stroke: `polygons_strokeField`, `polygons_colorField`, `polygons_weightField`, `polygons_opacityField`
- Line styling (optional): `polygons_lineCapField`, `polygons_lineJoinField`, `polygons_dashArrayField`, `polygons_dashOffsetField`
- Fill: `polygons_fillField`, `polygons_fillColorField`, `polygons_fillOpacityField`, `polygons_fillRuleField`
- Tooltip: `polygons_tooltipContentField`, `polygons_tooltipDirectionField`, `polygons_tooltipPermanentField`

### Required Data Properties

Your data objects MUST include properties for ALL field mappings you configure:

#### For Markers

- Coordinates: `data` property with [latitude, longitude] array
- Custom icon (if enabled): `customIcon`, `iconUrl`, `iconWidth`, `iconHeight`
- Tooltip (if enabled): `tooltip`, `tooltipContent`, `tooltipDirection`, `tooltipPermanent`

#### For Circles

- Coordinates and size: `data` property with [latitude, longitude] array, `radius` in meters
- Stroke properties: `stroke`, `color`, `weight`, `opacity`
- Line styling (if needed): `lineCap`, `lineJoin`, `dashArray`, `dashOffset`
- Fill properties: `fill`, `fillColor`, `fillOpacity`, `fillRule`
- Tooltip (if enabled): `tooltip`, `tooltipContent`, `tooltipDirection`, `tooltipPermanent`

#### For Polygons

- Coordinates: `data` property with array of [latitude, longitude] arrays forming the polygon
- Stroke properties: `stroke`, `color`, `weight`, `opacity`
- Line styling (if needed): `lineCap`, `lineJoin`, `dashArray`, `dashOffset`
- Fill properties: `fill`, `fillColor`, `fillOpacity`, `fillRule`
- Tooltip (if enabled): `tooltip`, `tooltipContent`, `tooltipDirection`, `tooltipPermanent`

### Common Implementation Errors

- **Missing field mappings**: Include all required field mappings even if you don't use all features
- **Missing data properties**: Include all properties in your data that correspond to your field mappings
- **Mismatched property names**: Property names in data must match exactly what your field mapping expects
- **Incorrect data types**: Coordinates must be [lat, lng] arrays, radius must be a number, etc.
- **Empty default values**: Always provide proper default values in your variable binding

**NOTE:** Even if you don't use certain features (like tooltips), you must still include the corresponding properties in your data with appropriate values (e.g., `tooltip: false`).

## Best Practices

- **Coordinate format**: Latitude first, longitude second: `[lat, lng]`
- **Zoom levels**: Use 0-4 for world/continent view, 5-10 for country/region, 11-15 for city/district, 16+ for streets/buildings
- **Custom markers**: Keep icon images small (32x32px is recommended) for better performance
- **Circle radius**: Express in meters, adjust based on zoom level (larger for zoomed-out views)
- **Polygon complexity**: Keep polygon coordinates to a reasonable amount for better performance
- **Styling consistency**: Use similar styling options for related map elements
- **Testing**: Test at different zoom levels and viewport sizes
- **Provider config**: Some tile providers require API keys through the providerConfiguration property

## Technical Notes

- The component builds on [Leaflet.js](https://leafletjs.com/) and [Leaflet Providers](https://github.com/leaflet-extras/leaflet-providers)
- Tooltip direction can be "auto", "top", "bottom", "left", or "right"
- Stroke weight refers to the line width in pixels
- Opacity values range from 0 (transparent) to 1 (opaque)
- Line caps can be "butt", "round", or "square"
- Line joins can be "miter", "round", or "bevel"
- Fill rules can be "nonzero" or "evenodd"
- The component is responsive and will adjust to container size changes
