<template>
  <div class="ww-leaflet" :class="{ editing: isEditing }" ref="map"></div>
</template>

<script>
import L from "leaflet";
import "leaflet-providers";
import "leaflet/dist/leaflet.css";

import countriesJSON from "./GeoJSON/GeoJSON_countries.json";

const DEFAULT_CIRCLE_X = "x";
const DEFAULT_CIRCLE_Y = "y";
const DEFAULT_CIRCLE_RADIUS = "radius";
const DEFAULT_CIRCLE_TOOLTIP = "tooltip";

export default {
  name: "OpenStreetMap",
  props: {
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  data() {
    return {
      map: null,
      circleLayers: [],
      geoJsonLayer: null,
    };
  },
  computed: {
    isEditing() {
      /* wwEditor:start */
      return (
        this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    },
  },
  mounted() {
    this.initializeMap();
  },
  watch: {
    content: {
      handler() {
        if (!this.map) return;

        console.log("tototo");
        this.initializeMap();
      },
      deep: true,
    },
  },
  methods: {
    initializeMap() {
      if (this.map) {
        this.map.remove();
      }

      this.$nextTick(() => {
        this.map = L.map(this.$refs.map, {
          preferCanvas: true,
          center: [46.603354, 1.888334],
          zoom: 4,
          zoomControl: true,
          markerZoomAnimation: true,
        });

        L.tileLayer.provider(this.content.tileLayer).addTo(this.map);

        this.addGeoJSON();
        this.addCircles();
      });
    },
    addGeoJSON() {
      const hlCountries = this.content.highLightedCountries;
      if (!this.map || !hlCountries || !Array.isArray(hlCountries)) return;

      const contentCountriesCode = hlCountries.map((item) => item.country);

      const selectedCountries = {
        type: countriesJSON.type,
        features: countriesJSON.features?.filter((feature) =>
          contentCountriesCode.includes(feature.id)
        ),
      };

      if (this.geoJsonLayer) {
        this.map.removeLayer(this.geoJsonLayer);
      }

      this.geoJsonLayer = L.geoJson(selectedCountries, {
        style: this.geoJSONStyle,
      }).addTo(this.map);
    },
    geoJSONStyle(feature) {
      return {
        fillColor:
          this.content.highLightedCountries.find(
            (item) => item.country === feature.id
          )?.color || "#1976D2",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    },
    addCircles() {
      if (Array.isArray(this.circles) === false) return;
      if (this.circles.length === 0) return;

      for (let circleLayer of this.circleLayers) {
        if (this.map && circleLayer) this.map.removeLayer(circleLayer);
      }

      this.circleLayers = [];

      for (let circle of this.circles) {
        circle = this.formatCircles(circle);

        if (!circle.x || !circle.y) continue;

        let circleInstance = L.circle([circle.x, circle.y], {
          stroke: true,
          weight: 3,
          color: "#64B5F620",
          fillColor: "#1976D2",
          fillOpacity: 0.5,
          radius: circle.radius,
        }).addTo(this.map);

        circleInstance.bindTooltip(circle.tooltip, {
          permanent: false,
          sticky: true,
        });

        this.circleLayers.push(circleInstance);
      }
    },
    formatCircles(circle) {
      if (typeof option === "object") return;

      const xField = this.content.xField || DEFAULT_CIRCLE_X;
      const yField = this.content.yField || DEFAULT_CIRCLE_Y;
      const radiusField = this.content.radiusField || DEFAULT_CIRCLE_RADIUS;
      const tooltipField =
        this.content.tooltipContentField || DEFAULT_CIRCLE_TOOLTIP;

      return {
        x: wwLib.resolveObjectPropertyPath(circle, xField),
        y: wwLib.resolveObjectPropertyPath(circle, yField),
        radius: wwLib.resolveObjectPropertyPath(circle, radiusField),
        tooltip: wwLib.resolveObjectPropertyPath(circle, tooltipField),
      };
    },
    getCountriesGEOJSON() {
      return countriesJSON;
    },
  },
};
</script>

<style lang="scss" scoped>
.ww-leaflet {
  min-height: 100px;
  width: 100%;

  /* wwEditor:start */
  &.editing {
    pointer-events: none;
  }
  /* wwEditor:end */
  overflow: hidden;
}
</style>

<style lang="scss">
.leaflet-control-attribution {
  display: flex;
}

.leaflet-control-attribution > * {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
