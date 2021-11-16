<template>
    <div class="my-template">
        <templateCom :resource-type.sync="resourceType"></templateCom>
    </div>
</template>
<script>
    import templateCom  from '../../../components/templateCom'
    export default {
        name:"myTemplate",
        components: {templateCom},
        data() {
            return {
                resourceType: 202, //资源类型 101系统素材 102公司素材 103个人素材 201系统模板 202公司模板 203个人模板

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
