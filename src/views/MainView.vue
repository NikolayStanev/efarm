<template>
  <div>
    <div id="map" class="google-map ma-8 rounded-lg elevation-4" ref="googleMap"></div>
  </div>
</template>

<script>
import mapLoader from "@/plugins/GoogleMap";

export default {
  name: "MainView",

  data() {
    return {
      google: null,
      map: null,
      marker: null,
      position:null,
      markers:[],
      markerPositions:[],
      polygons:[],
      polyLine: null,
      firstVertex: null,
    }
  },

  async mounted() {
    this.google =  await mapLoader.load();
    this.initializeMap()
    this.setPolyLine();
  },

  methods: {

    initializeMap() {
      this.map = new this.google.maps.Map(this.$refs.googleMap, {
        center: {lat: 42.53714408138897, lng: 23.4862511502688},
        zoom: 7,
        mapTypeId: this.google.maps.MapTypeId.HYBRID,
      });
      this.map.addListener("click", (event) => {
        if(this.polyLine === null) {
          this.setPolyLine();
        }
        this.markerPositions.push(event.latLng);
      })
    },

    setPolyLine() {
      this.polyLine = new this.google.maps.Polyline({
        path: this.markerPositions,
        geodesic: true,
        editable: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      this.markerPositions = this.polyLine.getPath()
      this.polyLine.setMap(this.map);

      this.polyLine.addListener("click", (event) => {

        if(event.vertex !== null && event.vertex.latlng === this.markerPositions[0]) {
          console.log("In the if")
          this.createPolygon(this.polyLine.getPath())
        }else {
          this.polyLine.getPath().removeAt(event.vertex)
        }
      })
    },

    createPolygon(path) {

      let polygon = new this.google.maps.Polygon({
        paths: path,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        draggable: true
        // editable: true,
      });
      this.markerPositions = [];
      this.polyLine.setMap(null);
      this.polyLine = null;
      console.log("Reset!")

      polygon.addListener("rightclick", () => {
        console.log("rightClick!")
        polygon.setMap(null)
        this.polygons.splice(polygon, 1)
      })

      polygon.setMap(this.map);
      this.polygons.push(polygon);
    }

  }
}
</script>

<style scoped>
#map {
  height: 400px;
}


</style>
