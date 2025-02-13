<template>
  <div v-if="error" class="map-placeholder">
    <div class="placeholder-content">
      {{ error }}
    </div>
  </div>
  <div
    v-else
    class="ww-leaflet leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    :class="{ editing: isEditing }"
    ref="mapContainer"
    :key="componentKey"
  ></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useLeafletMap } from "./useLeafletMap";
import "leaflet/dist/leaflet.css";

export default {
  name: "OpenStreetMap",
  props: {
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
    content: { type: Object, required: true },
  },
  emits: ["trigger-event"],
  setup(props, { emit }) {
    const componentKey = ref(0);
    const error = ref("");
    const mapContainer = ref(null);
    let mapInstance = null;

    /* wwEditor:start */
    const isMarkersBound = computed(() => {
      return !!props.wwEditorState.boundProps.markers;
    });
    const isCirclesBound = computed(() => {
      return !!props.wwEditorState.boundProps.circles;
    });
    const isPolygonsBound = computed(() => {
      return !!props.wwEditorState.boundProps.polygons;
    });
    const isRectanglesBound = computed(() => {
      return !!props.wwEditorState.boundProps.rectangles;
    });
    const isPolylinesBound = computed(() => {
      return !!props.wwEditorState.boundProps.polylines;
    });
    const isGeoJSONsBound = computed(() => {
      return !!props.wwEditorState.boundProps.geoJSONs;
    });
    /* wwEditor:end */

    let boundStates = {
      markers: false,
      circles: false,
      polygons: false,
      rectangles: false,
      polylines: false,
      geoJSONs: false,
    };

    /* wwEditor:start */
    boundStates = {
      markers: isMarkersBound,
      circles: isCirclesBound,
      polygons: isPolygonsBound,
      rectangles: isRectanglesBound,
      polylines: isPolylinesBound,
      geoJSONs: isGeoJSONsBound,
    };
    /* wwEditor:end */

    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    async function initMap() {
      try {
        error.value = "";
        componentKey.value += 1;
        await nextTick();

        const { map } = useLeafletMap(
          mapContainer.value,
          props.content,
          boundStates,
          emit
        );

        mapInstance = map;

        // Initialize map controls based on props
        if (props.content.scaleControl) {
          L.control.scale().addTo(mapInstance);
        }

        if (props.content.layerControl) {
          const baseLayers = {};
          const overlays = {};
          L.control.layers(baseLayers, overlays).addTo(mapInstance);
        }
      } catch (error) {
        console.error("Map initialization error:", error);
        error.value = error.message;
      }
    }

    const debouncedInitMap = debounce(initMap, 1000);

    onMounted(() => {
      initMap();

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect) {
            debouncedInitMap();
          }
        }
      });

      if (mapContainer.value) {
        resizeObserver.observe(mapContainer.value);
      }

      onUnmounted(() => {
        if (mapContainer.value) {
          resizeObserver.unobserve(mapContainer.value);
        }
      });
    });

    const isEditing = computed(() => {
      /* wwEditor:start */
      return (
        props.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    watch(
      () => isEditing,
      () => {
        initMap();
      }
    );

    watch(
      () => boundStates,
      () => {
        initMap();
      },
      { deep: true }
    );

    return {
      isEditing,
      mapContainer,
      mapInstance,
      componentKey,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
.map-placeholder {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);

  .placeholder-content {
    text-align: center;
    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.8em 1.2em;
    border-radius: 12px;
  }
}

.ww-leaflet {
  width: 100%;
  overflow: hidden;
  /* wwEditor:start */
  &.editing {
    pointer-events: none;
  }
  /* wwEditor:end */
}
</style>

<style lang="scss">
.leaflet-control-attribution {
  display: flex;
}

.leaflet-control-attribution > * {
  margin: 0px 4px;
}
</style>
