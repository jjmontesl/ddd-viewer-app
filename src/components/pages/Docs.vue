<template>
    <div class="docs" style="pointer-events: auto;">
        <div class="docs-container">
            <v-container style="padding: 0;" class="my-5">

                <div class="text-left">

                    <h1>DDD Projects Documentation</h1>

                    <div class="my-3">
                        <div class="mb-3">
                            <h2>DDD-Viewer Doc</h2>
                        </div>

                        <p>This is the doc of the ddd-viewer library, which can be embedded in other sites.
                        Here there are examples including how to use the library, show a 3D map,
                        animate the camera between target coordinates...</p>

                        <a href="https://github.com/jjmontesl/ddd-viewer#readme">DDD-Viewer README</a>
                        <div>
                            <h4 class="mt-5">Examples</h4>
                            <a href="https://github.com/jjmontesl/ddd-viewer/tree/master/examples/simple">DDD-Viewer Simple Example</a>
                            <br>
                            <a href="https://github.com/jjmontesl/ddd-viewer/tree/master/examples/webpack_simple">DDD-Viewer Webpack Build</a>
                        </div>
                    </div>

                    <div class="my-3">
                        <div class="mb-3">
                            <h2>DDD-3Ds Docs</h2>
                        </div>
                        <p>DDD-3Ds is the generation tool used to build 3dsmaps scenes.</p>
                        <a href="https://github.com/jjmontesl/ddd/blob/master/README.md">DDD README</a>
                        <div>
                            <h4 class="mt-5">DDD docs index</h4>
                            <a href="https://github.com/jjmontesl/ddd/tree/master/doc">DDD Docs</a>
                        </div>
                    </div>

                </div>
            </v-container>
        </div>
        <div class="my-5"></div>
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
