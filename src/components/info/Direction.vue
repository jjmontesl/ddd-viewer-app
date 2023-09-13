<template>
    <div>
        <div>
            <span class="grey--text text--darken-1 mr-2" v-if="result.address.road">{{result.address.road}}</span>
            
            <span v-if="result.address.city"><b>{{result.address.city}}</b></span>
            <span v-else-if="result.address.town" class="black--text"><b>{{result.address.town}}</b></span>
        </div>
        <div>
            <span class="secondary--text mr-2" v-if="result.address.postcode && result.address.postcode != 0">
                <tt>{{result.address.postcode}}</tt>
            </span>
            <span v-if="result.address.state" class="mr-2">
                <b>{{result.address.state}}</b>
            </span>
            <span v-if="result.address.country">
                {{result.address.country}}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
