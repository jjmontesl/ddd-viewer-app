<template>

    <div class="blog">
        <div class="blog-container">
            <v-img src="/img/banner-blog.png" />
            <v-container style="padding: 0;">

                <article class="blog-article-content">
                    <div class="mb-3">
                        <h2>DDD hits the road!</h2>
                        <div class="text--secondary">2021-07-21</div>
                        <!--<div>JJ Montes</div>-->
                    </div>

                    <p>Hey!</p>
                    <p>Today I’m proud to bring you news about DDD, a toolchain that allows generating and visualizing 3D Tiles based on OpenStreetMap.</p>
                    <p>There’s been some news lately which I’d like to share with the community:</p>
                    <h4>Demo Server</h4>
                    <p>First, I have set up a demo server that can generate tiles upon request and a viewer application is now published. You can view some demo trips here:</p>
                    <nav class="mb-3">
                        <ul>
                            <li><a href="https://3dsmaps.com/play/?u=/trips/acoruna-menhires.json&sb=@dynamic&@43.3861094,-8.4069793,84a,35y,127.1h,94.38t" target="_blank">Torre de Hércules, A coruña</a></li>
                            <li><a href="https://3dsmaps.com/play/?u=/trips/vigo-castro.json&@42.2317848,-8.7279656,131a,35y,28.9h,51.29t" target="_blank">Castro, Vigo</a></li>
                            <li><a href="https://3dsmaps.com/play/?u=/trips/munchen-maximilianeum.json&sb=@dynamic&@48.1446598,11.5976389,2a,35y,196.2h,89.86t" target="_blank">Maximilieaneum, München</a></li>
                            <li><a href="https://3dsmaps.com/play/?u=/trips/newyork-manhattan.json&sb=@dynamic&@40.7071143,-74.0187111,3a,35y,207.8h,96.38t" target="_blank">Manhattan, New York</a></li>
                            <li><a href="https://3dsmaps.com/play/?u=/trips/salamanca-center.json&sb=@dynamic&@40.9589338,-5.6690500,5a,35y,18.3h,93.56t" target="_blank">Cathedral, Salamanca</a></li>
                        </ul>
                    </nav>
                    <p>You can also access the viewer directly (https://3dsmaps.com/), but note that, if your region of interest hasn’t been generated,  you may need top wait a few minutes (and refresh) for tiles to be created. And data is only available for certain regions, so make sure you check the “About” section before using the viewer ;). Please be patient.</p>
                    <p>If your computer can handle it, you can enable shadows, increase the drawing distance and play with some other settings in the Settings menu.</p>
                    <p>Hopefully we can improve this workflow in the future. The viewer deserves a separate post so stay tuned for more info.</p>
                    <h4>
                        Welcome Farvell! => TypeScript + Embeddable viewer
                    </h4>
                    <p>I am happy to announce that Farvell, a new contributor, has joined the ddd-viewer project. He is a junior developer but has already been pushing hard and helping to migrate ddd-viewer to TypeScript and separate the viewer library.</p>
                    <p>This has been a bit of a painful process, but the results are already showing: the ddd-viewer core has been separated and can now be reused or embedded as an independent component much like other map or 3d globe viewers (more on that coming up soon). In addition, the library is now written in TypeScript, which we believe helps writing better code for this kind of solution.</p>
                    <h4>Help wanted!</h4>
                    <p>DDD OSM has been in development for more than 18 months and it is still far from “usable”. I started this as a hobby project trying to create a “race-in-your-town driving game”, but now it aims to be a tool that is useful to OSM mappers and users, to artists, web developers, game developers and who knows :).</p>
                    <p>There are several areas where DDD can use help of senior and junior developers: procedural modelling, client application UI and features, 
                        JS/TS programming and GIS/3D programming, shader programming, JS buildchain and packaging, documentation, examples…  
                        The project is not mature and there’s a lot of space for improvement, but also note that it’s also poorly documented and getting 
                        started will require patience and some back and forth collaboration initially. You can see an example of the kind of things that 
                        require attention at <a href="https://github.com/jjmontesl/ddd-viewer/issues">DDD Viewer issues</a> (but there are others! :))</p>
                    <p>Interested? Brave enough? Can you help? If so do not hesitate to get in touch!</p>
                    <p>Have a nice map! Yours,</p>
                    <p>José Juan Montes</p>
                    <p>DDD - Procedural generation of 2D and 3D geometries and scenes</p>
                </article>
            </v-container>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="scss">
.blog { background-color: #fff; }

.blog-container {
    max-width: 1024px;
    margin: 0 auto 4rem auto;
    pointer-events: auto;
}

.blog-header {
    /*background-image: url();*/
    background-size: cover;
    background-position: left;
    margin-bottom: 2rem;
    height: 360px;
}

.blog-article-content {
    text-align: left;
    margin: 0;
    padding: 1rem 2rem;
    background-color: aliceblue;
}

.blog-article-content h2 {
    padding: 0.5em 0;
    font-size: 2rem;
    font-weight: bold;
    color: #473D54;
}

.blog-article data {
    float: right;
}

.blog-article author {
    float: right;
}

.blog-article-content > p,
.blog-article-content > h4,
.blog-article-content > li {
    padding-bottom: 0.5em;
    color: #473D54;
}

.blog-article-content ul {
    padding-bottom: 1rem;
}
</style>

<script>
import Footer from "../core/Footer";
export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('blog.TITLE')} - %s`
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
