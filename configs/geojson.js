import { basePath, basePathObjectPropertyPath } from "./basePath";
import {
  tooltipConfig,
  tooltipDefaultValues,
  tooltipObjectPropertyPath,
} from "./tooltipBase";
import usaJSON from "./examples/usaJSON.json";

const GEOJSON_DATA_HELP = `GeoJSON data is a format for encoding a variety of geographic data structures. A GeoJSON object may represent a geometry, a feature, or a collection of features. GeoJSON supports the following geometry types: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, and GeometryCollection. Features in GeoJSON contain a geometry object and additional properties, and a feature collection represents a list of features. <br><br> A simple GeoJSON data example is: <br><br> \`
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-122.42, 37.77]
      },
      "properties": {
        "name": "San Francisco"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-122.68, 45.51],
          [-122.43, 37.77],
          [-118.2, 34.04]
        ]
      },
      "properties": {
        "name": "A path from Portland to LA"
      }
    }
  ]
}\`. <br><br>
More detailed examples and explanations can be found in the <a href="https://geojson.org" target="_blank">GeoJSON specification</a>.`;

export default {
  geoJSONTitle: {
    section: "settings",
    type: "Title",
    label: {
      en: "GeoJSON Layer",
    },
    editorOnly: true,
  },
  geoJSONs: {
    label: "goeJSONs",
    type: "Array",
    section: "settings",
    options: {
      item: {
        type: "Object",
        options: {
          item: {
            data: {
              label: "GeoJSON data",
              type: "Info",
              bindable: true,
              propertyHelp: {
                tooltip: GEOJSON_DATA_HELP,
              },
              defaultValue: [],
            },
            ...basePath,
            ...tooltipConfig,
          },
        },
        defaultValue: {
          data: usaJSON,
          stroke: true,
          color: "#3388ff",
          weight: 3,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
          dashArray: null,
          dashOffset: null,
          full: true,
          fillColor: "#3388ff",
          fillOpacity: 0.2,
          fillRule: "evenodd",
          ...tooltipDefaultValues,
        },
      },
    },
    bindable: true,
  },
  geoJSONsDataField: {
    hidden: (content, sidepanelContent, boundProps) =>
      !boundProps.geoJSONs || !content.geoJSONs,
    label: {
      en: "geoJSON data field",
    },
    propertyHelp: {
      tooltip: GEOJSON_DATA_HELP,
    },
    section: "settings",
    type: "ObjectPropertyPath",
    options: (content) => {
      if (!content.geoJSONs.length || typeof content.geoJSONs[0] !== "object") {
        return null;
      }

      return { object: content.geoJSONs[0] };
    },
    defaultValue: null,
  },
  ...basePathObjectPropertyPath("geoJSONs"),
  ...tooltipObjectPropertyPath("geoJSONs"),
};
