<template>
    <span v-if="result.extratags && result.extratags.opening_hours">
        <v-icon class="info--text mr-2">mdi-clock</v-icon>
        <span class="info--text">{{ result.extratags.opening_hours }}</span>
    </span>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
