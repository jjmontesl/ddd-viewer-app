<template>
    <v-col class="text-left col-6">
        <a class="a-decoration mr-1" v-if="result.extratags['contact:instagram']" :href="result.extratags['contact:instagram']"><v-icon>mdi-instagram</v-icon></a>
        <a class="a-decoration mr-1" v-if="result.extratags['contact:facebook']" :href="result.extratags['contact:facebook']"><v-icon>mdi-facebook</v-icon></a>
        <a class="a-decoration " v-if="result.extratags['contact:youtube']" :href="result.extratags['contact:youtube']"><v-icon>mdi-youtube</v-icon></a>
    </v-col>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>