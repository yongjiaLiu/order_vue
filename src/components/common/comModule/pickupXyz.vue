<template>
    <div>
        <el-dialog
            title="坐标拾取 -- (点击坐标点，获取经纬度)"
            :visible.sync="dialogVisible"
            width="55%"
            :close-on-click-modal="false"
            :before-close="close">
            <div style="width:100%;height:500px;">
                <baidu-map @zoomend="zoomEnd" @click="cLocation" :scroll-wheel-zoom="true" class="map" :center="center" :zoom="zoom" style="height:500px;">
                    <bm-marker @click="dragend" :position="center" :dragging="dragging" >
                    </bm-marker>
                </baidu-map>
            </div>
            <div slot="footer" style="text-align: center">
                <el-button type="primary" @click="close">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['dialogVisible','lntt','latt','isReadOnly'],
        data() {
            return {
                center: {
                    lng: this.lntt ? this.lntt : '110.00837',
                    lat: this.latt ? this.latt : '27.573688'
                    /*lng:'110.00837',
                    lat:'27.573688'*/
                },
                dragging:true,
                zoom:15
            };
        },
        created(){
            if(this.isReadOnly == true){
                this.dragging = false;
            }
            console.log(this.lntt);
        },
        methods: {
            //设置缩放级别
            zoomEnd(e){
                this.zoom = e.target.getZoom()
            },
            //点击获取坐标
            cLocation(e){
                if(this.dragging == true){
                    this.center = e.point;
                    this.center.lat = e.point.lat;
                    this.center.lng = e.point.lng;
                }
            },
            //拖拽结束
            dragend(e){
                console.log(e)
                this.center = e.point;
                this.center.lat = e.point.lat;
                this.center.lng = e.point.lng;
            },
            //关闭或者确定 传值给父组件
            close(){
                console.log(this.center);
                this.$emit('on-close',this.center)
            },
        }
    };
</script>

<style scoped>

</style>
