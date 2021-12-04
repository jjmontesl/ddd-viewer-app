<template>
    <p v-if="result.extratags.population">
        <v-icon class="info--text">mdi-account</v-icon>
        <span class="info--text">{{ result.extratags.population }}</span>
    </p>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>
</style>
