<template>
    <div v-if="result.extratags.wheelchair == 'yes'">
        <v-icon class="info--text">mdi-wheelchair-accessibility</v-icon>
    </div>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>