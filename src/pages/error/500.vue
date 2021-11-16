<template>
    <div class="error">
        <error :error="500"></error>
    </div>
</template>

<script>
    import error from '@/components/error'

    export default {
        components: {error},
        data() {
            return {}
        },
    }
</script>
<style lang="less" scoped>
    .error {
        width: 100%;
        height: 100%;
    }
</style>
