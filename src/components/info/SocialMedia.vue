<template>
    <v-col class="text-left col-6 mt-4">
        <a class="a-decoration mr-1 hoverIcon" v-if="result.extratags['contact:instagram']" :href="result.extratags['contact:instagram']"><v-icon>mdi-instagram</v-icon></a>
        <a class="a-decoration mr-1 hoverIcon" v-if="result.extratags['contact:facebook']" :href="result.extratags['contact:facebook']"><v-icon>mdi-facebook</v-icon></a>
        <a class="a-decoration mr-1 hoverIcon" v-if="result.extratags['contact:youtube']" :href="result.extratags['contact:youtube']"><v-icon>mdi-youtube</v-icon></a>
        <a class="a-decoration mr-1 hoverIcon" v-if="result.extratags.wikipedia" :href="`https://es.wikipedia.org/wiki/${this.result.extratags.wikipedia}`"><v-icon>mdi-wikipedia</v-icon></a>
    </v-col>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style lang="scss">
.theme--light.v-icon.hoverIcon:hover, .hoverIcon:hover {
    color: #36925cd0;
}
</style>
