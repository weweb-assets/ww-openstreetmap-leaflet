<template>
  <div
    class="ww-leaflet leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    :class="{ editing: isEditing }"
    ref="mapContainer"
    :key="componentKey"
  ></div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import "leaflet/dist/leaflet.css";
import useLeafletMap from "./use/useLeafletMap";

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
    /* wwEditor:end */

    let boundStates = {
      markers: false,
      circles: false,
      polygons: false,
    };

    /* wwEditor:start */
    boundStates = {
      markers: isMarkersBound,
      circles: isCirclesBound,
      polygons: isPolygonsBound,
    };
    /* wwEditor:end */

    let mapInstance = null;
    let resizeMapFunction = null;
    const mapContainer = ref(true);

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
        componentKey.value += 1;
        await nextTick();

        // Validate container exists
        if (!mapContainer.value) {
          console.warn("Map container not available, skipping initialization");
          return;
        }

        const { map, resizeMap } = useLeafletMap(
          mapContainer.value,
          props.content,
          boundStates,
          emit
        );

        mapInstance = map;
        resizeMapFunction = resizeMap;
      } catch (error) {
        console.error("Error initializing map component:", error);
        // Reset instances on error
        mapInstance = null;
        resizeMapFunction = null;
      }
    }

    const debouncedResizeMap = debounce(() => {
      try {
        if (resizeMapFunction && mapInstance) {
          resizeMapFunction();
        }
      } catch (error) {
        console.warn("Error during map resize:", error);
      }
    }, 100);

    onMounted(() => {
      initMap();

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect && mapInstance) {
            debouncedResizeMap();
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

    return { isEditing, mapContainer, mapInstance, componentKey };
  },
};
</script>

<style lang="scss" scoped>
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
