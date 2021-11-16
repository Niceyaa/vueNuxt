<template>
    <div class="my-template">
        <materialCom :resource-type.sync="resourceType"></materialCom>
    </div>
</template>
<script>
    import materialCom  from '../../../components/materialCom'
    export default {
        name:"myTemplate",
        components: {materialCom},
        data() {
            return {
                resourceType: 102, //资源类型 101系统素材 102公司素材 103个人素材 201系统模板 202公司模板 203个人模板
            };
        },
        methods: {}
    };
</script>

<style scoped>
    .my-template {
        height: 100%;
    }
</style>
