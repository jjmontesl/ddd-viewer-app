<template>
    <span v-if="result.extratags && result.extratags.wheelchair == 'yes'">
        <v-icon class="info--text p-3">mdi-wheelchair-accessibility</v-icon>
    </span>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
