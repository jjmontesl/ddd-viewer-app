<template>
    <div>
        <v-flex v-if="result.icon" class="text-center" style="max-width: 36px; min-width: 36px;">
            <img :src="result.icon" :alt="result.icon">
        </v-flex>
        <v-flex v-else-if="result.type == 'parking'" style="max-width: 36px; min-width: 36px;">
            <v-icon>mdi-parking</v-icon>
        </v-flex>
        <v-flex v-else style="max-width: 36px; min-width: 36px;">
            <!--<v-icon>mdi-map-marker</v-icon> -->
            <img :src="'/osmsymbols/png/' + result.class + '-' + result.type + '.svg.png'" height="20">
        </v-flex>
    </div>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
