<template>
    <v-col class="text-right col-6 mt-4">
        <a class="a-decoration" v-if="result.extratags && result.extratags.email" :href="`mailto:${result.extratags.email}`"><v-icon>mdi-gmail</v-icon></a>
    </v-col>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
