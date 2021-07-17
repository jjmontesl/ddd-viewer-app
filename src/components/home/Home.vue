<template>

    <section class="blog">
        <header class="blog-header">
            <h1 class="blog-header-title">
                Home
            </h1>
        </header>
        <v-container class="blog-article">
            <div class="blog-article-date">Jul 3 2021</div>
            <div class="blog-article-title">DDD hits the road!</div>
            <span class="iconify" data-icon="akar-icons:map" data-inline="false"></span>
            <article class="blog-article-content">
                <h2>DDD hits the road!</h2>
                <p>Hey!</p>
                <p>Today I’m proud to bring you news about DDD, a toolchain that allows generating and visualizing 3D Tiles based on OpenStreetMap.</p>
                <p>There’s been some news lately which I’d like to share with the community:</p>
                <h4>Demo Server</h4>
                <p>First, I have set up a demo server that can generate tiles upon request and a viewer application is now published. You can view some demo trips here:</p>
                <nav>
                    <ul>
                        <li><a href="https://3dsmaps.com/play/?u=/trips/acoruna-menhires.json&sb=@dynamic&@43.3861094,-8.4069793,84a,35y,127.1h,94.38t">A coruña</a></li>
                        <li><a href="https://3dsmaps.com/play/?u=/trips/vigo-castro.json&@42.2317848,-8.7279656,131a,35y,28.9h,51.29t">Vigo</a></li>
                        <li><a href="https://3dsmaps.com/play/?u=/trips/munchen-maximilianeum.json&sb=@dynamic&@48.1446598,11.5976389,2a,35y,196.2h,89.86t">München</a></li>
                    </ul>
                </nav>
                <p>You can also access the viewer directly (https://3dsmaps.com/), but note that, if your region of interest hasn’t been generated,  you may need top wait a few minutes (and refresh) for tiles to be created. And data is only available for certain regions, so make sure you check the “About” section before using the viewer ;). Please be patient.</p>
                <p>If your computer can handle it, you can enable shadows, increase the drawing distance and play with some other settings in the Settings menu.</p>
                <p>Hopefully we can improve this workflow in the future. The viewer deserves a separate post so stay tuned for more info.</p>
                <h4>
                    Welcome @Farvel! => TypeScript + Embeddable viewer
                </h4>
                <p>I am happy to announce that @Farvel, a new contributor, has joined the ddd-viewer project. He is a junior developer but has already been pushing hard and helping to migrate ddd-viewer to TypeScript and separate the viewer library.</p>
                <p>This has been a bit of a painful process, but the results are already showing: the ddd-viewer core has been separated and can now be reused or embedded as an independent component much like other map or 3d globe viewers (more on that coming up soon). In addition, the library is now written in TypeScript, which we believe helps writing better code for this kind of solution.</p>
                <h4>Help wanted!</h4>
                <p>DDD OSM has been in development for more than 18 months and it is still far from “usable”. I started this as a hobby project trying to create a “race-in-your-town driving game”, but now it aims to be a tool that is useful to OSM mappers and users, to artists, web developers, game developers and who knows :).</p>
                <p>There are several areas where DDD can use help of senior and junior developers: procedural modelling, client application UI and features, JS/TS programming and GIS/3D programming, shader programming, JS buildchain and packaging, documentation, examples…  The project is not mature and there’s a lot of space for improvement, but also note that it’s also poorly documented and getting started will require patience and some back and forth collaboration initially. You can see an example of the kind of things that require attention at: https://github.com/jjmontesl/ddd-viewer/issues (but there are others! :))</p>
                <p>Interested? Brave enough? Can you help? If so do not hesitate to get in touch!</p>
                <p>Have a nice map! Yours,</p>
                <p>José Juan Montes</p>
                <p>DDD - Procedural generation of 2D and 3D geometries and scenes</p>
            </article>
        </v-container>
    </section>
</template>

<style lang="scss">
.blog {
    background-color: #fff;
    min-height: 100vh;
}

.blog-header {
    background-image: url("/img/blog_banner.png");
    background-attachment: fixed;
    background-size: contain cover;
    background-position: top;
    height: 360px;
}

.blog-header-title {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
    margin: 0 auto;
    height: 140px;
    font-weight: bold;
    text-align: center;
    font-family: "Arial";
    font-size: 118px;
    color: #419D78;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
}

.blog-article-content {
    text-align: left;
}
</style>

<script>
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

}
</script>
