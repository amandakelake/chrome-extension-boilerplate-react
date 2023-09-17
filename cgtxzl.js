var msg = "";
window.zysj0 = "";	//原志愿数据
window.zysj1 = "";	//修改后的志愿数据
window.zysjbj = "0";
var isHqsjyzm = false; //是否获取验证码，保存资料使用
function checkKsyz() {
	if ($.trim($("#dybmks_wyyzdm").val()) == "") {
		$("#dybmks_wyyzdm").focus();
		alert('请选择考试语种');
		return false;
	}else if ($.trim($("#kslbdm").val()) == "1") {
		if ($.trim($("#dybmks_wyyzdm").val()) == "1") {
			// 让专业DIV显示
			return true;
		} else {
			$("#dybmks_wyyzdm").val("1");
			alert("专升本考生只能选报英语");
			return false;
		}
	}
	return true;
}
function checkZzmm() {
	if ($.trim($("#zzmmdm").val()) == "") {
		$("#zzmmdm").focus();
		alert('请选择政治面貌');
		return false;
	}
	return true;
}
function checkJzz() {
	var hkdm = $.trim($("#hkdm").val());
	var jzzszd = $.trim($("#jzzszd").val());
	var jzzbj = $.trim($("#jzzbj").val());
	var jzzwjlx = $.trim($("#jzzwjlx").val());
	if(hkdm == ""){
		alert('检测不到户口所在地信息，请重新登录');
		return false;
	}
	var xqdm = $('#xqdm').val();
	var xq = xqdm.substr(0,2);
	var hk = hkdm.substr(2,2);
	if(xq != hk || "3" == smyzbj || "4" == smyzbj || "0" == smyzbj) {
		if(jzzszd == ""){
			$("#jzzszd").focus();
			alert('请选择居住地市');
			return false;
		}
		if(jzzbj != 1 || jzzwjlx == ""){
			alert('请上传居住证明材料');
			return false;
		}
		if(jzzwjlx.toLowerCase() != "pdf" && jzzwjlx.toLowerCase() != "png" && jzzwjlx.toLowerCase() != "jpg"){
			alert('居住证明材料文件格式有误');
			return false;
		}
	}
	return true;
}
	/*if("3" == smyzbj || "4" == smyzbj || "0" == smyzbj){ //实名验证过的
		if(jzzszd == ""){
			$("#jzzszd").focus();
			alert('请选择居住地市');
			return false;
		}
		if(jzzbj != 1 || jzzwjlx == ""){
			alert('请上传居住证明材料');
			return false;
		}
		if(jzzwjlx.toLowerCase() != "pdf" && jzzwjlx.toLowerCase() != "png" && jzzwjlx.toLowerCase() != "jpg"){
			alert('居住证明材料文件格式有误');
			return false;
		}
	}else { //本省户籍
		if(jzzszd != "" && jzzbj != 1){
			alert('请上传居住证明材料');
			return false;
		}
	}*/
function kslxchage(){
	if($.trim($("#kslxdm").val()) != '0'){
		$(".zgjf").hide();
		$('.kslxsr').attr("colspan",5);
	}else{
		$(".zgjf").show();
		$('.kslxsr').removeAttr("colspan",5);
		$("#zgjfbj").prop("checked",false);
	}
}
function checkKslx() {
	if ($.trim($("#kslxdm").val()) == "") {
		$("#kslxdm").focus();
		alert('请选择考试类型');
		return false;
	} else {
		if ($.trim($("#kslxdm").val()) == "1" && $.trim($("#kslbdm").val()) != "") {
			checkKslb($("#kmzdm").val(), $("#xqdm").val());
		}
		return true;
	}
}

function repeatStr(str){
	for(var i = 2; i < str.length; i++){
		if(str.charCodeAt(i) - str.charCodeAt(i-1) == 0 && str.charCodeAt(i-1) - str.charCodeAt(i-2) == 0){
			return true;
		}
	}
	return false;
}
function continuityStr(str){
	for(var i = 2; i < str.length; i++){
		if(str.charCodeAt(i) - str.charCodeAt(i-1) == 1 && str.charCodeAt(i-1) - str.charCodeAt(i-2) == 1){
			return true;
		}
	}
	return false;
}
function checkMm() {
	if ($.trim($("#pwd").val()) == "") {
		$("#pwd").focus();
		alert('请输入密码');
		return false;
	} else {
		var str = $.trim($("#pwd").val());
		if (str == null || str.length !=8) {
	    	alert("请输入8位包含大小写字母、数字和特殊字符（如：@*#%）的密码");
	        return false;
	    }
		if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.~`#^_;,{|}+=-])[A-Za-z\d$@$!%*?&.~`#^_;,{|}+=-]{8}$/.test(str)){
			alert('请输入8位包含大小写字母、数字和特殊字符（如：@*#%）的密码，且密码不能包含3个及以上重复字符、3个及以上连续数字！ 例：Qr17305@');
			return false;
		}
		if(repeatStr(str)){
			alert('密码不能包含3个及以上重复字符！');
			return false;
		}
		if(continuityStr(str)){
			alert('密码不能包含3个及以上连续字符！');
			return false;
		}
	}
	return true;
}
var changeKslb = false;
function checkKslb(kmzDm,xqdm) {
	if(kmzDm == '' && xqdm == ''){
		changeKslb = true;
		$("#bmddm").val('');
		loadXq($.trim($("#kslbdm").val()), $.trim($("#xqdm").val()));
		$("#byxx").val('');
		$("#byrq").val('');
		$("#byzshm").val('');
		$("#zsbpc1bkyx1").val('');// 自愿1
		$("#zsbpc1bkyx1zy1").val('');// 专业1
		$("#zsbpc1bkyx1zy2").val('');// 专业2
		$("#zsbpc1bkyx2").val('');// 自愿2
		$("#zsbpc1bkyx2zy1").val('');// 专业1
		$("#zsbpc1bkyx2zy2").val('');// 专业2
		$("#zsbpc8bkyx1").val('');// 圆梦计划自愿1
		$("#zsbpc8bkyx1zy1").val('');// 专业1
		$("#zsbpc8bkyx1zy2").val('');// 专业2
		
		$("#gqbpc2bkyx1").val('');// 高中起点本科
		$("#gqbpc2bkyx1zy1").val('');// 专业1
		$("#gqbpc2bkyx1zy2").val('');// 专业2
		$("#gqbpc3bkyx1").val('');// 高中起点专科 --脱产班
		$("#gqbpc3bkyx1zy1").val('');// 专业1
		$("#gqbpc3bkyx1zy2").val('');// 专业2
		$("#gqbpc3bkyx2").val('');// 高中起点专科 --脱产班
		$("#gqbpc3bkyx2zy1").val('');// 专业1
		$("#gqbpc3bkyx2zy2").val('');// 专业2
		var gqbVal ="4";//获取选中的
		$("#gqbpc"+gqbVal+"bkyx1").val('');// 高中起点专科 --非脱产班
		$("#gqbpc"+gqbVal+"bkyx1zy1").val('');// 专业1
		$("#gqbpc"+gqbVal+"bkyx1zy2").val('');// 专业2
		$("#gqbpc"+gqbVal+"bkyx2").val('');// 高中起点专科 --非脱产班
		$("#gqbpc"+gqbVal+"bkyx2zy1").val('');// 专业1
		$("#gqbpc"+gqbVal+"bkyx2zy2").val('');// 专业2
		$("#gqbpc"+gqbVal+"bkyx3").val('');// 高中起点专科 --非脱产班
		$("#gqbpc"+gqbVal+"bkyx3zy1").val('');// 专业1
		$("#gqbpc"+gqbVal+"bkyx3zy2").val('');// 专业2
		$("#gqbpc9bkyx1").val('');// 高中起点专科 --非脱产班(圆梦计划)
		$("#gqbpc9bkyx1zy1").val('');// 专业1
		$("#gqbpc9bkyx1zy2").val('');// 专业2
		
		$("#gqgpc3bkyx1").val('');// 高中起点专科 --脱产班
		$("#gqgpc3bkyx1zy1").val('');// 专业1
		$("#gqgpc3bkyx1zy2").val('');// 专业2
		$("#gqgpc3bkyx2").val('');// 高中起点专科 --脱产班
		$("#gqgpc3bkyx2zy1").val('');// 专业1
		$("#gqgpc3bkyx2zy2").val('');// 专业2
		$("#gqgpc4bkyx1").val('');// 高中起点专科 --非脱产班
		$("#gqgpc4bkyx1zy1").val('');// 专业1
		$("#gqgpc4bkyx1zy2").val('');// 专业2
		$("#gqgpc4bkyx2").val('');// 高中起点专科 --非脱产班
		$("#gqgpc4bkyx2zy1").val('');// 专业1
		$("#gqgpc4bkyx2zy2").val('');// 专业2
		$("#gqgpc4bkyx3").val('');// 高中起点专科 --非脱产班
		$("#gqgpc4bkyx3zy1").val('');// 专业1
		$("#gqgpc4bkyx3zy2").val('');// 专业2
		$("#gqgpc9bkyx1").val('');// 高中起点专科 --非脱产班(圆梦计划)
		$("#gqgpc9bkyx1zy1").val('');// 专业1
		$("#gqgpc9bkyx1zy2").val('');// 专业2
		
	}
	if ($.trim($("#kslbdm").val()) == "") {
		$("#kslbdm").focus();
		alert("请选择考生类别");
		return false;
	} else {
		if ($.trim($("#kslxdm").val()) == "1" && $.trim($("#kslbdm").val()) != "1") {
			$("#kslbdm").val("1");
			alert("免试生只能报专升本考生类别");
		}
		if (kmzDm == "") {
			loadKmz($.trim($("#kmzdm").val()));
		} else {
			loadKmz(kmzDm);
		}
		if (xqdm == "") {
			loadXq($.trim($("#kslbdm").val()), $.trim($("#xqdm").val()));
		} else {
			loadXq($.trim($("#kslbdm").val()), xqdm);
		}
		if ($.trim($("#kslbdm").val()) == "1") {
			xsZytable();
			if ($.trim($("#dybmks_wyyzdm").val()) == "1") {
				// 让专业DIV显示
				return true;
			} else if ($.trim($("#dybmks_wyyzdm").val()) != "") {
				$("#dybmks_wyyzdm").val("1");
				$("#dybmks_wyyzdm").focus();
				alert("专升本考生只能选报英语");
				return false;
			}
		}else if($.trim($("#kslbdm").val()) == "4"){
			xsZytable();
			return true;
		}else if($.trim($("#kslbdm").val()) == "5"){
			xsZytable();
			return true;
		}else{
			xsZytable();
			return true;
		}
	}
}

function xsZytable(){
	var zsb = document.getElementById("zsb");
	var gqb = document.getElementById("gqb");
	var gqg = document.getElementById("gqg");
	if ($.trim($("#kslbdm").val()) == "1") {
		zsb.style.display = "";
		gqb.style.display = "none";
		gqg.style.display = "none";
		if ($("#czbj").val() == "1" && $("#sjbdbj").val() == "1" && zysjbj == "0") {
			saveZysj("1");
		}
	}else if($.trim($("#kslbdm").val()) == "4"){
		zsb.style.display = "none";
		gqb.style.display = "";
		gqg.style.display = "none";
		if ($("#czbj").val() == "1" && $("#sjbdbj").val() == "1" && zysjbj == "0") {
			saveZysj("4");
		}
	}else if($.trim($("#kslbdm").val()) == "5"){
		zsb.style.display = "none";
		gqb.style.display = "none";
		gqg.style.display = "";
		if ($("#czbj").val() == "1" && $("#sjbdbj").val() == "1" && zysjbj == "0") {
			saveZysj("5");
		}
	}else if($.trim($("#kslbdm").val()) == ""){
		zsb.style.display = "none";
		gqb.style.display = "none";
		gqg.style.display = "none";
	}
}

