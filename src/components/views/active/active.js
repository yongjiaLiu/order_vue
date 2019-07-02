
//1:input 2:select 3:cascader 4:textarea 5:picker
export const queryForm = {
					resume: {
						label: "个人简介",
						error: false,
						model: "",
						modelType: "resume",
						prop: "resume",
						type: 1, 
					},
					name:{
						label: "姓名",
						error: false,
						model: "",
						modelType: "fullName",
						prop: "fullName",
						type: 1, 
					},
					phone:{
						label: "电话",
						error: false,
						model: "",
						modelType: "phone",
						prop: "phone",
						type: 5, 
					}
				};
				
export const rowsList = {
					title:{
						label:"名称",
						prop:"title",
						types:1
					},
					type:{
						label:"类型",
						prop:"type",
						types:1
					},
					date:{
						label:"日期",
						prop:"date",
						types:1
					},
					author:{
						label:"角色",
						prop:"author",
						types:1
					}
				};
