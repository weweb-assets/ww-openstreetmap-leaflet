---
name: ww-openstreetmap-leaflet
description: An interactive OpenStreetMap component based on Leaflet.js, supporting markers, circles, and polygons with customizable styles, tooltips, and comprehensive event handling.
keywords:
  [
    map,
    openstreetmap,
    leaflet,
    geolocation,
    markers,
    circles,
    polygons,
    interactive map,
    mapping,
    coordinates,
  ]
---

#### ww-openstreetmap-leaflet

**_Purpose:_**
An interactive map component built on Leaflet.js that displays OpenStreetMap tiles with support for markers, circles, and polygons. Features comprehensive styling options, tooltip support, and extensive event handling for creating rich mapping experiences.

**_Features:_**

- Interactive OpenStreetMap with multiple tile provider support
- Custom markers with optional custom icons and tooltips
- Circles with customizable radius, styling, and tooltips
- Polygons with customizable styling and tooltips
- Comprehensive event system for map and element interactions
- Field mapping system for dynamic data binding
- Responsive design with automatic resizing
- Extensive styling options for all map elements
- Support for both static configuration and variable-bound data

**_Properties:_**

**Base Map Configuration:**

- tileLayer: string - Map tile provider name. Default: `"OpenStreetMap.Mapnik"`. See [Leaflet Providers](https://leaflet-extras.github.io/leaflet-providers/preview/) for options
- providerConfiguration: object - Configuration for providers requiring API keys. Default: `{}`
- lat: string - Initial map latitude. Default: `"46.603354"`
- lng: string - Initial map longitude. Default: `"1.888334"`
- zoom: number - Initial zoom level (0-20). Default: `4`
- zoomControl: boolean - Show zoom controls. Default: `true`
- attributionControl: boolean - Show attribution. Default: `true`

**Markers Configuration:**

- markers: Array<object> - Array of marker objects. Default: `[]`
- markerDataField: string - Field mapping for marker coordinates. Example: `"['data']"`
- markerIconUrlField: string - Field mapping for custom icon URL. Example: `"['iconUrl']"`
- markerIconWidthField: string - Field mapping for icon width. Example: `"['iconWidth']"`
- markerIconHeightField: string - Field mapping for icon height. Example: `"['iconHeight']"`
- markers_tooltipContentField: string - Field mapping for tooltip content. Example: `"['tooltipContent']"`
- markers_tooltipDirectionField: string - Field mapping for tooltip direction. Example: `"['tooltipDirection']"`
- markers_tooltipPermanentField: string - Field mapping for permanent tooltip. Example: `"['tooltipPermanent']"`

**Circles Configuration:**

- circles: Array<object> - Array of circle objects. Default: `[]`
- circleDataField: string - Field mapping for circle coordinates. Example: `"['data']"`
- circleRadiusField: string - Field mapping for circle radius. Example: `"['radius']"`
- circles_strokeField: string - Field mapping for stroke visibility. Example: `"['stroke']"`
- circles_colorField: string - Field mapping for stroke color. Example: `"['color']"`
- circles_weightField: string - Field mapping for stroke weight. Example: `"['weight']"`
- circles_opacityField: string - Field mapping for stroke opacity. Example: `"['opacity']"`
- circles_lineCapField: string - Field mapping for line cap style. Example: `"['lineCap']"`
- circles_lineJoinField: string - Field mapping for line join style. Example: `"['lineJoin']"`
- circles_dashArrayField: string - Field mapping for dash array. Example: `"['dashArray']"`
- circles_dashOffsetField: string - Field mapping for dash offset. Example: `"['dashOffset']"`
- circles_fillField: string - Field mapping for fill visibility. Example: `"['fill']"`
- circles_fillColorField: string - Field mapping for fill color. Example: `"['fillColor']"`
- circles_fillOpacityField: string - Field mapping for fill opacity. Example: `"['fillOpacity']"`
- circles_fillRuleField: string - Field mapping for fill rule. Example: `"['fillRule']"`
- circles_tooltipContentField: string - Field mapping for tooltip content. Example: `"['tooltipContent']"`
- circles_tooltipDirectionField: string - Field mapping for tooltip direction. Example: `"['tooltipDirection']"`
- circles_tooltipPermanentField: string - Field mapping for permanent tooltip. Example: `"['tooltipPermanent']"`

**Polygons Configuration:**

- polygons: Array<object> - Array of polygon objects. Default: `[]`
- polygonDataField: string - Field mapping for polygon coordinates. Example: `"['data']"`
- polygons_strokeField: string - Field mapping for stroke visibility. Example: `"['stroke']"`
- polygons_colorField: string - Field mapping for stroke color. Example: `"['color']"`
- polygons_weightField: string - Field mapping for stroke weight. Example: `"['weight']"`
- polygons_opacityField: string - Field mapping for stroke opacity. Example: `"['opacity']"`
- polygons_lineCapField: string - Field mapping for line cap style. Example: `"['lineCap']"`
- polygons_lineJoinField: string - Field mapping for line join style. Example: `"['lineJoin']"`
- polygons_dashArrayField: string - Field mapping for dash array. Example: `"['dashArray']"`
- polygons_dashOffsetField: string - Field mapping for dash offset. Example: `"['dashOffset']"`
- polygons_fillField: string - Field mapping for fill visibility. Example: `"['fill']"`
- polygons_fillColorField: string - Field mapping for fill color. Example: `"['fillColor']"`
- polygons_fillOpacityField: string - Field mapping for fill opacity. Example: `"['fillOpacity']"`
- polygons_fillRuleField: string - Field mapping for fill rule. Example: `"['fillRule']"`
- polygons_tooltipContentField: string - Field mapping for tooltip content. Example: `"['tooltipContent']"`
- polygons_tooltipDirectionField: string - Field mapping for tooltip direction. Example: `"['tooltipDirection']"`
- polygons_tooltipPermanentField: string - Field mapping for permanent tooltip. Example: `"['tooltipPermanent']"`

**_Events:_**

- map:load: Triggered when map finishes loading. Payload: `{}`
- map:click: Triggered when map is clicked. Payload: `{ latlng: { lat: number, lng: number }, originalEvent: Event }`
- map:zoom: Triggered when map zoom changes. Payload: `{ zoom: number }`
- map:move: Triggered when map is moved. Payload: `{ center: { lat: number, lng: number }, bounds: object }`
- map:dragstart: Triggered when map drag starts. Payload: `{ center: { lat: number, lng: number } }`
- map:dragend: Triggered when map drag ends. Payload: `{ center: { lat: number, lng: number } }`
- marker:click: Triggered when marker is clicked. Payload: `{ marker: object, latlng: { lat: number, lng: number }, originalEvent: Event }`
- marker:dragstart: Triggered when marker drag starts. Payload: `{ marker: object, latlng: { lat: number, lng: number } }`
- marker:drag: Triggered during marker drag. Payload: `{ marker: object, latlng: { lat: number, lng: number } }`
- marker:dragend: Triggered when marker drag ends. Payload: `{ marker: object, latlng: { lat: number, lng: number } }`
- shape:click: Triggered when circle or polygon is clicked. Payload: `{ type: "circle"|"polygon", shape: object, latlng: { lat: number, lng: number } }`
- shape:edit: Triggered when circle or polygon is edited. Payload: `{ type: "circle"|"polygon", shape: object, latlng: { lat: number, lng: number } }`

**_Example:_**

- Basic map with markers

<elements>
{"uid":"map-basic","tag":"ww-openstreetmap-leaflet","name":"Interactive Map","props":{"lat":"48.8566","lng":"2.3522","zoom":10,"tileLayer":"OpenStreetMap.Mapnik","zoomControl":true,"attributionControl":true,"markers":{"js":"return variables['markers-data']"},"markerDataField":"['coordinates']","markerIconUrlField":"['icon']","markerIconWidthField":"['iconWidth']","markerIconHeightField":"['iconHeight']","markers_tooltipContentField":"['tooltip']","markers_tooltipDirectionField":"['tooltipDirection']","markers_tooltipPermanentField":"['tooltipPermanent']"},"events":[{"trigger":"marker:click","name":"Handle marker click","js":"console.log('Marker clicked:', event.marker)"}]}
</elements>

- Map with circles and polygons

<elements>
{"uid":"map-advanced","tag":"ww-openstreetmap-leaflet","name":"Advanced Map","props":{"lat":"40.7128","lng":"-74.0060","zoom":8,"circles":{"js":"return variables['circles-data']"},"polygons":{"js":"return variables['polygons-data']"},"circleDataField":"['center']","circleRadiusField":"['radius']","circles_colorField":"['strokeColor']","circles_fillColorField":"['fillColor']","circles_tooltipContentField":"['description']","polygonDataField":"['coordinates']","polygons_colorField":"['borderColor']","polygons_fillColorField":"['areaColor']","polygons_tooltipContentField":"['name']"},"events":[{"trigger":"shape:click","name":"Handle shape click","js":"console.log('Shape clicked:', event.type, event.shape)"}]}
</elements>

**_Variable Data Structure Requirements:_**

**CRITICAL:** Your variables MUST contain data formatted EXACTLY as shown below. The component uses field mappings to look for specific properties in your data. Missing properties or mismatched names will cause silent failures.

**Markers Variable Example:**

```javascript
[
  {
    coordinates: [48.8566, 2.3522], // [latitude, longitude] - REQUIRED
    customIcon: true,
    icon: "https://example.com/marker.png",
    iconWidth: "32px",
    iconHeight: "32px",
    tooltip: true,
    tooltipContent: "Paris - The City of Light",
    tooltipDirection: "top", // "auto", "top", "bottom", "left", "right"
    tooltipPermanent: false,
  },
];
```

**Circles Variable Example:**

```javascript
[
  {
    center: [48.8566, 2.3522], // [latitude, longitude] - REQUIRED
    radius: 5000, // radius in meters - REQUIRED
    stroke: true,
    strokeColor: "#3388ff",
    weight: 3,
    opacity: 1,
    lineCap: "round", // "butt", "round", "square"
    lineJoin: "round", // "miter", "round", "bevel"
    dashArray: null, // "5,5" for dashed lines or null
    dashOffset: null,
    fill: true,
    fillColor: "#3388ff",
    fillOpacity: 0.2,
    fillRule: "evenodd", // "nonzero", "evenodd"
    tooltip: true,
    description: "5km radius around Paris",
    tooltipDirection: "auto",
    tooltipPermanent: false,
  },
];
```

**Polygons Variable Example:**

```javascript
[
  {
    coordinates: [
      // Array of [lat, lng] coordinates - REQUIRED
      [48.86, 2.34],
      [48.85, 2.35],
      [48.85, 2.33],
      [48.87, 2.33],
    ],
    stroke: true,
    borderColor: "#3388ff",
    weight: 3,
    opacity: 1,
    lineCap: "round",
    lineJoin: "round",
    dashArray: null,
    dashOffset: null,
    fill: true,
    areaColor: "#3388ff",
    fillOpacity: 0.2,
    fillRule: "evenodd",
    tooltip: true,
    name: "Paris District",
    tooltipDirection: "top",
    tooltipPermanent: false,
  },
];
```

**_Notes:_**

**CRITICAL:** Field mappings and data structure must match exactly. For example, if `markerDataField` is `"['coordinates']"`, your marker data MUST have a `coordinates` property.

**CRITICAL:** Coordinates must always be in [latitude, longitude] format as arrays of numbers.

**CRITICAL:** All field mappings must be provided even if features are disabled. Include all properties in your data objects.

**CRITICAL:** Radius for circles is in meters. Use appropriate values based on your zoom level.

**CRITICAL:** Polygons require at least 3 coordinate points to be valid.

**CRITICAL:** Tooltip directions: "auto", "top", "bottom", "left", "right"

**CRITICAL:** Line caps: "butt", "round", "square"

**CRITICAL:** Line joins: "miter", "round", "bevel"

**CRITICAL:** Fill rules: "nonzero", "evenodd"

**CRITICAL:** The component performs strict property lookups with no fallbacks. Missing required properties cause silent failures.

**_Complete Content Example:_**

```json
{"uid":"3bcf3c29-f34e-4bcb-b2ac-162bd161c762","name":null,"wwObjectBaseId":"4596ca43-6a5d-4e9f-85f4-34bf992f2b91","libraryComponentBaseId":null,
"parentSectionId":"1eeec653-b87d-4d99-a32f-631e666d035d","parentLibraryComponentId":null,"\_state":{"style":{"default":{"align":"center","width":"80%","height":"unset",
"customCss":{"aspect-ratio":1},"textAlign":"center","aspectRatio":1}},"states":[],"interactions":[]},"content":{"default":{"lat":"40.7128","lng":"-74.0060","zoom":4,
"circles":null,"markers":{"code":"variables['ddd1d461-65c4-48f9-b240-9546ee5e24d4']","**wwtype":"f"},"polygons":{"code":"variables
['966d6af1-ad8d-4359-9e6f-11d9807836f8']","**wwtype":"f","defaultValue":[{"data":[[37,-109.05],[41,-109.03],[41,-102.05],[37,-102.04]],"full":true,"color":"#3388ff",
"stroke":true,"weight":3,"lineCap":"round","opacity":1,"tooltip":false,"fillRule":"evenodd","lineJoin":"round","dashArray":null,"fillColor":"#3388ff","dashOffset":null,
"fillOpacity":0.2,"tooltipContent":"<b>Hello world!</b><br>I am a tooltip","tooltipDirection":"auto","tooltipPermanent":false}]},"tileLayer":"OpenStreetMap.DE",
"zoomControl":true,"circleDataField":"['data']","markerDataField":"['data']","polygonDataField":"['data']","circleRadiusField":"['radius']","circles_fillField":"['fill']
","attributionControl":true,"circles_colorField":"['color']","markerIconUrlField":"['iconUrl']","polygons_fillField":"['fill']","circles_strokeField":"['stroke']",
"circles_weightField":"['weight']","polygons_colorField":"['color']","circles_lineCapField":"['lineCap']","circles_opacityField":"['opacity']","markerIconWidthField":"
['iconWidth']","polygons_strokeField":"['stroke']","polygons_weightField":"['weight']","circles_fillRuleField":"['fillRule']","circles_lineJoinField":"['lineJoin']",
"markerIconHeightField":"['iconHeight']","polygons_lineCapField":"['lineCap']","polygons_opacityField":"['opacity']","providerConfiguration":"{}",
"circles_dashArrayField":"['dashArray']","circles_fillColorField":"['fillColor']","polygons_fillRuleField":"['fillRule']","polygons_lineJoinField":"['lineJoin']",
"circles_dashOffsetField":"['dashOffset']","polygons_dashArrayField":"['dashArray']","polygons_fillColorField":"['fillColor']","circles_fillOpacityField":"
['fillOpacity']","polygons_dashOffsetField":"['dashOffset']","polygons_fillOpacityField":"['fillOpacity']","circles_tooltipContentField":"['tooltipContent']",
"markers_tooltipContentField":"['tooltipContent']","polygons_tooltipContentField":"['tooltipContent']","circles_tooltipDirectionField":"['tooltipDirection']",
"circles_tooltipPermanentField":"['tooltipPermanent']","markers_tooltipDirectionField":"['tooltipDirection']","markers_tooltipPermanentField":"['tooltipPermanent']",
"polygons_tooltipDirectionField":"['tooltipDirection']","polygons_tooltipPermanentField":"['tooltipPermanent']"}}}
```
