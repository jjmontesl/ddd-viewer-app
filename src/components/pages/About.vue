<template>
    <div class="about" style="">
        <div class="about-container">
            <img class="about-img" src="img/about-banner.png" alt="">
            <div class="about-content">

            <v-row>
                <v-col cols="12" md="6">
                    <h2>About 3DSMAPS</h2>
                    <p>
                        3dsmaps, ddd and ddd-viewer are a set of projects designed to generate 3D scenes from
                        <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> data.
                    </p>

                    <h3>Usage</h3>
                    <p>
                        In the 3D view:
                        <ul>
                            <li>Free & walk mode: Left click to view around. Use <b>W,A,S,D</b> or cursor keys to move. Q and W to move up / down.</li>
                            <li>Orbit mode: Left click to orbit. Right click to pan. Mouse wheel to zooms in/out.</li>
                        </ul>
                        <ul>
                            <li><b>SHIFT</b> key: change movement speed.</li>
                            <li><b>N/M</b>: change time (affects light).</li>
                        </ul>
                    </p>
                    <p>
                        Tiles are loaded dynamically. Tiles shown as gray squares are being loaded. Tiles
                        shown in 3D as flat <b>flat square images mean that the tile is
                        enqueued for server generation (currently this may
                        take minutes or hours depending on server load)</b>. Generated tiles are currently
                        shown after reloading the 3D view. Tiles shown as red squares have errored and cannot
                        be generated in current version.
                    </p>
                    <p>
                        <b>NOTE this software is in development stage.</b> Loading and generation times vary
                        depending on server load. <b>Camera
                        may appear far above surface</b> at times during loading. If this happens,
                        try switching to <i>walk</i> mode as it will set the camera above the ground.
                        Orthophotos layers may not be available.
                    </p>


                    <h3>OpenStreetMap</h3>

                    <p>
                        OpenStreetMap is a collectively maintained global mapping database, which includes data that spans ways,
                        roads, shops, train stations and much more.
                    </p>

                    <p>
                        Everybody can contribute to OpenStreetMap, so if one of your areas of interest is not entirely mapped,
                        you can always step in and contribute to one of the larger collaborative open-data projects in the world.
                        Head to OpenStreetMap site, contact your local OSM Mapping community and start mapping!
                    </p>

                    <h3>Copyright and Attribution</h3>

                    <p>
                        <ul>
                            <li>Map Data: <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap Contributors</a></li>
                            <li>Textures: <a href="https://cc0textures.com/" target="_blank">CC0Textures</a></li>
                            <li>Vector Icons: <a href="http://fontawesome.com/" target="_blank">FontAwesome</a></li>
                            <li>Graphic Engine: <a href="https://www.babylonjs.com/" target="_blank">BabylonJS</a></li>
                            <li>3D OSM Generation Tool: <a href="https://github.com/jjmontesl/ddd" target="_blank">DDD (Procedural 3D Generator)</a></li>
                            <li>Elevation Data (ES): CC-BY 4.0 ign.es 2010 (data from 2015-2021)</li>
                            <li>Elevation Data (EU): EU-DEM v1.1 Copernicus Data by the European Union</li>
                            <li>Elevation Data (US): US Geographical Survey</li>
                            <li>Elevation Data (Other): SRTM Mission</li>
                        </ul>
                    </p>
                </v-col>
                <v-col cols="12" md="6">
                    <h2>DDD</h2>

                    <p>
                        OSM 3D data is rendered using the <a href="https://github.com/jjmontesl/ddd">DDD Procedural Geometry Generation Tool</a>.
                    </p>

                    <p>
                        DDD is an Open Source library, looking for contributors. If you are interested in the development of DDD or
                        this HTML5 viewer, please head over to the GitHub site and get in contact with the developer community
                        or <a href="https://twitter.com/jjmontes" target="_blank">contact me</a>.
                    </p>

                    <h3>Coverage</h3>
                    <p>
                            <center><i>Current Coverage (limited by disk space available for elevation data)</i></center>
                            <center><v-img src="/img/about-map.png" contain max-height="300"/></center>
                    </p>


                    <h3>Authors</h3>

                    <p>
                        DDD Viewer and 3D Generator were created by Jose Juan Montes,
                        who also maintains this demostration server. The project is developed
                        along with the following contributors:
                    </p>
                    <p>
                        <ul>
                            <li>Farvell</li>
                            <li>Alex Zituz</li>
                        </ul>
                    </p>
                    <p>
                        You can contribute to the codebase of the generator (DDD), this viewer, or to the OpenStreetMap database.
                        You can also <a href="https://twitter.com/3dsmaps" target="_blank">follow on Twitter</a> to stay up to date.
                    </p>

                    <h3>Thanks to</h3>

                    <p>
                        Thanks to the following persons who have greatly helped us with development or design.
                    </p>
                    <p>
                        <ul>
                            <li>Gabriel</li>
                            <li>Leobar37</li>
                            <li>Maria Torres</li>
                            <li>Yopaseopor</li>
                        </ul>
                    </p>
                </v-col>
            </v-row>
        </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.about {
    color: #473D54;
}

.about-img {
    width: 100%;
}

.about-container {
    max-width: 1024px;
    margin: 0 auto 4rem auto;
    pointer-events: auto;
}

.about-content {
    padding: 0 40px;
    text-align: left;
}
</style>

<script>
import Footer from "../core/Footer";

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  },
  mounted() {
    this.$emit('dddViewerMode', "site");
  },
  components: {
      Footer
  }
}
</script>
