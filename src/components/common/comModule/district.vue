<template>
	<div style="display: flex;">
        <el-select :disabled="isReadOnly"  placeholder="省" @change="getCity(param.provinceCode)" v-model="param.provinceCode">
            <el-option v-for="item in provinces" :label="item.name" :value="item.areaCode" :key="item.areaCode"></el-option>
        </el-select>
        <el-select :disabled="isReadOnly"   placeholder="市" @change="getCounty(param.cityCode)" v-model="param.cityCode">
            <el-option v-for="item in citys" :label="item.name" :value="item.areaCode" :key="item.areaCode"></el-option>
        </el-select>
        <el-select :disabled="isReadOnly"   placeholder="区" @change="getCountyName" v-model="param.countyCode">
            <el-option v-for="item in countys" :label="item.name" :value="item.areaCode" :key="item.areaCode"></el-option>
        </el-select>
	</div>

</template>
<script>
	export default {
		name: "district",
        props:['isReadOnly','params'],
		data() {
			return {
                provinces: [], //初始化省
				citys: [], //初始化市
                countys: [], //初始化县
                param:{
                    provinceCode:'',
                    cityCode:'',
                    countyCode:''
                },
                paramName:{
                    ProName:'',
                    CityName:'',
                    CountyName:'',
                }
			}
		},
        watch: {
            param: {
                deep: true, //深度监听对象里的值
                handler: function(val, old) {
                    this.$emit('on-close',val,this.paramName);
                }
            }
        },
        created(){
            if(this.params.provinceCode != ''){
                //默认参数
                this.defaultParam();
            }else{
                this.search(0);
            }
        },
		methods: {
            //默认值
            defaultParam(){
                var url = "/areaInfo/areaList/code/" + '0';
                this.$api.get(url, {}).then((res) => {
                    this.provinces = res.data;
                    this.param.provinceCode = this.params.provinceCode
                    if(this.params.provinceCode!=''){
                        var url = "/areaInfo/areaList/code/" + this.params.provinceCode;
                        this.$api.get(url, {}).then((res) => {
                            this.citys = res.data;
                            this.param.cityCode = this.params.cityCode;
                            this.param.countyCode = '';
                            this.countys = '';
                            if(this.params.cityCode!=''){
                                var url = "/areaInfo/areaList/code/" + this.params.cityCode;
                                this.$api.get(url, {}).then((res) => {
                                    this.countys = res.data;
                                    let countyCode = this.params.countyCode
                                    let mark = false
                                    res.data.forEach(function(item,index,array){
                                        if(item.areaCode == countyCode){
                                            mark = true;
                                        }
                                    })
                                    this.param.countyCode = mark ?  this.params.countyCode : '';

                                })
                            }
                        })
                    }
                })
            },
		    //搜省
            search(code){
                var url = "/areaInfo/areaList/code/" + code;
                this.$api.get(url, {}).then((res) => {
                    this.provinces = res.data;
                })
            },
            //搜市
            getCity(code){
                let obj = {};
                obj = this.provinces.find((item)=>{
                    return item.areaCode === code;
                });
                this.paramName.ProName = obj.name;
                var url = "/areaInfo/areaList/code/" + code;
                this.$api.get(url, {}).then((res) => {
                    this.citys = res.data;
                    this.param.cityCode = '';
                    this.param.countyCode = '';
                    this.countys = '';
                })
            },
            //搜县
            getCounty(code){
                let obj = {};
                obj = this.citys.find((item)=>{
                    return item.areaCode === code;
                });
                this.paramName.CityName = obj.name;
                var url = "/areaInfo/areaList/code/" + code;
                this.$api.get(url, {}).then((res) => {
                    this.param.countyCode = '';
                    this.countys = res.data;
                })
            },
            getCountyName(code){
                let obj = {};
                obj = this.countys.find((item)=>{
                    return item.areaCode === code;
                });
                this.paramName.CountyName = obj.name;
            }
		}
	}
</script>
<style lang="less">

</style>