function saveZysj(v){
	if (v == "1") {
		// 专升本	
		var zy1 = $.trim($("#zsbpc1bkyx1").val());// 自愿1
		var bk1zy1 = $.trim($("#zsbpc1bkyx1zy1").val());// 专业1
		var bk1zy2 = $.trim($("#zsbpc1bkyx1zy2").val());// 专业2
		var zy2 = $.trim($("#zsbpc1bkyx2").val());// 自愿2
		var bk2zy1 = $.trim($("#zsbpc1bkyx2zy1").val());// 专业1
		var bk2zy2 = $.trim($("#zsbpc1bkyx2zy2").val());// 专业2
		var ymjhzy1 = $.trim($("#zsbpc8bkyx1").val());// 圆梦计划自愿1
		var ymjhbk1zy1 = $.trim($("#zsbpc8bkyx1zy1").val());// 专业1
		var ymjhbk1zy2 = $.trim($("#zsbpc8bkyx1zy2").val());// 专业2
		zysj0 = zy1 + bk1zy1 + bk1zy2 + zy2 + bk2zy1 + bk2zy2 + ymjhzy1 + ymjhbk1zy1 + ymjhbk1zy2;
		zysjbj = "1";
	}else if(v == "4"){
		var gqbzy1 = $.trim($("#gqbpc2bkyx1").val());// 高中起点本科
		var gqbbkzy1 = $.trim($("#gqbpc2bkyx1zy1").val());// 专业1
		var gqbbkzy2 = $.trim($("#gqbpc2bkyx1zy2").val());// 专业2
		var tcbbzy1 = $.trim($("#gqbpc3bkyx1").val());// 高中起点专科 --脱产班
		var tcb1bkzy1 = $.trim($("#gqbpc3bkyx1zy1").val());// 专业1
		var tcb1bkzy2 = $.trim($("#gqbpc3bkyx1zy2").val());// 专业2
		var tcbbzy2 = $.trim($("#gqbpc3bkyx2").val());// 高中起点专科 --脱产班
		var tcb2bkzy1 = $.trim($("#gqbpc3bkyx2zy1").val());// 专业1
		var tcb2bkzy2 = $.trim($("#gqbpc3bkyx2zy2").val());// 专业2
		var gqbVal ="4";//获取选中的
		var ftcbbzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx1").val());// 高中起点专科 --非脱产班
		var ftcb1bkzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx1zy1").val());// 专业1
		var ftcb1bkzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx1zy2").val());// 专业2
		var ftcbbzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx2").val());// 高中起点专科 --非脱产班
		var ftcb2bkzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx2zy1").val());// 专业1
		var ftcb2bkzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx2zy2").val());// 专业2
		var ftcbbzy3 = $.trim($("#gqbpc"+gqbVal+"bkyx3").val());// 高中起点专科 --非脱产班
		var ftcb3bkzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx3zy1").val());// 专业1
		var ftcb3bkzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx3zy2").val());// 专业2
		var ftcbymjhbzy1 = $.trim($("#gqbpc9bkyx1").val());// 高中起点专科 --非脱产班(圆梦计划)
		var ftcbymjhbkzy1 = $.trim($("#gqbpc9bkyx1zy1").val());// 专业1
		var ftcbymjhbkzy2 = $.trim($("#gqbpc9bkyx1zy2").val());// 专业2
		zysj0 = gqbzy1 + gqbbkzy1 + gqbbkzy2 + tcbbzy1 + tcb1bkzy1 + tcb1bkzy2 + tcbbzy2 + tcb2bkzy1 + tcb2bkzy2 + ftcbbzy1 + ftcb1bkzy1 + ftcb1bkzy2 + ftcbbzy2 + ftcb2bkzy1 + ftcb2bkzy2 + ftcbbzy3 + ftcb3bkzy1 + ftcb3bkzy2 + ftcbymjhbzy1  + ftcbymjhbkzy1 + ftcbymjhbkzy2;
		zysjbj = "1";
	}else if(v == "5"){
		var tcbbzy1 = $.trim($("#gqgpc3bkyx1").val());// 高中起点专科 --脱产班
		var tcb1bkzy1 = $.trim($("#gqgpc3bkyx1zy1").val());// 专业1
		var tcb1bkzy2 = $.trim($("#gqgpc3bkyx1zy2").val());// 专业2
		var tcbbzy2 = $.trim($("#gqgpc3bkyx2").val());// 高中起点专科 --脱产班
		var tcb2bkzy1 = $.trim($("#gqgpc3bkyx2zy1").val());// 专业1
		var tcb2bkzy2 = $.trim($("#gqgpc3bkyx2zy2").val());// 专业2
		var ftcbbzy1 = $.trim($("#gqgpc4bkyx1").val());// 高中起点专科 --非脱产班
		var ftcb1bkzy1 = $.trim($("#gqgpc4bkyx1zy1").val());// 专业1
		var ftcb1bkzy2 = $.trim($("#gqgpc4bkyx1zy2").val());// 专业2
		var ftcbbzy2 = $.trim($("#gqgpc4bkyx2").val());// 高中起点专科 --非脱产班
		var ftcb2bkzy1 = $.trim($("#gqgpc4bkyx2zy1").val());// 专业1
		var ftcb2bkzy2 = $.trim($("#gqgpc4bkyx2zy2").val());// 专业2
		var ftcbbzy3 = $.trim($("#gqgpc4bkyx3").val());// 高中起点专科 --非脱产班
		var ftcb3bkzy1 = $.trim($("#gqgpc4bkyx3zy1").val());// 专业1
		var ftcb3bkzy2 = $.trim($("#gqgpc4bkyx3zy2").val());// 专业2
		var ftcbymjhbzy1 = $.trim($("#gqgpc9bkyx1").val());// 高中起点专科 --非脱产班(圆梦计划)
		var ftcbymjh1bkzy1 = $.trim($("#gqgpc9bkyx1zy1").val());// 专业1
		var ftcbymjh1bkzy2 = $.trim($("#gqgpc9bkyx1zy2").val());// 专业2
		zysj0 = tcbbzy1 + tcb1bkzy1 + tcb1bkzy2 + tcbbzy2 + tcb2bkzy1 + tcb2bkzy2 + ftcbbzy1 + ftcb1bkzy1 + ftcb1bkzy2 + ftcbbzy2 + ftcb2bkzy1 + ftcb2bkzy2 + ftcbbzy3 + ftcb3bkzy1 + ftcb3bkzy2 + ftcbymjhbzy1 + ftcbymjh1bkzy1 + ftcbymjh1bkzy2;
		zysjbj = "1";
	}
}

function checkBkkl() {
	if ($.trim($("#jhlbdm").val()) == "") {
		$("#jhlbdm").focus();
		alert('请选择报考科类');
		return false;
	}
	return true;
}

function checkBmd() {
	if ($.trim($("#bmddm").val()) == "") {
		$("#bmddm").focus();
		alert('请选择报名点！');
		return false;
	}
	return true;
}

function checkKskmz() {
// alert($.trim($("#kmzdm").val()))
	if ($.trim($("#kmzdm").val()) == "") {
		$("#kmzdm").focus();
		alert('请选择考试科目组');
		return false;
	}
	return true;
}

function checkKsxq() {
	if ($.trim($("#xqdm").val()) == "") {
		$("#xqdm").focus();
		alert('请选择考试县区');
		return false;
	}
	
	
	return true;
}

function checkByny(){
	if ($.trim($("#byrq").val()) == "") {
//		$("#byrq").focus();
		alert("毕业年月不能为空");
		return false;
	}	
	return true;
}

function checkByzy(){
	if($('#kslbdm').val()=='1'){
		if ($.trim($("#byzy").val()) == "") {
			$("#byzy").focus();
			alert("毕业专业不能为空");
			return false;
		}
	}
	return true;
}

function checkXl() {
	// $("#byzshm").val("");
	document.getElementById("byzshm").disabled=false;
	if ($.trim($("#kqxl").val()) == "") {
		$("#kqxl").focus();
		alert('请选择考前学历');
		return false;
	}
	if ($.trim($("#kslbdm").val()) == ""){
		$("#kslbdm").focus();
		alert('请选择考生类别');
		return false;
	}
	if($.trim($("#kqxl").val()) == "9" && $.trim($("#kslbdm").val()) == "1"){
		$("#byzshm").val("待定");
		document.getElementById('byzshm').disabled = true;
	}
	if ($.trim($("#kslbdm").val()) == "1") {
		if($.trim($("#kqxl").val()) == "6" || $.trim($("#kqxl").val()) == "7" || $.trim($("#kqxl").val()) == "9"){
			return true;
		}else{
			$("#kqxl").focus();
			alert('考生类别为专升本,考前学历必须选择高职（专科）毕业、本科（含）以上毕业或专科应届毕业');
			return false;
		}
	}
	return true;
}

function checkZy(){
	if ($.trim($("#zydm").val()) == "") {
		$("#zydm").focus();
		alert('请选择职业');
		return false;
	}
	return true;
}


function checkByxx() {
	if ($.trim($("#byxx").val()) == "") {
		$("#byxx").focus();
		alert("请输入毕业学校");
		return false;
	}
	var byxx = $.trim($("#byxx").val());
	var reg = /^[0-9]+$/;
	if (reg.test(byxx)) {
		$("#byxx").focus();
		alert("毕业学校不能为纯数字");
		return false;
	}
	var reg1 = /^[\u4e00-\u9fa5A-za-z0-9\-\(\)（）]+$/;
	if (!reg1.test(byxx)) {
		$("#byxx").focus();
		alert("毕业学校不能含特殊字符，可以含括号及-");
		return false;
	}
	return true;
}

function checkYzbm(){
	var yzbm = $.trim($("#yzbm").val());
	if(yzbm==""){
		$("#yzbm").focus();
       alert('请输入邮政编码');
       return false;
	}else if(yzbm.length!=6){
		$("#yzbm").focus();
		alert('邮政编码必须为6位');
		return false;
	}else if(!isnumeric(yzbm)){
		$("#yzbm").focus();
		alert('邮政编码必须为数字');
		return false;
	}else if(yzbm.indexOf("0")==0){
		$("#yzbm").focus();
		alert('请输入正确的邮政编码');
		return false;
	}
	return true;
}

function checkLxdh(){
	var lxdh = $.trim($("#lxdh").val());
	var reg = /^\d*((\d)+(-)?(\d)+)?$/;
	if (lxdh != ""  && !reg.test(lxdh)) {
		$("#lxdh").focus();
		alert("固定电话格式错误");
		return false;
	}
	return true;
}

function checkTxdz(){
	var sf = $("#sf").val();
	if(sf == ''){
		alert("请选择省！");
		$("#sf").focus();
		return;
	}
	if(sf != '71' && sf != '81' && sf != '82' && sf != '99'){
		var ds = $("#ds").val();
		if(ds == ''){
			alert("请选择市！");
			$("#ds").focus();
			return;
		}
		var xq = $("#xq").val();
		if(xq == ''){
			alert("请选择区（县）！");
			$("#xq").focus();
			return;
		}
	}
	var txdz = $("#txdz").val();
	if(txdz == ''){
		alert("请填写详细地址！");
		$("#txdz").focus();
		return;
	}
	return true;
}

