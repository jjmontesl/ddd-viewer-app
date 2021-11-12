<template>
    <div class="blog">
        <div class="blog-container">
            <v-container style="padding: 0;">

                <div class="blog-article-content">
                    <div class="mb-3">
                        <h2>DDD-Viewer Doc</h2>
                    </div>

                    <p>This is the doc of ddd-viewer, here will be examples, how to mount the project from 0, etc.</p>

                    <a href="https://github.com/jjmontesl/ddd-viewer#readme">DDD-Viewer README</a>
                    <div>
                        <h4 class="mt-5">This is a list of examples</h4>
                        <a href="#">DDD-Viewer Simple Example</a>
                        <br>
                        <a href="https://github.com/jjmontesl/ddd-viewer/blob/zituzZ/doc/examples/webpack_simple/webpack_simple.md">DDD-Viewer Webpack Build</a>
                    </div>
                    <div class="mb-3">
                        <h2>DDD Doc</h2>
                    </div>
                    <p>DDD is the generation tool used to build 3dsmaps scenes.</p>
                    <a href="https://github.com/jjmontesl/ddd/blob/master/README.md">DDD README</a>
                    <div>
                        <h4 class="mt-5">DDD documentation index</h4>
                        <a href="https://github.com/jjmontesl/ddd/tree/master/doc">DDD doc</a>
                    </div>
                </div>
            </v-container>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "../core/Footer";
export default {
    components: {
        Footer
    },
    mounted() {
        this.$emit('dddViewerMode', "site");
    },
}
</script>

<style>

</style>
