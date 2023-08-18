<template>
  <div style="position: relative">
    <div id="map" class="google-map ma-8 rounded-lg elevation-4" ref="googleMap">
    </div>
    <v-btn @click="drawKVSForEkatte()"
           position="absolute"
           style="left: 40px; top: 10px; z-index: 3">KVS</v-btn>
  </div>
</template>

<script>
import mapLoader from "@/plugins/GoogleMap";
import {toRaw} from "vue";

export default {
  name: "MapView",

  computed: {
    getSelectedLand() {
      return this.$store.state.selectedLand
    }

  },

  data() {
    return {
      isKvsOn: false,
      google: null,
      map: null,
      marker: null,
      position:null,
      markers:[],
      markerPositions:[],
      polygons:[],
      polyLine: null,
      firstVertex: null,
      currentKVS: []
    }
  },

  watch:{
    getSelectedLand(value) {
      let location = value.location.toString().slice(value.location.indexOf("(") + 1,value.location.indexOf(")")).split(" ")
      let latLang = new this.google.maps.LatLng(location[1], location[0]);
      this.map.setCenter(latLang);
      this.map.setZoom(14)

      this.currentKVS = []
      this.getKVSForEkatte(0)
    }
  },


  async mounted() {
    this.google =  await mapLoader.load();
    this.initializeMap()
    this.setPolyLine();
  },

  methods: {
    drawKVSForEkatte() {
      this.isKvsOn = !this.isKvsOn
      if (this.isKvsOn) {
        for( let i = 0; i < this.currentKVS.length; i ++ ) {
          let arrayOfKvs = this.currentKVS[0];

          for (let t = 0; t < arrayOfKvs.length; t++) {

            let kvs = arrayOfKvs[t];
            this.draw(kvs)

          }
        }
      }else {
        for (let i = 0; i<this.polygons.length; i++) {
            let polygon = this.polygons[i]
            toRaw(polygon).setMap(null)
        }
        this.polygons =[];
      }
    },
    draw(kvs) {
      let polygonString = kvs.polygon

      //remove "POLYGON + ( )"
      polygonString = polygonString.substring(polygonString.lastIndexOf("(") + 1, polygonString.indexOf(")"))

      let coords = polygonString.split(',');

      let listDots = new Array();
      for (let k = 0; k < coords.length; k++) {
        let lng = coords[k].split(" ")[0];
        let lat = coords[k].split(" ")[1];

        let latLangObj = new this.google.maps.LatLng(+lat, +lng)
        listDots.push(latLangObj);

      }


      this.createPolygon(listDots)

    },

    getKVSForEkatte(pageNum) {

      let subKVS = false;

      let url = "kvs/%D0%BF%D0%B8%D0%B1%D0%BE%D0%BD%D0%B5%D0%B2/" + this.getSelectedLand.ekatte + "?subKVSFlag=" + subKVS + '&pageNum=' + pageNum
      this.$axios.get(url)
          .then((response) => {
            console.log(response.data)
            this.currentKVS.push(response.data)
            if(response.data.length >=600) {
              this.getKVSForEkatte(++pageNum)
            }
          })
          .catch((error) => {
            console.log(error)
          })
    },

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
        strokeColor: "#F2FF00",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#F6FAA5",
        fillOpacity: 0,
        // editable: true,
      });
      // this.markerPositions = [];
      // this.polyLine.setMap(null);
      // this.polyLine = null;
      // console.log("Reset!")
      //
      // polygon.addListener("rightclick", () => {
      //   console.log("rightClick!")
      //   polygon.setMap(null)
      //   this.polygons.splice(polygon, 1)
      // })

      polygon.setMap(this.map);
      this.polygons.push(polygon);
    }

  }
}
</script>

<style scoped>
#map {
  height: 80vh;
}


</style>
