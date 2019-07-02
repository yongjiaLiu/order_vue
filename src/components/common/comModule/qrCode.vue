<template>
    <el-dialog
        title="二维码"
        :visible.sync="isShow"
        width="20%"
        :before-close="close"
        center
        :close-on-click-modal="false">
        <div style="text-align: center">
            <p v-if="mark == 2"><img id='downImg' style="width:100%;height:100%;" :src="dataList.qrCode"></p>
            <p style="font-size:16px;font-weight: 600">{{dataList.name}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <!--<el-button type="primary" @click="dowm()">下 载</el-button>-->
            <!--<a :href="dataList.qrCode" download="w3logo">a标签下载</a>-->
            <span style="font-size:16px;">右键图片另存为保存二维码</span>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "export",
        props:['params','isShow'],
        data() {
            return {
                dataList:'',
                mark:1
            };
        },
        watch: {
            isShow: {
                deep: true,
                handler: function(val, old) {
                    if(val == true){
                        this.mark = 1;
                        let url = this.params.url + this.params.id;
                        this.$api.get(url, {}).then((res) => {

                            if (res.ret == true) {
                                //下载二维码操作
                                //res.data.qrCode = '110700eb3b06499aa4d66eaf67f7b10b.jpg';
                                this.mark = 2
                                this.dataList = res.data;
                                //搜索二维码图片完整路径
                                /*let url = "/sysConfig/fileDownload";
                                let data = {
                                    fileType:this.params.type,
                                    fileName:this.dataList.qrCode
                                }
                                this.$api.get(url, data).then((res) => {
                                    if (res.ret == true) {
                                        this.dataList.qrCode = res.data;
                                        this.mark = 2
                                    }else{
                                        this.$message.error(res.message || res.msg);
                                    }
                                });*/

                            }else{
                                this.dataList = [];
                                this.$message.error(res.message || res.msg);
                            }
                        });
                    }
                }
            }
        },
        created(){
            console.log(this.params);
        },
        methods:{
            //下载二维码
            dowm(){
                this.downloadIamge(this.dataList.qrCode, this.dataList.name)
            },
            //关闭
            close(){
                //window.open(this.dataList.qrCode);
                /*var img = document.getElementById('downImg'); // 获取要下载的图片
                var url = img.src;                            // 获取图片地址
                var a = document.createElement('a');          // 创建一个a节点插入的document
                var event = new MouseEvent('click')           // 模拟鼠标click点击事件
                a.download = 'beautifulGirl'                  // 设置a节点的download属性值
                a.href = url;                                 // 将图片的src赋值给a节点的href
                a.dispatchEvent(event)                        // 触发鼠标点击事件*/
                this.$emit('on-close');//
            },

            downloadIamge(imgsrc, name) {//下载图片地址和图片名
                var image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute("crossOrigin", "anonymous");
                image.onload = function() {
                    var canvas = document.createElement("canvas");
                    canvas.width = image.width;
                    canvas.height = image.height;
                    var context = canvas.getContext("2d");
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                    var a = document.createElement("a"); // 生成一个a元素
                    var event = new MouseEvent("click"); // 创建一个单击事件
                    a.download = name || "photo"; // 设置图片名称
                    a.href = url; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event); // 触发a的单击事件
                };
                image.src = imgsrc;
            }
        }
    }
</script>

<style lang="less">

</style>
