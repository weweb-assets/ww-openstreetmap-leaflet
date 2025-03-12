---
name: ww-openstreetmap-leaflet
description: An OpenStreetMap component based on Leaflet.js, supporting map features including markers and circles with customizable styles and tooltips.
keywords:
  - map
  - openstreetmap
  - leaflet
  - geolocation
  - markers
  - circles
---

# OpenStreetMap Leaflet Component

## Component Overview

A map component based on Leaflet.js that enables displaying interactive maps with markers and circles. Key features include:

- Interactive OpenStreetMap maps with various tile providers
- Custom markers with optional custom icons
- Circles with customizable radius and styling
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
"circles_colorField": "['color']"
```

This means:

- Look for coordinates in a property called `data` in each marker object
- Look for circle stroke color in a property called `color` in each circle object

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
    "circles_tooltipPermanentField": "['tooltipPermanent']"
  }
}
```

### Required Data Structure

Your variables must contain data with properties that exactly match your field mappings:

#### Markers Variable Example

```javascript
[
  {
    // Coordinate data
    data: [48.8566, 2.3522], // [latitude, longitude]
    // Custom icon properties
    customIcon: true,
    iconUrl: "https://example.com/marker-icon.png",
    iconWidth: "32px",
    iconHeight: "32px",
    // Tooltip properties
    tooltip: true,
    tooltipContent: "Paris",
    tooltipDirection: "top",
    tooltipPermanent: false,
  },
  {
    data: [51.5074, -0.1278],
    customIcon: false,
    iconUrl: "",
    iconWidth: "32px",
    iconHeight: "32px",
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
    // Coordinate and radius
    data: [48.8566, 2.3522],
    radius: 5000, // meters
    // Stroke properties
    stroke: true,
    color: "#3388ff",
    weight: 3,
    opacity: 1,
    lineCap: "round",
    lineJoin: "round",
    dashArray: null,
    dashOffset: null,
    // Fill properties
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    fillRule: "evenodd",
    // Tooltip properties
    tooltip: true,
    tooltipContent: "5km Radius around Paris",
    tooltipDirection: "top",
    tooltipPermanent: false,
  },
  {
    data: [51.5074, -0.1278],
    radius: 10000,
    stroke: true,
    color: "#ff3333",
    weight: 2,
    opacity: 0.8,
    lineCap: "round",
    lineJoin: "round",
    dashArray: "5, 5",
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
