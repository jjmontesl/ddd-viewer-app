<template>
    <span v-if="result.extratags && result.extratags.population">
        <v-icon class="info--text">mdi-account</v-icon>
        <span class="info--text">{{ result.extratags.population }}</span> inhabitants
    </span>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>
</style>
