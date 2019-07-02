<template>
    <el-dialog
        title="导入设置"
        :visible.sync="isShow"
        width="40%"
        :before-close="close"
        center>
        <div style="display: flex;">
            <p>选择导入表格：</p>
            <el-upload
                class="upload-demo"
                ref="upload"
                :action="uploadPath"
                name="excelFile"
                :data="data"
                :limit="1"
                :headers="headers"
                :before-upload="beforeAvatarUpload"
                :on-progress="progress"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                :file-list="fileList"
                :auto-upload="false">
                <el-button size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlsx或xls表格</div>
            </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button :loading="addLoading"  type="primary" @click="submitUpload">上传</el-button>
  </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "export",
        props:['params','isShow'],
        data() {
            return {
                data:{
                    userId:JSON.parse(sessionStorage.getItem('uInfo')).userId,
                    token:JSON.parse(sessionStorage.getItem('uInfo')).token
                },
                uploadPath:'',
                fileList: [],
                addLoading:false,
                headers:{
                    'token':JSON.parse(sessionStorage.getItem('uInfo')).token
                }
            };
        },
        created(){
            this.uploadPath = this.$global.baseUrl + this.params.url //上传地址
        },
        methods:{
            //上传前检测
            beforeAvatarUpload(file) {
                let typearr = file.name.split(".");
                let type = typearr[typearr.length - 1];
                const isxls = type === 'xlsx' || type === 'xls';
                if (!isxls) {
                    console.log(isxls);
                    this.$message.error('上传图片只能是 xlsx或xls 格式!');
                }
                return isxls;
            },
            //上传中
            progress(){
                this.addLoading = true;
            },
            //上传
            submitUpload(){
                this.$refs.upload.submit();
            },
            //修改
            handleChange(file, fileList) {

            },
            //上传成功
            handleAvatarSuccess(res, file){
                if (res.ret == true) {
                    this.close();
                    this.$message({message: res.msg || res.message, type: 'success'});
                }else{

                    this.$message.error(res.msg || res.message);
                }
                this.$refs.upload.clearFiles();
                this.addLoading = false;
            },
            //关闭
            close(){
                this.$emit('on-close');//
            }
        }
    }
</script>

<style lang="less">

</style>