function isnumeric(p){
	if (p == ""||p == null) {
		return false;
	}
	if(isNaN(p)){
		return false;
	}
	return true;
}

function checkZsb(){
	// 专升本	
	var zy1 = $.trim($("#zsbpc1bkyx1").val());// 自愿1
	var bk1zy1 = $.trim($("#zsbpc1bkyx1zy1").val());// 专业1
	var bk1zy2 = $.trim($("#zsbpc1bkyx1zy2").val());// 专业2
	
	var zy2 = $.trim($("#zsbpc1bkyx2").val());// 自愿2
	var bk2zy1 = $.trim($("#zsbpc1bkyx2zy1").val());// 专业1
	var bk2zy2 = $.trim($("#zsbpc1bkyx2zy2").val());// 专业2
	
	var ymjhzy1 = $.trim($("#zsbpc8bkyx1").val());// 圆梦计划自愿1
	var ymjhbk1zy1 = $.trim($("#zsbpc8bkyx1zy1").val());// 专业1
	var ymjhbk1zy2 = $.trim($("#zsbpc8bkyx1zy2").val());// 专业2
	if(zy1=="" && ymjhzy1==""){
		$("#zsbpc1bkyx1").focus();
		alert("院校1代码不能为空");
		return false;
	}
	if(!checkZyxx("zsbpc1bkyx1","院校")){
		return false;
	}
	if(zy1!="" && bk1zy1==""){
		$("#zsbpc1bkyx1zy1").focus();
		alert("专业1不能为空");
		return false;
	}
	
	if(bk1zy1 != ""){
		if(!checkZyxx("zsbpc1bkyx1zy1","专业")){
			return false;
		}
		if(bk1zy2 != "" && bk1zy2==bk1zy1){
			$("#zsbpc1bkyx1zy2").focus();
			alert("专业1:"+bk1zy1+"与专业2:"+bk1zy2+"相同");
			return false;
		}	
	}
	if(bk1zy2 != ""){
		if(!checkZyxx("zsbpc1bkyx1zy2","专业")){
			return false;
		}
	}
	if(zy2 != "" && zy1 == zy2){
		$("#zsbpc1bkyx2").focus();
		alert("院校1代码:"+zy1+"与院校2代码:"+zy2+"相同");
		return false;
	}
	if(zy2 != "" ){
		if(zy1==""){
			$("#zsbpc1bkyx1").focus();
			alert("请按顺序填写院校1代码");
			return false;
		}
		if(bk2zy1 != "" && bk2zy2 != "" && bk2zy2 == bk2zy1){
			$("#zsbpc1bkyx2zy2").focus();
			alert("专业1:"+bk2zy1+"与专业2:"+bk2zy2+"相同");
			return false;
		}else if(bk2zy1 == "" && bk2zy2 != ""){
			 $("#zsbpc1bkyx2zy1").focus();
			 alert("请填写专业1");
			 return false; 
		}else if(bk2zy1 == "" && bk2zy2 == ""){
			$("#zsbpc1bkyx2zy1").focus();
			alert("请填写专业1");
			return false; 
		}
	}
	if(zy2 == ""){
		if(bk2zy1 != "" || bk2zy2 != ""){
			$("#zsbpc1bkyx2").focus();
			alert("请填写院校2代码");
			return false; 
		}
	}
	if(zy2 != "" ){
		if(!checkZyxx("zsbpc1bkyx2","院校")){
			return false;
		}
	}
	if(bk2zy1 != ""){
		if(!checkZyxx("zsbpc1bkyx2zy1","专业")){
			return false;
		}
	}
	if(bk2zy2 != ""){
		if(!checkZyxx("zsbpc1bkyx2zy2","专业")){
			return false;
		}
	 }
	//检验圆梦计划开始
	 if(ymjhzy1 !=""){
		 if(!checkZyxx("zsbpc8bkyx1","院校")){
			return false;
		 }
		 if(ymjhbk1zy1 =="" && ymjhbk1zy2 == ""){
			$("#zsbpc8bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		 }
	 }
	 if(ymjhbk1zy1 !=""){
		 if(ymjhzy1 == ""){
			$("#zsbpc8bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		 }
		 if(!checkZyxx("zsbpc8bkyx1zy1","专业")){
			return false;
		 }		 
	 }
	 if(ymjhbk1zy2 !=""){
		 if(ymjhbk1zy1 == ""){
			 $("#zsbpc8bkyx1zy1").focus();
			 alert("请按顺序填写专业1");
			 return false;
		 }
		 if(!checkZyxx("zsbpc8bkyx1zy2","专业")){
			 return false;
		 }
	 }
	 if(ymjhbk1zy1 !="" && ymjhbk1zy2 !=""&& ymjhbk1zy1 == ymjhbk1zy2){
		 $("#zsbpc8bkyx1zy2").focus();
		 alert("专业1:"+ymjhbk1zy1+"与专业2:"+ymjhbk1zy2+"相同");
		 return false;
	 }
	 //检验圆梦计划结束
	 //校验院校、专业代码的合法性
	 if(zy1!=""){
		 if(!ajaxFunction(zy1,'','1')){
			 $("#zsbpc1bkyx1").focus();
			 if(msg==""){
				 alert("院校1代码:"+zy1+"错误");
			 }else{
				 alert(msg);
			 }
			 return false;
		}
	 }
	 if(bk1zy1!=""){
		 if(!ajaxFunction(zy1,bk1zy1,'1')){
			 $("#zsbpc1bkyx1zy1").focus();
			 alert("院校1代码:"+zy1+"或专业1代码:"+bk1zy1+"错误，请仔细校对报考科类、科目组以及批次");
			 return false;
		 }
	 }
	 if (bk1zy2 != "") {
		 if (!ajaxFunction(zy1, bk1zy2, '1')) {
			 $("#zsbpc1bkyx1zy2").focus();
			 alert("院校1代码:" + zy1 + "或专业2代码:" + bk1zy2 + "错误，请仔细校对报考科类、科目组以及批次");
			 return false;
		 }
	 } 
	 if(zy2!=""){  
		if(!ajaxFunction(zy2,'','1')){
			$("#zsbpc1bkyx2").focus();
			if(msg==""){
				alert("院校2代码:"+zy2+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	 } 
	 if(bk2zy1 != ""){
		 if(!ajaxFunction(zy2,bk2zy1,'1')){
			 $("#zsbpc1bkyx2zy1").focus();
			 alert("院校2代码:"+zy2+"或专业1代码:"+bk2zy1+"错误，请仔细校对报考科类、科目组以及批次");
			 return false;
		 }
	 }
	 if(bk2zy2 != ""){
		 if(!ajaxFunction(zy2,bk2zy2,'1')){
			 $("#zsbpc1bkyx2zy2").focus();
			 alert("院校2代码:"+zy2+"或专业2代码:"+bk2zy2+"错误，请仔细校对报考科类、科目组以及批次");
			 return false;
		 }
	 }
	  //校验代码合法性
	 if(ymjhzy1!=""){  
		 if(!ajaxFunction(ymjhzy1,'','8')){
			 $("#zsbpc8bkyx1").focus();
			 if(msg==""){
				 alert("院校代码:"+ymjhzy1+"错误");
			 }else{
				 alert(msg);
			 }
			 return false;
		 }
	 } 
	 if(ymjhbk1zy1 != ""){
		 if(!ajaxFunction(ymjhzy1,ymjhbk1zy1,'8')){
			 $("#zsbpc8bkyx1zy1").focus();
			 alert("院校代码:"+ymjhzy1+"或专业1代码:"+ymjhbk1zy1+"错误，请仔细校对报考科类、科目组以及批次");
			 return false;
		 }
	 }
	 if(ymjhbk1zy2 != ""){
		 if(!ajaxFunction(ymjhzy1,ymjhbk1zy2,'8')){
			 $("#zsbpc8bkyx1zy2").focus();
			 alert("院校代码:"+ymjhzy1+"或专业2代码:"+ymjhbk1zy2+"错误，请仔细校对报考科类、科目组以及批次");
			 return false;
		 }
	 }
	 zysj1 = zy1 + bk1zy1 + bk1zy2 + zy2 + bk2zy1 + bk2zy2 + ymjhzy1 + ymjhbk1zy1 + ymjhbk1zy2;
	 return true;
}

function checkGqb(){
	var gqbzy1 = $.trim($("#gqbpc2bkyx1").val());// 高中起点本科
	var gqbbkzy1 = $.trim($("#gqbpc2bkyx1zy1").val());// 专业1
	var gqbbkzy2 = $.trim($("#gqbpc2bkyx1zy2").val());// 专业2
	
	if(gqbzy1==""){
		$("#gqbpc2bkyx1").focus();
		alert("院校1代码不能为空");
		return false;
	}
	 
	if(gqbbkzy1==""){
		$("#gqbpc2bkyx1zy1").focus();
		alert("专业1不能为空");
		return false;
	}else if(gqbbkzy1!=""){		
		if(gqbbkzy2 !="" && gqbbkzy1==gqbbkzy2){
			$("#gqbpc2bkyx1zy2").focus();
			alert("专业1:"+gqbbkzy1+"与专业2:"+gqbbkzy2+"相同");
			return false;
		}
		
	}
	if(gqbzy1 != ""){
		if(!checkZyxx("gqbpc2bkyx1","院校")){
			return false;
		}
	}
	if(gqbbkzy1 != ""){
		if(!checkZyxx("gqbpc2bkyx1zy1","专业")){
			return false;
		}
	}
	if(gqbbkzy2 != ""){
		if(!checkZyxx("gqbpc2bkyx1zy2","专业")){
			return false;
		}
	}
	
	var tcbbzy1 = $.trim($("#gqbpc3bkyx1").val());// 高中起点专科 --脱产班
	var tcb1bkzy1 = $.trim($("#gqbpc3bkyx1zy1").val());// 专业1
	var tcb1bkzy2 = $.trim($("#gqbpc3bkyx1zy2").val());// 专业2
	
	var tcbbzy2 = $.trim($("#gqbpc3bkyx2").val());// 高中起点专科 --脱产班
	var tcb2bkzy1 = $.trim($("#gqbpc3bkyx2zy1").val());// 专业1
	var tcb2bkzy2 = $.trim($("#gqbpc3bkyx2zy2").val());// 专业2
	
	if(tcbbzy1==""){
		if(tcb1bkzy1 !="" || tcb1bkzy2 != "" || tcbbzy2 != ""){
			$("#gqbpc3bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
	}
	if(tcbbzy1 != ""){
		if(!checkZyxx("gqbpc3bkyx1","院校")){
			return false;
		}
		if(tcb1bkzy1 =="" && tcb1bkzy2 == ""){
			$("#gqbpc3bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
	}
	if(tcb1bkzy1 != ""){
		if(!checkZyxx("gqbpc3bkyx1zy1","专业")){
			return false;
		}
	}
	if(tcb1bkzy2 != ""){
		if(!checkZyxx("gqbpc3bkyx1zy2","专业")){
			return false;
		}
	}
	
	if(tcbbzy2 != ""){
		if(!checkZyxx("gqbpc3bkyx2","院校")){
			return false;
		}
	}
	if(tcb2bkzy1 != ""){
		if(!checkZyxx("gqbpc3bkyx2zy1","专业")){
			return false;
		}
	}
	if(tcb2bkzy2 != ""){
		if(!checkZyxx("gqbpc3bkyx2zy2","专业")){
			return false;
		}
	}
	/***************************************************************************
	 * if(tcbbzy1==gqbzy1){ $("#gqbpc3bkyx1").focus();
	 * alert("高起本院校1代码:"+gqbzy1+"与脱产班院校1代码:"+tcbbzy1+"相同"); return false; }
	 **************************************************************************/
	if(tcb1bkzy1 !="" && tcb1bkzy2 != "" && tcb1bkzy1==tcb1bkzy2 ){
		$("#gqbpc3bkyx1zy2").focus();
		alert("专业1:"+tcb1bkzy1+"与专业2:"+tcb1bkzy2+"相同");
		return false;
	}
	if(tcb1bkzy1 =="" && tcb1bkzy2 != ""){
		$("#gqbpc3bkyx1zy1").focus();
		alert("请填写专业1");
		return false;
	}

	if(tcbbzy2==""){
		if(tcb2bkzy1 !="" || tcb2bkzy2 != ""){
			$("#gqbpc3bkyx2").focus();
			alert("请填写院校2代码");
			return false;
		}
	}else if(tcbbzy2 !=""){
		/***********************************************************************
		 * if(tcbbzy2==gqbzy1 && gqbzy1!=""){ $("#gqbpc3bkyx2").focus();
		 * alert("脱产班院校2代码:"+tcbbzy2+"与院校1代码:"+gqbzy1+"相同"); return false; }
		 **********************************************************************/
		if(tcbbzy1 == tcbbzy2 && tcbbzy1!=""){
			$("#gqbpc3bkyx2").focus();
			alert("院校1代码:"+tcbbzy1+"与院校2代码:"+tcbbzy2+"相同");
			return false;
		}
		if(tcbbzy1==""){
			$("#gqbpc3bkyx1").focus();
			alert("脱产班院校2不为空，请按顺序填写脱产班院校1代码");
			return false;
		}
		if(tcb2bkzy1 =="" && tcb2bkzy2 == ""){
			$("#gqbpc3bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(tcb2bkzy1 !="" && tcb2bkzy2 != "" && tcb2bkzy1==tcb2bkzy2 ){
			$("#gqbpc3bkyx2zy2").focus();
			alert("专业1:"+tcb2bkzy1+"与专业2:"+tcb2bkzy2+"相同");
			return false;
		}else if(tcb2bkzy1 =="" && tcb2bkzy2 != ""){
			$("#gqbpc3bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}		
	}
	
	var gqbVal ="4";//获取选中的
	var yxmsg = "";
	if(gqbVal=="9"){
		yxmsg ="(圆梦计划)";
	}
	var ftcbbzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx1").val());// 高中起点专科 --非脱产班
	var ftcb1bkzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx1zy1").val());// 专业1
	var ftcb1bkzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx1zy2").val());// 专业2

	var ftcbbzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx2").val());// 高中起点专科 --非脱产班
	var ftcb2bkzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx2zy1").val());// 专业1
	var ftcb2bkzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx2zy2").val());// 专业2
	
	var ftcbymjhbzy1 = $.trim($("#gqbpc9bkyx1").val());// 高中起点专科 --非脱产班(圆梦计划)
	var ftcbymjhbkzy1 = $.trim($("#gqbpc9bkyx1zy1").val());// 专业1
	var ftcbymjhbkzy2 = $.trim($("#gqbpc9bkyx1zy2").val());// 专业2
	//非脱产班校验开始
	if(ftcbbzy1==""){
		if(ftcb1bkzy1 !="" || ftcb1bkzy2 != "" || ftcbbzy2 != ""){
			$("#gqbpc"+gqbVal+"bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
	}
	if(ftcbbzy1 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx1","院校")){
			return false;
		}
	}
	if(ftcb1bkzy1 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx1zy1","专业")){
			return false;
		}
	}
	if(ftcb1bkzy2 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx1zy2","专业")){
			return false;
		}
	}
	if(ftcbbzy2 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx2","院校")){
			return false;
		}
	}
	if(ftcb2bkzy1 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx2zy1","专业")){
			return false;
		}
	}
	if(ftcb2bkzy2 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx2zy2","专业")){
			return false;
		}
	}
	
	if(ftcbbzy1 !=""){		
		/***********************************************************************
		 * if(ftcbbzy1==gqbzy1 && gqbzy1!=""){ $("#gqbpc4bkyx1").focus();
		 * alert("院校1代码:"+gqbzy1+"与非脱产班院校1代码:"+ftcbbzy1+"相同"); return false; }
		 * if(ftcbbzy1==tcbbzy1 && tcbbzy1!=""){ $("#gqbpc4bkyx1").focus();
		 * alert("脱产班院校1代码:"+tcbbzy1+"与非脱产班院校1代码:"+ftcbbzy1+"相同"); return false; }
		 * if(ftcbbzy1==tcbbzy2 && tcbbzy2!=""){ $("#gqbpc4bkyx1").focus();
		 * alert("脱产班院校2代码:"+tcbbzy2+"与非脱产班院校1代码:"+ftcbbzy1+"相同"); return false; }
		 **********************************************************************/
		if(ftcb1bkzy1 =="" && ftcb1bkzy2 == ""){
			$("#gqbpc"+gqbVal+"bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb1bkzy1 !="" && ftcb1bkzy2 != "" && ftcb1bkzy1==ftcb1bkzy2 ){
			$("#gqbpc"+gqbVal+"bkyx1zy2").focus();
			alert("专业1:"+ftcb1bkzy1+"与专业2:"+ftcb1bkzy2+"相同");
			return false;
		}else if(ftcb1bkzy1 =="" && ftcb1bkzy2 != ""){
			$("#gqbpc"+gqbVal+"bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
	
	}
	
	if(ftcbbzy2==""){
		if(ftcb2bkzy1 !="" || ftcb2bkzy2 != ""){
			$("#gqbpc"+gqbVal+"bkyx2").focus();
			alert("请填写院校2代码");
			return false;
		}
	}else if(ftcbbzy2 !=""){
		/***********************************************************************
		 * if(ftcbbzy2==gqbzy1 && gqbzy1!=""){ $("#gqbpc4bkyx2").focus();
		 * alert("院校1代码:"+gqbzy1+"与非脱产班院校2代码:"+ftcbbzy2+"相同"); return false; }
		 * if(ftcbbzy2==tcbbzy1 && tcbbzy1!=""){ $("#gqbpc4bkyx2").focus();
		 * alert("脱产班院校1代码:"+tcbbzy1+"与非脱产班院校2代码:"+ftcbbzy2+"相同"); return false; }
		 * if(ftcbbzy2==tcbbzy2 && tcbbzy2!=""){ $("#gqbpc4bkyx2").focus();
		 * alert("脱产班院校2代码:"+tcbbzy2+"与非脱产班院校2代码:"+ftcbbzy2+"相同"); return false; }
		 **********************************************************************/
		if(ftcbbzy1 == ftcbbzy2){
			$("#gqbpc"+gqbVal+"bkyx2").focus();
			alert("院校1代码:"+ftcbbzy1+"与院校2代码:"+ftcbbzy2+"相同");
			return false;
		}
		if(ftcbbzy1 == ""){
			$("#gqbpc"+gqbVal+"bkyx1").focus();
			alert("院校2代码不为空，请按顺序填写院校1代码");
			return false;
		}
		if(ftcb2bkzy1 =="" && ftcb2bkzy2 == ""){
			$("#gqbpc"+gqbVal+"bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb2bkzy1 !="" && ftcb2bkzy2 != "" && ftcb2bkzy1==ftcb2bkzy2 ){
			$("#gqbpc"+gqbVal+"bkyx2zy2").focus();
			alert("专业1:"+ftcb2bkzy1+"与专业2:"+ftcb2bkzy2+"相同");
			return false;
		}else if(ftcb2bkzy1 =="" && ftcb2bkzy2 != ""){
			$("#gqbpc"+gqbVal+"bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		
	}
	
	ftcbbzy3 = $.trim($("#gqbpc"+gqbVal+"bkyx3").val());// 高中起点专科 --非脱产班
	ftcb3bkzy1 = $.trim($("#gqbpc"+gqbVal+"bkyx3zy1").val());// 专业1
	ftcb3bkzy2 = $.trim($("#gqbpc"+gqbVal+"bkyx3zy2").val());// 专业2
	
	if(ftcbbzy3 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx3","院校")){
			return false;
		}
	}
	if(ftcb3bkzy1 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx3zy1","专业")){
			return false;
		}
	}
	if(ftcb3bkzy2 != ""){
		if(!checkZyxx("gqbpc"+gqbVal+"bkyx3zy2","专业")){
			return false;
		}
	}
	if(ftcbbzy3==""){
		if(ftcb3bkzy1 !="" || ftcb3bkzy2 != ""){
			$("#gqbpc"+gqbVal+"bkyx3").focus();
			alert("请填写院校3代码");
			return false;
		}
	}else if(ftcbbzy3 !=""){
		/***********************************************************************
		 * if(ftcbbzy3==gqbzy1 && gqbzy1!=""){ $("#gqbpc4bkyx3").focus();
		 * alert("院校1代码:"+gqbzy1+"与非脱产班院校3代码:"+ftcbbzy3+"相同"); return false; }
		 * if(ftcbbzy3==tcbbzy1 && tcbbzy1!=""){ $("#gqbpc4bkyx3").focus();
		 * alert("脱产班院校1代码:"+tcbbzy1+"与非脱产班院校3代码:"+ftcbbzy3+"相同"); return false; }
		 * if(ftcbbzy3==tcbbzy2 && tcbbzy2!=""){ $("#gqbpc4bkyx3").focus();
		 * alert("脱产班院校2代码:"+tcbbzy2+"与非脱产班院校3代码:"+ftcbbzy3+"相同"); return false; }
		 **********************************************************************/
		if(ftcbbzy1 == ftcbbzy3 && ftcbbzy1!=""){
			$("#gqbpc"+gqbVal+"bkyx3").focus();
			alert("院校1代码:"+ftcbbzy1+"与院校3代码:"+ftcbbzy3+"相同");
			return false;
		}
		if(ftcbbzy2 == ftcbbzy3 && ftcbbzy2!=""){
			$("#gqbpc"+gqbVal+"bkyx3").focus();
			alert("院校2代码:"+ftcbbzy2+"与院校3代码:"+ftcbbzy3+"相同");
			return false;
		}
		
		if(ftcbbzy3 !="" && ftcbbzy1==""){
			$("#gqbpc"+gqbVal+"bkyx1").focus();
			alert("院校3代码不为空，请按顺序填写院校1代码");
			return false;
		}
		if(ftcbbzy3 !="" && ftcbbzy2==""){
			$("#gqbpc"+gqbVal+"bkyx2").focus();
			alert("院校3代码不为空，请按顺序填写院校2代码");
			return false;
		}
		if(ftcb3bkzy1 =="" && ftcb3bkzy2 == ""){
			$("#gqbpc"+gqbVal+"bkyx3zy1").focus();
			alert("请填写专业1");
			return false;
		}	
		if(ftcb3bkzy1 !="" && ftcb3bkzy2 != "" && ftcb3bkzy1==ftcb3bkzy2 ){
			$("#gqbpc"+gqbVal+"bkyx3zy2").focus();
			alert("专业1:"+ftcb3bkzy1+"与专业2:"+ftcb3bkzy2+"相同");
			return false;
		}else if(ftcb3bkzy1 =="" && ftcb3bkzy2 != ""){
			$("#gqbpc"+gqbVal+"bkyx3zy1").focus();
			alert("请填写专业1");
			return false;
		}	
	}
	//圆梦计划校验
	if(ftcbymjhbzy1 != ""){
		if(!checkZyxx("gqbpc9bkyx1","院校")){
			return false;
		}
		if(ftcbymjhbkzy1 == ""){
			$("#gqbpc9bkyx1zy1").focus();
			alert("请填写专业1代码");
			return false;
		}		
	}
	if(ftcbymjhbkzy1 != ""){
		if(ftcbymjhbzy1 == ""){
			$("#gqbpc9bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
		if(!checkZyxx("gqbpc9bkyx1zy1","专业")){
			return false;
		}
	}
	if(ftcbymjhbkzy2 != ""){
		if(ftcbymjhbkzy1==""){
			$("#gqbpc9bkyx1zy1").focus();
			alert("请按顺序填写专业1代码");
			return false;
		}
		if(!checkZyxx("gqbpc9bkyx1zy2","专业")){
			return false;
		}		
	}
	if(ftcbymjhbkzy1 != "" && ftcbymjhbkzy2 != "" && ftcbymjhbkzy1 == ftcbymjhbkzy2){
		$("#gqbpc9bkyx1zy2").focus();
		alert("专业1代码:"+ftcbymjhbkzy1+"与专业2代码:"+ftcbymjhbkzy2+"相同");
		return false;
	}
	//代码合法性校验开始
	if(gqbzy1!=""){
		if(!ajaxFunction(gqbzy1,'','2')){
			$("#gqbpc2bkyx1").focus();
			if(msg==""){
				alert("院校1代码:"+gqbzy1+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	
	if(gqbbkzy1!=""){
		if(!ajaxFunction(gqbzy1,gqbbkzy1,'2')){
			$("#gqbpc2bkyx1zy1").focus();
			alert("院校1代码:"+gqbzy1+"或专业1代码:"+gqbbkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(gqbbkzy2 !=""){
		if(!ajaxFunction(gqbzy1,gqbbkzy2,'2')){
			$("#gqbpc2bkyx1zy2").focus();
			alert("院校1代码:"+gqbzy1+"或专业2代码:"+gqbbkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcbbzy1 !=""){
		if(!ajaxFunction(tcbbzy1,'','3')){
			$("#gqbpc3bkyx1").focus();
			if(msg==""){
				alert("院校1代码:"+tcbbzy1+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	if(tcb1bkzy1 !=""){
		if(!ajaxFunction(tcbbzy1,tcb1bkzy1,'3')){
			$("#gqbpc3bkyx1zy1").focus();
			alert("院校1代码:"+tcbbzy1+"或专业1代码:"+tcb1bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcb1bkzy2 !=""){
		if(!ajaxFunction(tcbbzy1,tcb1bkzy2,'3')){
			$("#gqbpc3bkyx1zy2").focus();
			alert("院校1代码:"+tcbbzy1+"或专业2代码:"+tcb1bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcbbzy2!=""){
		if(!ajaxFunction(tcbbzy2,'','3')){
			$("#gqbpc3bkyx2").focus();
			if(msg==""){
				alert("院校2代码:"+tcbbzy2+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	if(tcb2bkzy1 != ""){
		if(!ajaxFunction(tcbbzy2,tcb2bkzy1,'3')){
			$("#gqbpc3bkyx2zy1").focus();
			alert("院校2代码:"+tcbbzy2+"或专业1代码:"+tcb2bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcb2bkzy2 != ""){
		if(!ajaxFunction(tcbbzy2,tcb2bkzy2,'3')){
			$("#gqbpc3bkyx2zy2").focus();
			alert("院校2:"+tcbbzy2+"或专业2代码:"+tcb2bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbbzy1 !=""){
		if(!ajaxFunction(ftcbbzy1,'',gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx1").focus();
			if(msg==""){
				alert("院校1代码:"+ftcbbzy1+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	if(ftcb1bkzy1 != ""){
		if(!ajaxFunction(ftcbbzy1,ftcb1bkzy1,gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx1zy1").focus();
			alert("院校1:"+ftcbbzy1+"或专业1代码:"+ftcb1bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcb1bkzy2 != ""){
		if(!ajaxFunction(ftcbbzy1,ftcb1bkzy2,gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx1zy2").focus();
			alert("院校1:"+ftcbbzy1+"或专业2代码:"+ftcb1bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbbzy2 !=""){
		if(!ajaxFunction(ftcbbzy2,'',gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx2").focus();
			if(msg==""){
				alert("院校2代码:"+ftcbbzy2+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	if(ftcb2bkzy1 != ""){
		if(!ajaxFunction(ftcbbzy2,ftcb2bkzy1,gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx2zy1").focus();
			alert("院校2:"+ftcbbzy2+"或专业1代码:"+ftcb2bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcb2bkzy2 != ""){
		if(!ajaxFunction(ftcbbzy2,ftcb2bkzy2,gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx2zy2").focus();
			alert("院校2:"+ftcbbzy2+"或专业2代码:"+ftcb2bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbbzy3!=""){
		if(!ajaxFunction(ftcbbzy3,'',gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx3").focus();
			if(msg==""){
				alert("院校3代码:"+ftcbbzy3+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	if(ftcb3bkzy1 != ""){
		if(!ajaxFunction(ftcbbzy3,ftcb3bkzy1,gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx3zy1").focus();
			alert("院校3:"+ftcbbzy3+"或专业1代码:"+ftcb3bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcb3bkzy2 != ""){
		if(!ajaxFunction(ftcbbzy3,ftcb3bkzy2,gqbVal)){
			$("#gqbpc"+gqbVal+"bkyx3zy2").focus();
			alert("院校3:"+ftcbbzy3+"或专业2代码:"+ftcb3bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}		
	if(ftcbymjhbzy1!=""){
		if(!ajaxFunction(ftcbymjhbzy1,'','9')){
			$("#gqbpc9bkyx1").focus();
			if(msg==""){
				alert("院校1代码:"+ftcbymjhbzy1+"错误");
			}else{
				alert(msg);
			}
			return false;
		}
	}
	if(ftcbymjhbkzy1 != ""){
		if(!ajaxFunction(ftcbymjhbzy1,ftcbymjhbkzy1,'9')){
			$("#gqbpc9bkyx1zy1").focus();
			alert("院校1:"+ftcbymjhbzy1+"或专业1代码:"+ftcbymjhbkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbymjhbkzy2 != ""){
		if(!ajaxFunction(ftcbymjhbzy1,ftcbymjhbkzy2,'9')){
			$("#gqbpc9bkyx1zy2").focus();
			alert("院校1:"+ftcbymjhbzy1+"或专业2代码:"+ftcbymjhbkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	zysj1 = gqbzy1 + gqbbkzy1 + gqbbkzy2 + tcbbzy1 + tcb1bkzy1 + tcb1bkzy2 + tcbbzy2 + tcb2bkzy1 + tcb2bkzy2 + ftcbbzy1 + ftcb1bkzy1 + ftcb1bkzy2 + ftcbbzy2 + ftcb2bkzy1 + ftcb2bkzy2 + ftcbbzy3 + ftcb3bkzy1 + ftcb3bkzy2 + ftcbymjhbzy1  + ftcbymjhbkzy1 + ftcbymjhbkzy2;
	return true;
}

function checkGqg(){
	
	var tcbbzy1 = $.trim($("#gqgpc3bkyx1").val());// 高中起点专科 --脱产班
	var tcb1bkzy1 = $.trim($("#gqgpc3bkyx1zy1").val());// 专业1
	var tcb1bkzy2 = $.trim($("#gqgpc3bkyx1zy2").val());// 专业2
	
	var tcbbzy2 = $.trim($("#gqgpc3bkyx2").val());// 高中起点专科 --脱产班
	var tcb2bkzy1 = $.trim($("#gqgpc3bkyx2zy1").val());// 专业1
	var tcb2bkzy2 = $.trim($("#gqgpc3bkyx2zy2").val());// 专业2

	var ftcbbzy1 = $.trim($("#gqgpc4bkyx1").val());// 高中起点专科 --非脱产班
	var ftcb1bkzy1 = $.trim($("#gqgpc4bkyx1zy1").val());// 专业1
	var ftcb1bkzy2 = $.trim($("#gqgpc4bkyx1zy2").val());// 专业2
	
	var ftcbbzy2 = $.trim($("#gqgpc4bkyx2").val());// 高中起点专科 --非脱产班
	var ftcb2bkzy1 = $.trim($("#gqgpc4bkyx2zy1").val());// 专业1
	var ftcb2bkzy2 = $.trim($("#gqgpc4bkyx2zy2").val());// 专业2
	
	var ftcbbzy3 = $.trim($("#gqgpc4bkyx3").val());// 高中起点专科 --非脱产班
	var ftcb3bkzy1 = $.trim($("#gqgpc4bkyx3zy1").val());// 专业1
	var ftcb3bkzy2 = $.trim($("#gqgpc4bkyx3zy2").val());// 专业2
	
	var ftcbymjhbzy1 = $.trim($("#gqgpc9bkyx1").val());// 高中起点专科 --非脱产班(圆梦计划)
	var ftcbymjh1bkzy1 = $.trim($("#gqgpc9bkyx1zy1").val());// 专业1
	var ftcbymjh1bkzy2 = $.trim($("#gqgpc9bkyx1zy2").val());// 专业2
	
	/**var ftcbymjhbzy2 = $.trim($("#gqgpc9bkyx2").val());// 高中起点专科 --非脱产班
	var ftcbymjh2bkzy1 = $.trim($("#gqgpc9bkyx2zy1").val());// 专业1
	var ftcbymjh2bkzy2 = $.trim($("#gqgpc9bkyx2zy2").val());// 专业2
	
	var ftcbymjhbzy3 = $.trim($("#gqgpc9bkyx3").val());// 高中起点专科 --非脱产班
	var ftcbymjh3bkzy1 = $.trim($("#gqgpc9bkyx3zy1").val());// 专业1
	var ftcbymjh3bkzy2 = $.trim($("#gqgpc9bkyx3zy2").val());// 专业2**/
	
	var gqgVal = "4"//$('input[name="gqgradio"]:checked').val();//获取选中的
	//if(gqgVal=="4"){
		if(tcbbzy1=="" && tcbbzy2=="" && ftcbbzy1==""&& ftcbbzy2=="" && ftcbbzy3=="" && ftcbymjhbzy1 == ""){
			alert("请至少填写一个志愿");
			return false;
		}
	/**}else{
		if(tcbbzy1=="" && tcbbzy2=="" && ftcbymjhbzy1==""&& ftcbymjhbzy2=="" && ftcbymjhbzy3==""){
			alert("请至少填写一个志愿");
			return false;
		}
	}**/
	if(tcbbzy1 != ""){
		if(!checkZyxx("gqgpc3bkyx1","院校")){
			return false;
		}
	}
	if(tcb1bkzy1 != ""){
		if(!checkZyxx("gqgpc3bkyx1zy1","专业")){
			return false;
		}
	}
	if(tcb1bkzy2 != ""){
		if(!checkZyxx("gqgpc3bkyx1zy2","专业")){
			return false;
		}
	}
	if(tcbbzy2 != ""){
		if(!checkZyxx("gqgpc3bkyx2","院校")){
			return false;
		}
	}
	if(tcb2bkzy1 != ""){
		if(!checkZyxx("gqgpc3bkyx2zy1","专业")){
			return false;
		}
	}
	if(tcb2bkzy2 != ""){
		if(!checkZyxx("gqgpc3bkyx2zy2","专业")){
			return false;
		}
	}
	
	if(tcbbzy1==""){
		if(tcb1bkzy1 !="" || tcb1bkzy2 != "" || tcbbzy2 != ""){
			$("#gqgpc3bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
	}else if(tcbbzy1 !=""){
		if(tcb1bkzy1 =="" && tcb1bkzy2 == ""){
			$("#gqgpc3bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(tcb1bkzy1 =="" && tcb1bkzy2 == ""){
			$("#gqgpc3bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(tcb1bkzy1 !="" && tcb1bkzy2 != "" && tcb1bkzy1==tcb1bkzy2 ){
			$("#gqgpc3bkyx1zy2").focus();
			alert("专业1:"+tcb1bkzy1+"与专业2:"+tcb1bkzy2+"相同");
			return false;
		}else if(tcb1bkzy1 =="" && tcb1bkzy2 != ""){
			$("#gqgpc3bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		
	}
	
	if(tcbbzy2==""){
		if(tcb2bkzy1 !="" || tcb2bkzy2 != ""){
			$("#gqgpc3bkyx2").focus();
			alert("请填写院校2代码");
			return false;
		}
	}else if(tcbbzy2 !=""){
		if(tcbbzy1 == ""){
			$("#gqgpc3bkyx1").focus();
			alert("院校2代码不为空，请按顺序填写脱产班院校1");
			return false;
		}
		if(tcbbzy1 == tcbbzy2 && tcbbzy1!=""){
			$("#gqgpc3bkyx2").focus();
			alert("院校2代码:"+tcbbzy1+"与院校1代码:"+tcbbzy2+"相同");
			return false;
		}
		if(tcb2bkzy1 =="" && tcb2bkzy2 == ""){
			$("#gqgpc3bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(tcb2bkzy1 =="" && tcb2bkzy2 == ""){
			$("#gqgpc3bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(tcb2bkzy1 !="" && tcb2bkzy2 != "" && tcb2bkzy1==tcb2bkzy2 ){
			$("#gqgpc3bkyx2zy2").focus();
			alert("专业1:"+tcb2bkzy1+"与专业2:"+tcb2bkzy2+"相同");
			return false;
		}else if(tcb2bkzy1 =="" && tcb2bkzy2 != ""){
			$("#gqgpc3bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		
	}
	//if(gqgVal=="4"){
	if(ftcbbzy1 != ""){
		if(!checkZyxx("gqgpc4bkyx1","院校")){
			return false;
		}
	}
	if(ftcb1bkzy1 != ""){
		if(!checkZyxx("gqgpc4bkyx1zy1","专业")){
			return false;
		}
	}
	if(ftcb1bkzy2 != ""){
		if(!checkZyxx("gqgpc4bkyx1zy2","专业")){
			return false;
		}
	}
	if(ftcbbzy2 != ""){
		if(!checkZyxx("gqgpc4bkyx2","院校")){
			return false;
		}
	}
	if(ftcb2bkzy1 != ""){
		if(!checkZyxx("gqgpc4bkyx2zy1","专业")){
			return false;
		}
	}
	if(ftcb2bkzy2 != ""){
		if(!checkZyxx("gqgpc4bkyx2zy2","专业")){
			return false;
		}
	}
	if(ftcbbzy1==""){
		if(ftcb1bkzy1 !="" || ftcb1bkzy2 != "" || ftcbbzy2 != ""){
			$("#gqgpc4bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
	}else if(ftcbbzy1 !=""){
		/***********************************************************************
		 * *if(ftcbbzy1 == tcbbzy1 && tcbbzy1 !=""){ $("#gqgpc4bkyx1").focus();
		 * alert("非脱产班院校1代码:"+ftcbbzy1+"与脱产班院校1代码:"+tcbbzy1+"相同"); return false; }
		 * if(ftcbbzy1 == tcbbzy2 && tcbbzy2 !=""){ $("#gqgpc4bkyx1").focus();
		 * alert("非脱产班院校1代码:"+ftcbbzy1+"与脱产班院校2代码:"+tcbbzy2+"相同"); return false; }
		 **********************************************************************/
		if(ftcb1bkzy1 =="" && ftcb1bkzy2 == ""){
			$("#gqgpc4bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		
		if(ftcb1bkzy1 =="" && ftcb1bkzy2 == ""){
			$("#gqgpc4bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb1bkzy1 !="" && ftcb1bkzy2 != "" && ftcb1bkzy1==ftcb1bkzy2 ){
			$("#gqgpc4bkyx1zy2").focus();
			alert("专业1:"+ftcb1bkzy1+"与专业2:"+ftcb1bkzy2+"相同");
			return false;
		}else if(ftcb1bkzy1 =="" && ftcb1bkzy2 != ""){
			$("#gqgpc4bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
	}
	
	
	if(ftcbbzy2==""){
		if(ftcb2bkzy1 !="" || ftcb2bkzy2 != ""){
			$("#gqgpc4bkyx2").focus();
			alert("请填写院校2代码");
			return false;
		}
	}else if(ftcbbzy2 !=""){
		/***********************************************************************
		 * *if(ftcbbzy2 == tcbbzy1 && tcbbzy1 !=""){ $("#gqgpc4bkyx2").focus();
		 * alert("非脱产班院校2代码:"+ftcbbzy2+"与脱产班院校1代码:"+tcbbzy1+"相同"); return false; }
		 * if(ftcbbzy2 == tcbbzy2 && tcbbzy2 !=""){ $("#gqgpc4bkyx2").focus();
		 * alert("非脱产班院校2代码:"+ftcbbzy2+"与脱产班院校2代码:"+tcbbzy2+"相同"); return false; }
		 **********************************************************************/
		if(ftcbbzy2 == ftcbbzy1 && ftcbbzy1 !=""){
			$("#gqgpc4bkyx2").focus();
			alert("院校2代码:"+ftcbbzy2+"与院校1代码:"+ftcbbzy1+"相同");
			return false;
		}
		if(ftcbbzy1 =="" && ftcbbzy2!=""){
			$("#gqgpc4bkyx1").focus();
			alert("院校2代码不为空，请按顺序填写非脱产班院校1代码");
			return false;
		}
		if(ftcb2bkzy1 =="" && ftcb2bkzy2 == ""){
			$("#gqgpc4bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb2bkzy1 =="" && ftcb2bkzy2 == ""){
			$("#gqgpc4bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb2bkzy1 !="" && ftcb2bkzy2 != "" && ftcb2bkzy1==ftcb2bkzy2 ){
			$("#gqgpc4bkyx2zy2").focus();
			alert("专业1:"+ftcb2bkzy1+"与专业2:"+ftcb2bkzy2+"相同");
			return false;
		}else if(ftcb2bkzy1 =="" && ftcb2bkzy2 != ""){
			$("#gqgpc4bkyx2zy1").focus();
			alert("请填写专业1");
			return false;
		}
	}
	
	
	if(ftcbbzy3 != ""){
		if(!checkZyxx("gqgpc4bkyx3","院校")){
			return false;
		}
	}
	if(ftcb3bkzy1 != ""){
		if(!checkZyxx("gqgpc4bkyx3zy1","专业")){
			return false;
		}
	}
	if(ftcb3bkzy2 != ""){
		if(!checkZyxx("gqgpc4bkyx3zy2","专业")){
			return false;
		}
	}
	
	if(ftcbbzy3==""){
		if(ftcb3bkzy1 !="" || ftcb3bkzy2 != ""){
			$("#gqgpc4bkyx3").focus();
			alert("请填写院校3");
			return false;
		}
	}else if(ftcbbzy3 !=""){
		/***********************************************************************
		 * *if(ftcbbzy3 == tcbbzy1 && tcbbzy1 !=""){ $("#gqgpc4bkyx3").focus();
		 * alert("非脱产班院校3代码:"+ftcbbzy3+"与脱产班院校1代码:"+tcbbzy1+"相同"); return false; }
		 * if(ftcbbzy3 == tcbbzy2 && tcbbzy2 !=""){ $("#gqgpc4bkyx3").focus();
		 * alert("非脱产班院校3代码:"+ftcbbzy3+"与脱产班院校2代码:"+tcbbzy2+"相同"); return false; }
		 **********************************************************************/
		if(ftcbbzy3 == ftcbbzy1 && ftcbbzy1 !=""){
			$("#gqgpc4bkyx3").focus();
			alert("院校3："+ftcbbzy3+"代码与院校1:"+ftcbbzy1+"代码相同");
			return false;
		}
		if(ftcbbzy3 == ftcbbzy2 && ftcbbzy2 !=""){
			$("#gqgpc4bkyx3").focus();
			alert("院校3代码:"+ftcbbzy3+"与院校2代码:"+ftcbbzy2+"相同");
			return false;
		}
		if(ftcbbzy1 =="" && ftcbbzy3!=""){
			$("#gqgpc4bkyx1").focus();
			alert("院校3代码不为空，请按顺序填写院校1代码");
			return false;
		}
		if(ftcbbzy2 =="" && ftcbbzy3!=""){
			$("#gqgpc4bkyx2").focus();
			alert("院校3代码不为空，请按顺序填写院校2代码");
			return false;
		}
		if(ftcb3bkzy1 =="" && ftcb3bkzy2 == ""){
			$("#gqgpc4bkyx3zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb3bkzy1 =="" && ftcb3bkzy2 == ""){
			$("#gqgpc4bkyx3zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcb3bkzy1 !="" && ftcb3bkzy2 != "" && ftcb3bkzy1==ftcb3bkzy2 ){
			$("#gqgpc4bkyx3zy2").focus();
			alert("专业1："+ftcb3bkzy1+"与专业2："+ftcb3bkzy2+"相同");
			return false;
		}else if(ftcb3bkzy1 =="" && ftcb3bkzy2 != ""){
			$("#gqgpc4bkyx3zy1").focus();
			alert("请填写专业1");
			return false;
		}
	}
//}else{
	if(ftcbymjhbzy1 != ""){
		if(!checkZyxx("gqgpc9bkyx1","院校")){
			return false;
		}
		if(ftcbymjh1bkzy1 =="" && ftcbymjh1bkzy2 ==""){
			$("#gqgpc9bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
	}
	if(ftcbymjh1bkzy1 != ""){
		if(ftcbymjhbzy1 == ""){
			$("#gqgpc9bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
		if(!checkZyxx("gqgpc9bkyx1zy1","专业")){
			return false;
		}
	}
	if(ftcbymjh1bkzy2 != ""){
		if(ftcbymjh1bkzy1 == ""){
			$("#gqgpc9bkyx1zy1").focus();
			alert("请按顺序填写专业1代码");
			return false;
		}
		if(!checkZyxx("gqgpc9bkyx1zy2","专业")){
			return false;
		}
	}
	if(ftcbymjh1bkzy1 != "" && ftcbymjh1bkzy2 != "" && ftcbymjh1bkzy1 == ftcbymjh1bkzy2){
		$("#gqgpc9bkyx1zy2").focus();
		alert("专业1代码:"+ftcbymjh1bkzy1+"与专业2代码:"+ftcbymjh1bkzy2+"相同");
		return false;
	}
	/**if(ftcbymjhbzy2 != ""){
		if(!checkZyxx("gqgpc9bkyx2","院校")){
			return false;
		}
	}
	if(ftcbymjh2bkzy1 != ""){
		if(!checkZyxx("gqgpc9bkyx2zy1","专业")){
			return false;
		}
	}
	if(ftcbymjh2bkzy2 != ""){
		if(!checkZyxx("gqgpc9bkyx2zy2","专业")){
			return false;
		}
	}**/
	if(ftcbymjhbzy1==""){
		if(ftcbymjh1bkzy1 !="" || ftcbymjh1bkzy2 != "" /**|| ftcbymjhbzy2 != ""**/){
			$("#gqgpc9bkyx1").focus();
			alert("请填写院校1代码");
			return false;
		}
	}else if(ftcbymjhbzy1 !=""){
		/***********************************************************************
		 * *if(ftcbbzy1 == tcbbzy1 && tcbbzy1 !=""){ $("#gqgpc4bkyx1").focus();
		 * alert("非脱产班院校1代码:"+ftcbbzy1+"与脱产班院校1代码:"+tcbbzy1+"相同"); return false; }
		 * if(ftcbbzy1 == tcbbzy2 && tcbbzy2 !=""){ $("#gqgpc4bkyx1").focus();
		 * alert("非脱产班院校1代码:"+ftcbbzy1+"与脱产班院校2代码:"+tcbbzy2+"相同"); return false; }
		 **********************************************************************/
		if(ftcbymjh1bkzy1 =="" && ftcbymjh1bkzy2 == ""){
			$("#gqgpc9bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		
		if(ftcbymjh1bkzy1 =="" && ftcbymjh1bkzy2 == ""){
			$("#gqgpc9bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
		if(ftcbymjh1bkzy1 !="" && ftcbymjh1bkzy2 != "" && ftcbymjh1bkzy1==ftcbymjh1bkzy2 ){
			$("#gqgpc9bkyx1zy2").focus();
			alert("专业1:"+ftcbymjh1bkzy1+"与专业2:"+ftcbymjh1bkzy2+"相同");
			return false;
		}else if(ftcbymjh1bkzy1 =="" && ftcbymjh1bkzy2 != ""){
			$("#gqgpc9bkyx1zy1").focus();
			alert("请填写专业1");
			return false;
		}
	}
	
	
	if(tcbbzy1!=""){
		if(!ajaxFunction(tcbbzy1,'','3')){
			$("#gqgpc3bkyx1").focus();
			alert("院校1代码:"+tcbbzy1+"错误");
			return false;
		}
	}	
	if(tcb1bkzy1 != ""){
		if(!ajaxFunction(tcbbzy1,tcb1bkzy1,'3')){
			$("#gqgpc3bkyx1zy1").focus();
			alert("院校1:"+tcbbzy1+"或专业1代码:"+tcb1bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcb1bkzy2 != ""){
		if(!ajaxFunction(tcbbzy1,tcb1bkzy2,'3')){
			$("#gqgpc3bkyx1zy2").focus();
			alert("院校1:"+tcbbzy1+"或专业2代码:"+tcb1bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcbbzy2!=""){
		if(!ajaxFunction(tcbbzy2,'','3')){
			$("#gqgpc3bkyx2").focus();
			alert("院校2代码:"+tcbbzy2+"错误");
			return false;
		}
	}
	if(tcb2bkzy1 != ""){
		if(!ajaxFunction(tcbbzy2,tcb2bkzy1,'3')){
			$("#gqgpc3bkyx2zy1").focus();
			alert("院校2:"+tcbbzy2+"或专业1代码:"+tcb2bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(tcb2bkzy2 != ""){
		if(!ajaxFunction(tcbbzy2,tcb2bkzy2,'3')){
			$("#gqgpc3bkyx2zy2").focus();
			alert("院校2:"+tcbbzy2+"或专业2代码:"+tcb2bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
//if(gqgVal=="4"){
	if(ftcbbzy1!=""){
		if(!ajaxFunction(ftcbbzy1,'','4')){
			$("#gqgpc4bkyx1").focus();
			alert("院校1代码:"+ftcbbzy1+"错误");
			return false;
		}
	}
	if(ftcb1bkzy1 != ""){
		if(!ajaxFunction(ftcbbzy1,ftcb1bkzy1,'4')){
			$("#gqgpc4bkyx1zy1").focus();
			alert("院校1:"+ftcbbzy1+"或专业1代码:"+ftcb1bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcb1bkzy2 != ""){
		if(!ajaxFunction(ftcbbzy1,ftcb1bkzy2,'4')){
			$("#gqgpc4bkyx1zy2").focus();
			alert("院校1:"+ftcbbzy1+"或专业2代码:"+ftcb1bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbbzy2!=""){
		if(!ajaxFunction(ftcbbzy2,'','4')){
			$("#gqgpc4bkyx2").focus();
			alert("院校2代码:"+ftcbbzy2+"错误");
			return false;
		}
	}
	if(ftcb2bkzy1 != ""){
		if(!ajaxFunction(ftcbbzy2,ftcb2bkzy1,'4')){
			$("#gqgpc4bkyx2zy1").focus();
			alert("院校2:"+ftcbbzy2+"或专业1代码:"+ftcb2bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcb2bkzy2 != ""){
		if(!ajaxFunction(ftcbbzy2,ftcb2bkzy2,'4')){
			$("#gqgpc4bkyx2zy2").focus();
			alert("院校2:"+ftcbbzy2+"或专业2代码:"+ftcb2bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbbzy3!=""){
		if(!ajaxFunction(ftcbbzy3,'','4')){
			$("#gqgpc4bkyx3").focus();
			alert("院校3代码:"+ftcbbzy3+"错误");
			return false;
		}
	}
	if(ftcb3bkzy1 != ""){
		if(!ajaxFunction(ftcbbzy3,ftcb3bkzy1,'4')){
			$("#gqgpc4bkyx3zy1").focus();
			alert("院校3:"+ftcbbzy3+"或专业1代码:"+ftcb3bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcb3bkzy2 != ""){
		if(!ajaxFunction(ftcbbzy3,ftcb3bkzy2,'4')){
			$("#gqgpc4bkyx3zy2").focus();
			alert("院校3:"+ftcbbzy3+"或专业2代码:"+ftcb3bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
//}else{
	if(ftcbymjhbzy1!=""){
		if(!ajaxFunction(ftcbymjhbzy1,'','9')){
			$("#gqgpc9bkyx1").focus();
			alert("院校1代码:"+ftcbymjhbzy1+"错误");
			return false;
		}
	}
	if(ftcbymjh1bkzy1 != ""){
		if(!ajaxFunction(ftcbymjhbzy1,ftcbymjh1bkzy1,'9')){
			$("#gqgpc9bkyx1zy1").focus();
			alert("院校1:"+ftcbymjhbzy1+"或专业1代码:"+ftcbymjh1bkzy1+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	if(ftcbymjh1bkzy2 != ""){
		if(!ajaxFunction(ftcbymjhbzy1,ftcbymjh1bkzy2,'9')){
			$("#gqgpc9bkyx1zy2").focus();
			alert("院校1:"+ftcbymjhbzy1+"或专业2代码:"+ftcbymjh1bkzy2+"错误，请仔细校对报考科类、科目组以及批次");
			return false;
		}
	}
	zysj1 = tcbbzy1 + tcb1bkzy1 + tcb1bkzy2 + tcbbzy2 + tcb2bkzy1 + tcb2bkzy2 + ftcbbzy1 + ftcb1bkzy1 + ftcb1bkzy2 + ftcbbzy2 + ftcb2bkzy1 + ftcb2bkzy2 + ftcbbzy3 + ftcb3bkzy1 + ftcb3bkzy2 + ftcbymjhbzy1 + ftcbymjh1bkzy1 + ftcbymjh1bkzy2;
	return true;
}

function checkZyxx(id,msg){
	var dm = $.trim($("#"+id).val());
	if(dm != ""){
	if(msg=="专业" && dm.length !=4){
		$("#"+id).focus();
		alert("专业代码长度为4");
		return false;
	}else if(msg=="院校" && dm.length !=5){
		$("#"+id).focus();
		alert("院校代码长度为5");
		return false;
	}
	if(!isnumeric(dm)){
		$("#"+id).focus();
		alert(msg+'代码必须为数字');
		return false;
	  }
	}
	return true;
}

function checkForm(){
	//alert("成人高考报名未开始或已结束！");
	//return;
	if(!checkJzz()){
		return;
	}
	var hkdm = $.trim($("#hkdm").val());
	if(hkdm == ""){
		alert('检测不到户口所在地信息，请重新登录');
		return false;
	}
	var xqdm = $('#xqdm').val();
	var xq = xqdm.substr(0,2);
	var hk = hkdm.substr(2,2);
	if(xq != hk || "3" == smyzbj || "4" == smyzbj || "0" == smyzbj) {
		var jzzsftjbj = $("#jzzsftjbj").val();
		if(jzzsftjbj != 1) {
			alert('请提交居住证附件！');
			return false;
		}
	}
	if(!checkZzmm()){
		return;
	}
	if(!checkKsyz()){
		return ;
	}
	if(!checkKslx()){
		return ;
	}
	if(!checkKslb($("#kmzdm").val(),$("#xqdm").val())){
		return ;
	}
	if(!checkBkkl()){
		return ;
	}
	if(!checkKskmz()){
		return;
	}
	if(!checkKsxq()){
		return;
	}
	if(!checkXl()){
		return;
	}
	if(!checkZy()){
		return;
	}
	if(!checkByxx()){
		return;
	}
	if(!checkByny()){
		return;
	}
	if(!checkByzy()){
		return;
	}
	if(!checkZshmByrq()){
		return;
	}
	if(!checkYzbm()){
		return;
	}
	if(!checkLxdh()){
		return;
	}
	if(!checkTxdz()){
		return;
	}
	if(!checkBmd()){
		return;
	}
	if($.trim($("#czbj").val()) == "0"){
		if(!isHqsjyzm){
			alert("请先获取验证码！");
			return;
		}
		var yzm = $.trim($("#yzm").val());
		if (yzm ==  "" || yzm.length != 6) {
			alert("请输入6位手机验证码！");
			$("#yzm").focus();
			return;
		}
	}else{
		if(!checkMm()){
			return;
		}
	}
	if($.trim($("#kslbdm").val())=="1"){
		if(!checkZsb()){
			return;
		}
		if ($("#czbj").val() == "1" && $("#sjbdbj").val() == "1" && zysj0 != zysj1) {
			checkKszy();
		} else {
			if ($.trim($("#kslxdm").val())=="1") {	//免试生提示办理验核手续
				doMssPop();
			} else {
				document.form1.submit();
			}
		}
	}else if($.trim($("#kslbdm").val())=="4"){
		if(!checkGqb()){
			return;
		}
		if ($("#czbj").val() == "1" && $("#sjbdbj").val() == "1" && zysj0 != zysj1) {
			checkKszy();
		} else {
			if ($.trim($("#kslxdm").val())=="1") {	//免试生提示办理验核手续
				doMssPop();
			} else {
				document.form1.submit();
			}
		}
	}else if($.trim($("#kslbdm").val())=="5"){
		if(!checkGqg()){
			return;
		}
		if ($("#czbj").val() == "1" && $("#sjbdbj").val() == "1" && zysj0 != zysj1) {
			checkKszy();
		} else {
			if ($.trim($("#kslxdm").val())=="1") {	//免试生提示办理验核手续
				doMssPop();
			} else {
				document.form1.submit();
			}
		}
	}
}

function doMssPop() {
	var mssPop = juicer($('#mssPop').html());
	var addHtmlform = mssPop.render({});
	var index = layer.open({
		  type: 1,
		  content: addHtmlform,
		  title: "免试验核手续提示",
		  area: ['530px', '300px'],
		  closeBtn: 0,
		  maxmin: false
	});
}

function submit() {
	document.form1.submit();
}

function checkKszy(){
	var lxsj = $("#lxsj").val();
	$.ajax({
		type : 'POST',
		dataType : 'json',
	    url: path + "/checkKszyServlet",
		data : 'method=checkKszy&' + $('#baseform').serialize(),
		success : function(data){
			if (data.type == 1) {
				//短信验证
				var sjyzPop = juicer($('#sjyzPop').html());
				var addHtmlform = sjyzPop.render({data:lxsj});
				var index = layer.open({
					  type: 1,
					  content: addHtmlform,
					  title: "手机验证",
					  area: ['530px', '300px'],
					  maxmin: false
				});
			}
			if (data.type == 0) {
				alert(data.msg);
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown.message);
    	}
	});
}

function getSjyzm(o) {
	isHqsjyzm = true;
	$.ajax({
		type : 'POST',
		dataType : 'json',
		url: path + "/checkKszyServlet",
		data : 'method=getSjyzm',
		success : function(data){
			if (data.type == 1) {
				alert(data.msg);
				time(o,90);
			}
			if (data.type == 0) {
				alert(data.msg);
			}
			if (data.type == 2) {
				alert(data.msg);
				window.location.href = "login.jsp";
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert(errorThrown.message);
		}
	});
}

function time(o, sj) {
    var wait = sj;

    if(wait == 0) {
      o.removeAttribute("disabled");
      o.value = "获取验证码";
    } else {
      o.setAttribute("disabled", true);
      o.value = " " + wait + " 秒后，可以重新获取";
      wait--;
      setTimeout(function() {time(o,wait)},1000);
    }
}

function sjyz() {
	var sjyzm = $.trim($("#sjyzm").val());
	if (sjyzm ==  "" || sjyzm.length != 6) {
		alert("请输入6位手机验证码！");
		$("#sjyzm").focus();
		return;
	}
	$("#xgzysjyzm").val(sjyzm);
	if ($.trim($("#kslxdm").val())=="1") {	//免试生提示办理验核手续
		doMssPop();
	} else {
		document.form1.submit();
	}
	
}

function ajaxFunction(yxdm,zydm,ccdm){
	var byrq = $.trim($('#byrq').val());
	var byzshm = $.trim($('#byzshm').val());
	var kslbdm = $.trim($('#kslbdm').val());
	var kqxl = "0";
	if(kslbdm=="1"){
		if('待定'==byzshm){
			kqxl = "1";
		}
	}
	msg = "";
	var flag = false;
	var jhlbdm = $("#jhlbdm").val();
	var kmzdm = $("#kmzdm").val();
	$.ajax({type : "POST",
	 	url : "checkZy.do",
	 	data:{"kqxl":kqxl,"yxdm":yxdm,"zydm":zydm,"ccdm":ccdm,"jhlbdm":jhlbdm,"kmzdm":kmzdm},
		async : false,
		success : function(data){
			if(data=="true"){
				flag = true;
			}else if(data=="error") {	
				msg = "您是未取得专科毕业证的应届专科毕业生，报考我省成人高等学校（不含外省高校在我省设立的校外教学点）";
			}else{
				
			}
		}
	});	
	return flag;
}


/** 计算字符串长度 */
function getlength(value) {
	var realLength = 0, len = value.length, charCode = -1;
	for ( var i = 0; i < len; i++) {
		charCode = value.charCodeAt(i);
		if (charCode >= 0 && charCode <= 128)
			realLength += 1;
		else
			realLength += 2;
	}
	return realLength;
}


function scjzzcl(){
	var jzzszd = $('#jzzszd').val();
	var xqdm = $('#xqdm').val();
	var hkdm = $('#hkdm').val();
	var xq = xqdm.substr(0,2);
	var hk = hkdm.substr(2,2);
	if(xq == hk && ("1" == smyzbj || "2" == smyzbj)) {
		alert("在户籍地市考试无需上传居住证！");
		return;
	}
	var file = $("#jzzcl").val();
	 if(!file){
		 alert("请选择附件！");
		 return;
	 }
	 if($("#jzzcl")[0].files[0].size > maxfjsize){
		alert("请选择大小在"+ms+"以内的文件上传！");
		isSubmiting = false;
		return;
	}
	 var suffix = file.split(".");
		var u = "";
		if (suffix.length > 0 && (suffix[suffix.length-1].toLowerCase() == 'pdf'
				||suffix[suffix.length-1].toLowerCase() == 'png'||suffix[suffix.length-1].toLowerCase() == 'jpg')) {
			u = contextPath + "/ksjzzclServlet?method=fileDownload&wjlx=" + suffix[suffix.length - 1].toLowerCase();
		} else {
			alert("请选择jpg、png或者pdf格式图片文件！");
			isSubmiting = false;
			return;
		}
		$.ajaxFileUpload({
			type: "POST",
			url: contextPath + "/ksjzzclServlet?method=fileUpload",
			data: '',//文本数据
			secureuri : false,//是否启用安全提交，默认为false
			fileElementId: "jzzcl",// 文件上传表单的id <input type="file" id="fileUpload" name="file" />
			dataType: 'json',//服务器返回的格式
			async : false,
			success: function(data){
				if (data.code >= 0) {
					$("#jzzcltip").html("已上传&nbsp;<a href='"+u+"' target='_blank' style='color: blue;margin-left: 5px;'>下载</a>");
					$("#scjzz").val("重新上传");
					$("#jzzbj").val("1");
					$("#jzzwjlx").val(suffix[suffix.length-1].toLowerCase());
					$("#jzzcl").val("");
					$("#jzzsftjbj").val("0");
				}
				alert(decodeURI(data.msg));
			},
			error:function(data,status,e){
				alert("系统错误");
			}
		});
}


function hqsjyzm(o){
	isHqsjyzm = true;
	if(!checkJzz()){
		return;
	}
	var hkdm = $('#hkdm').val();
	var xqdm = $('#xqdm').val();
	var xq = xqdm.substr(0,2);
	var hk = hkdm.substr(2,2);
	if(xq != hk || "3" == smyzbj || "4" == smyzbj || "0" == smyzbj) {
		var jzzsftjbj = $("#jzzsftjbj").val();
		if(jzzsftjbj != 1) {
			alert('请提交居住证附件！');
			return false;
		}
	}
	if(!checkZzmm()){
		return;
	}
	if(!checkKsyz()){
		return ;
	}
	if(!checkKslx()){
		return ;
	}
	if(!checkKslb($("#kmzdm").val(),$("#xqdm").val())){
		return ;
	}
	if(!checkBkkl()){
		return ;
	}
	if(!checkKskmz()){
		return;
	}
	if(!checkKsxq()){
		return;
	}
	if(!checkXl()){
		return;
	}
	if(!checkZy()){
		return;
	}
	if(!checkByxx()){
		return;
	}
	if(!checkByny()){
		return;
	}
	if(!checkByzy()){
		return;
	}
	if(!checkZshmByrq()){
		return;
	}
	if(!checkYzbm()){
		return;
	}
	if(!checkLxdh()){
		return;
	}
	if(!checkTxdz()){
		return;
	}
	if(!checkBmd()){
		return;
	}
	if($.trim($("#kslbdm").val())=="1"){
		if(!checkZsb()){
			return;
		}
	}else if($.trim($("#kslbdm").val())=="4"){
		if(!checkGqb()){
			return;
		}
	}else if($.trim($("#kslbdm").val())=="5"){
		if(!checkGqg()){
			return;
		}
	}
	var czbj = $.trim($("#czbj").val());
	$.ajax({
		type : 'POST',
		url: contextPath + "/kszcServlet?method=bczlyzm",
		data: {
			 "czbj":czbj
		 },
		 dataType : 'json',
		success : function(data){
			if (data.retCode == 1) {
				alert(data.msg);
				time(o,90);
			}else{
				alert(data.msg);
				return;
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//alert(data);
			alert(errorThrown.message);
		}
	});
}

function initSf(){
	$("#sf option:not(:first)").remove();
	for(var i = 0; i < ssxzs.length; i++){
		if(ssxzs[i].depth == 1){
			$("#sf").append("<option value='"+ssxzs[i].code+"'>"+ssxzs[i].name+"</option> ");
		}
	}
}

function sfchange(){
	$("#ds option:not(:first)").remove();
	$("#xq option:not(:first)").remove();
	$("#jd option:not(:first)").remove();
	
	var sf = $("#sf").val();
	if(sf == '71' || sf == '81' || sf == '82' || sf == '99'){
		$("#ds").attr('disabled','disabled');
		$("#xq").attr('disabled','disabled');
		$("#jd").attr('disabled','disabled');
	}else{
		$("#ds").removeAttr('disabled');
		$("#xq").removeAttr('disabled');
		$("#jd").removeAttr('disabled');
	}
	for(var i = 0; i < ssxzs.length; i++){
		var area = ssxzs[i];
		if(area.depth == 2 && area.code.substring(0,2) == sf){
			$("#ds").append("<option value='"+area.code+"'>"+area.name+"</option> ");
		}
	}
}

function dschange(){
	$("#xq option:not(:first)").remove();
	$("#jd option:not(:first)").remove();
	var ds = $("#ds").val();
	for(var i = 0; i < ssxzs.length; i++){
		var area = ssxzs[i];
		if(area.depth == 3 && area.code.substring(0,4) == ds){
			$("#xq").append("<option value='"+area.code+"'>"+area.name+"</option> ");
		}
	}
}

function checkJzzszd(){
	var jzzszd = $("#jzzszd").val();
	/*if(jzzszd == ''){
		$("#jzzbj").val("0");
		$("#jzzwjlx").val("");
	}*/
}

function jzzsubmit(){
	if(!checkJzz()){
		return;
	}
	var xqdm = $('#xqdm').val();
	var hkdm = $('#hkdm').val();
	var xq = xqdm.substr(0,2);
	var hk = hkdm.substr(2,2);
	if(xq == hk && ("1" == smyzbj || "2" == smyzbj)) {
		alert("在户籍地市考试无需上传居住证！");
		return;
	}
	var jzzszd = $.trim($("#jzzszd").val());
	var jzzbj = $.trim($("#jzzbj").val());
	var jzzwjlx = $.trim($("#jzzwjlx").val());
	if(!confirm("提交居住地市信息后，将减少1次提交次数，是否确定提交？")){
		return ;
	}
	
	$.ajax({
		type : 'POST',
		url: contextPath + "/ksjzzclServlet?method=jzzSubmit",
		data: {
			 "jzzszd":jzzszd,
			 "jzzbj":jzzbj,
			 "jzzwjlx":jzzwjlx
		 },
		 dataType : 'json',
		success : function(data){
			if (data.code >= 0) {
				alert('提交成功！');
				$("#jzzcstip").text(data.msg);
				$("#jzzsubmitBt").attr('disabled','disabled');
				$("#jzzsftjbj").val("1");
			}else{
				alert(decodeURI(data.msg));
				return;
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//alert(data);
			alert(errorThrown.message);
		}
	});
}