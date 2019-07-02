<template>
    <el-dialog
        title="导出设置"
        :visible.sync="isShow"
        width="50%"
        :before-close="close"
        center>
        <div class="exprot-class">
            <p class="exprot-class-title">已包含基础数据</p>
            <p>{{basicsData}}</p>
        </div>
        <div class="exprot-class">
            <p class="exprot-class-title">自定义增加数据</p>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选/反选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox style="width:12%;" v-for="(item,index) in optionsData" :label="index" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close()">取 消</el-button>
            <el-button :loading="sLoading" type="primary" @click="exportHandle">导出</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "export",
        props:['params','isShow','searchForm'],
        data() {
            return {
                centerDialogVisible: false,
                checkAll: false,
                checkedCities: [],
                optionsData: [],
                isIndeterminate: true,
                basicsData:'',//基础数据
                url:'',//接口地址
                sLoading:false,
            };
        },
        created(){
            this.optionsData = this.params.optionsData;
            this.basicsData = this.params.basicsData;
            this.url = this.params.url;
        },
        methods:{
            //导出操作
            exportHandle(){
                //this.centerDialogVisible = false;
                let keys = [];
                //后台是从1开始，数组是从0开始，转换一下
                for(var key in this.checkedCities){
                    keys.push(Number(this.checkedCities[key])+1);
                }
                //升序排序
                keys.sort(function (x,y) {
                    return x-y;
                });
                let colStr = keys.join(",");
                let data = this.searchForm;
                data.userId = JSON.parse(sessionStorage.getItem('uInfo')).userId
                data.colStr = colStr
                let url = this.url;
                this.sLoading = true;
                this.$api.get(url, data).then((res) => {
                    if (res.ret == true) {
                        this.sLoading = false;
                        this.checkedCities = [];
                        window.open(res.data,"_blank");
                        this.$emit('on-close');
                    }else{
                        this.sLoading = false;
                        this.$message.error(res.message || res.msg);
                    }
                });
                /*let param = '';
                //组装参数
                for(var key in data){
                    if(data[key] !=''){
                        param+=key+"="+data[key]+"&"
                    }
                }
                param = param.substr(0, param.length - 1);
                var url = this.$global.baseUrl+this.url+"?"+param;
                window.open(url,"_blank");
                this.close();*/
            },

            //全选&反选
            handleCheckAllChange(val) {
                let keys = [];
                for(var key in this.optionsData){
                    keys.push(Number(key));
                }
                this.checkedCities = val ? keys : [];
                this.isIndeterminate = false;
            },
            //选择框
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.optionsData.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.optionsData.length;
            },
            close(){
                this.$emit('on-close');//
            }
        }
    }
</script>

<style lang="less">
    .exprot-class{
        padding:10px 0 10px 0;
        .exprot-class-title{
            font-size:18px;
            padding:8px 0 8px 0;
        }
    }
</style>
