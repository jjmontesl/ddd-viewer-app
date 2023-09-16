<template>
    <div v-if="result.extratags">
        <a class="a-decoration mr-1 hoverIcon" target="_blank" v-if="result.extratags.wikipedia" :href="`https://es.wikipedia.org/wiki/${this.result.extratags.wikipedia}`"><v-icon>mdi-wikipedia</v-icon></a>
        <a class="a-decoration mr-1 hoverIcon" target="_blank" v-if="result.extratags['contact:youtube']" :href="result.extratags['contact:youtube']"><v-icon>mdi-youtube</v-icon></a>
        <a class="a-decoration mr-1 hoverIcon" target="_blank" v-if="result.extratags['contact:instagram']" :href="result.extratags['contact:instagram']"><v-icon>mdi-instagram</v-icon></a>
        <a class="a-decoration mr-1 hoverIcon" target="_blank" v-if="result.extratags['contact:facebook']" :href="result.extratags['contact:facebook']"><v-icon>mdi-facebook</v-icon></a>
    </div>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style lang="scss">
.hoverIcon:hover, .hoverIcon i:hover {
    color: #36925cd0;
}
</style>
