<template>
    <div id="wpsPage1" class="wpsPage1">

    </div>
</template>

<script>
    export default {
        data() {
            return {
                wpsOption: null,
            }
        },
        watch: {
           /* "$store.state.wpsPage1Url":{
                handler(){
                    console.log('11122222222222222222',this.$store)
                    let wUrl = this.$store.state.wpsPage1Url
                    let wToken = this.$store.state.wpsPage1Token
                    // this.openWPS('https://wwo.wps.cn/office/w/8139083701360459776?_w_userid=b60ff6b6b46943fb9c5d209d7c28bf7f&_w_filetype=db&_w_filepath=8139083701360459776.docx&_w_tokentype=1&_w_appid=46bc178d4aa340f394e3b7e674a08fb7&_w_redirectkey=123456&_w_usertype=200&_w_signature=df7QKn3h9CS4eeL6LdHWSEFL7dI%3D','4ca4cf0326844ebbb91c08c4645ff006')
                    this.openWPS(wUrl,wToken)
                },
                deep:true
            }*/
        },
        mounted() {
            window.addEventListener('message',(evt) => {
                const configData = evt.data
                if (configData.type) {
                    this.openWPS(configData.data.wpsUrl,configData.data.token)
                }
                console.log('================',evt)
            })
            /*let wUrl = this.$store.state.wpsPage1Url
            let wToken = this.$store.state.wpsPage1Token
            console.log('11122222222222222222',this.$store)
            // this.openWPS('https://wwo.wps.cn/office/w/8139083701360459776?_w_userid=b60ff6b6b46943fb9c5d209d7c28bf7f&_w_filetype=db&_w_filepath=8139083701360459776.docx&_w_tokentype=1&_w_appid=46bc178d4aa340f394e3b7e674a08fb7&_w_redirectkey=123456&_w_usertype=200&_w_signature=df7QKn3h9CS4eeL6LdHWSEFL7dI%3D','4ca4cf0326844ebbb91c08c4645ff006')
            this.openWPS(wUrl,wToken)*/
        },
        methods: {
            //销毁wps
            destroyWps() {
                if (this.wpsOption) {
                    this.wpsOption.destroy()
                    this.wpsOption = null
                }
            },
            //打开wps
            async openWPS(url, token) {
                this.wpsOption = this.wps.config({
                    mode: 'simple',  //显示模式控制
                    mount: document.querySelector('.wpsPage1'),  //元素关联绑定
                    wpsUrl: url,  //wps文件地址
                    commonOptions: {
                        isIframeViewFullscreen: true,
                    },
                })
                this.wpsOption.setToken({
                    token: token,
                    timeout: 10 * 60 * 1000
                })
                await this.wpsOption.ready()
                const app = this.wpsOption.Application
            },
        }
    }
</script>
<style lang="less">
    .wpsPage1 {
        width: 100%;
        height: 100%;
    }

</style>
