<template>

    <div class="blog">
        <header class="blog-header">
            <h1 class="blog-header-title">
                DDD BLOG
            </h1>
        </header>
        <article class="blog-article">
            <div class="blog-article-date">Jul 3 2021</div>
            <div class="blog-article-title">DDD hits the road!</div>
            <span class="iconify" data-icon="akar-icons:map" data-inline="false"></span>
            <t-button>Ciao tutti il mundo</t-button>
            <div class="blog-article-content">
            Hey!
Today I ’m proud t o bring you news about DDD, a t oolchain t hat allows generating and
visualizing 3D Tiles based on OpenStreetMap.
There’s been some news l ately which I ’d l ike t o share with t he community:
Demo Server
First, I have set up a d emo server t hat can generate t iles upon request and a viewer
application i s now published. You can view some demo t rips here:
- https://3dsmaps.com/play/?u=/trips/acoruna-menhires.json&sb=@dynamic&@43.386
1094,-8.4069793,84a,35y,127.1h,94.38t
- https://3dsmaps.com/play/?u=/trips/vigo-castro.json&@42.2317848,-8.7279656,131a
,35y,28.9h,51.29t
- https://3dsmaps.com/play/?u=/trips/munchen-maximilianeum.json&sb=@dynamic&@
48.1446598,11.5976389,2a,35y,196.2h,89.86t
You can also access t he viewer directly (h ttps://3dsmaps.com) , but note t hat, i f your region
of i nterest hasn’t been generated, you may need t op wait a f ew minutes (and refresh) f or
tiles t o be created. And data i s only available f or certain regions, so make sure you c heck
the “About” section before using t he viewer ; ). Please be patient.
If your computer can handle i t, you can enable s hadows, i ncrease t he drawing distance and
play with some other settings i n t he Settings menu.
Hopefully we can i mprove t his workflow i n t he f uture. The viewer deserves a separate post
so stay t uned f or more i nfo.
Welcome @Farvel! => TypeScript + Embeddable viewer
I am happy t o announce t hat @ Farvel, a new contributor, has j oined t he d dd-viewer
project. He i s a j unior developer but has already been pushing hard and helping t o migrate
ddd-viewer t o TypeScript and separate t he viewer l ibrary.
This has been a bit of a painful process, but t he results are already showing: t he ddd-viewer
core has been separated and can now be r eused or embedded as an i ndependent
component m uch l ike other map or 3d globe viewers (more on t hat coming up soon). I n
addition, t he l ibrary i s now written i n TypeScript, which we believe helps writing better code
for t his kind of solution.
Help wanted!
DDD OSM has been in development for more than 18 months and it is still far from “usable”.
I started t his as a hobby project t rying t o create a “r ace-in-your-town driving game” , but now
it aims t o be a t ool t hat i s useful t o OSM mappers and users, t o artists, web developers,
game developers and who knows : ).
There are several areas where DDD can use help of senior and j unior developers:
procedural modelling, client application UI and f eatures, JS/TS programming and GIS/3D
programming, shader programming, JS buildchain and packaging, documentation,
examples… The project i s not mature and t here’s a l ot of space f or i mprovement, but also
note t hat i t’s also poorly documented and getting started will require patience and some back
and f orth collaboration i nitially. You can see an example of t he kind of t hings t hat require
attention at: h ttps://github.com/jjmontesl/ddd-viewer/issues (but t here are others! : ))
Interested? Brave enough? Can you help? I f so do not hesitate t o get i n t ouch!
Have a nice map! Yours,
            </div>
        </article>
    </div>


</template>

<style lang="scss">
@import "@/scss/variables.scss";
.blog {
background-color: #fff;;
position: relative;
min-height: 100vh;
z-index: 1;
}

.blog-header {
    background-image: url("https://media.discordapp.net/attachments/846054602969579570/864634261314732032/unknown.png?width=1440&height=559");
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    height: 360px;
}

.blog-header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    height: 360px;
    text-align: center;
    font-size: 96px;
    color: rgb(242, 243, 242);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
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

    this.$emit('dddViewerMode', null);

  },

}
</script>
