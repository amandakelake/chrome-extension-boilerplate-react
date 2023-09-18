var msg = "";

window.zysj0 = "";	//原志愿数据
window.zysj1 = "";	//修改后的志愿数据
window.zysjbj = "0";

function checkXm() {
	if ($.trim($("#xm").val()) == "") {
		$("#xm").focus();
		alert('请输入姓名');
		return false;
	}
	var reg = /^(?!·)[\u4e00-\u9fa5A-Z·]+(?<!·)$/;
	if(!reg.test($.trim($("#xm").val()))){
		$("#xm").focus();
		alert('姓名必须是汉字、大写字母和“·”的组合');
		return false;
	}
	return true;
}

function checkMz() {
	if ($.trim($("#mzdm").val()) == "") {
		$("#mzdm").focus();
		alert('请选择民族');
		return false;
	}
	return true;
}

function checkCsrq() {
	if ($.trim($("#csrq").val()) == "") {
		// $("#csrq").focus();
		alert('请选择出生日期');
		return false;
	}
	return true;
}
function checkHkdm() {
	if ($.trim($("#hkdm").val()) == "") {
		// $("#csrq").focus();
		alert('请选择户口所在地');
		return false;
	}
	return true;
}


function checkZjlx(){
	if ($.trim($("#zjlxdm").val()) == "") {
		$("#zjlxdm").focus();
		alert('请选择证件类型');
		return false;
	}
	return true;
}


function checkZj() {
	if ($.trim($("#zjdm").val()) == "") {
		$("#zjdm").focus();
		alert("证件号不能为空");
		return false;
	}
	if($("#zjlxdm").val() == ""){
		$("#zjlxdm").focus();
		alert("证件类型不能为空");
		return false;
	}
	if ($("#zjlxdm").val() == "1") {
		var zjdm = $("#zjdm").val();
		var idCard = trim(zjdm.replace(/ /g, "")).split("");
		if (!/^\d{17}(\d|X)$/i.test(zjdm)) {
			$("#zjdm").focus();
			alert("身份证必须为18位数字或17位数字+大写X！");
			return false;
		} else {
			var csrq = $('#csrq').val();
			if ($.trim(csrq) != '' && csrq.length == 10) {
				csrq = csrq.substring(0, 4) + csrq.substring(5, 7)
					+ csrq.substring(8, 10);
			}
			var xbdmvala = $('input:radio[name="xbdm"]:checked').val();
			if (zjdm.length == 15) {
				if (csrq.substring(2) != zjdm.substring(6, 12)) {
					$("#zjdm").focus();
					alert('身份证号上的出生日期与填入的出生日期不对');
					return false;
				} else if ((parseInt($('#zjdm').val().substring(14, 15)) % 2 == 0 && xbdmvala == 1)
					|| (parseInt($('#zjdm').val().substring(14, 15)) % 2 == 1 && xbdmvala == 2)) {
					$("#zjdm").focus();
					alert('身份证号上的性别与所选性别不对');
					return false;
				}
				if(!isValidityBrithBy15IdCard(idCard)){
					$("#zjdm").focus();
					alert('不是有效的身份证号');
					return false;
				}
			} else if (zjdm.length == 18) {
				if (csrq != zjdm.substring(6, 14)) {
					$("#zjdm").focus();
					alert('身份证号上的出生日期与填入的出生日期不对');
					return false;
				}
				if ((parseInt($('#zjdm').val().substring(16, 17)) % 2 == 0 && xbdmvala == 1)
					|| (parseInt($('#zjdm').val().substring(16, 17)) % 2 == 1 && xbdmvala == 2)) {
					$("#zjdm").focus();
					alert('身份证号上的性别与所选性别不对');
					return false;
				}
				if(!isTrueValidateCodeBy18IdCard(idCard)){
					$("#zjdm").focus();
					alert('不是有效的身份证号');
					return false;
				}
			}
		}
	}
	return true;
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
			return;
		}
		if(repeatStr(str)){
			alert('密码不能包含3个及以上重复字符！');
			return;
		}
		if(continuityStr(str)){
			alert('密码不能包含3个及以上连续字符！');
			return;
		}
	}
	return true;
}
function checkQrMm() {
	var str = $.trim($("#pwd").val());
	var qrpwd = $.trim($("#qrpwd").val());
	if(qrpwd == "" || qrpwd != str){
		$("#qrpwd").focus();
		alert('确认密码与密码不一致，请核对！');
		return false;
	}
	return true;
}

function checkLxsj(){
	//20180824,移动电话必填，没绑定都可以修改
	//var czbj = $(this).attr("czbj").value;
	//if (czbj == "0") {
	if($.trim($("#lxsj").val())==""){
		$("#lxsj").focus();
		alert("请输入移动电话");
		return false;
	}else{
		var reg =/^1[0-9]{10}$/;
		if(!reg.test($.trim($('#lxsj').val()))){
			$("#lxsj").focus();
			alert("移动电话格式错误");
			return false;
		}
//			var reg1 = /^(165|1703|1705|1706|167|1704|1707|1708|1709|171|162|1701|1702)[0-9]*$/;
//			if(reg1.test($.trim($('#lxsj').val()))){
//				$("#lxsj").focus();
//				alert("该移动电话为虚拟号段，请重新输入移动电话！");
//				return false;
//			}
	}
	//}
	return true;
}

function checkYzm() {
	if ($.trim($("#yzm").val()) == "") {
		$("#yzm").focus();
		alert('请填写验证码');
		return false;
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

function checkForm(){
	if(!checkXm()){
		return ;
	}
	if(!checkMz()){
		return ;
	}
	if(!checkCsrq()){
		return ;
	}
	if(!checkZj()){
		return ;
	}
	if(!checkHkdm()){
		return ;
	}
	if(!checkMm()){
		return ;
	}
	if(!checkLxsj()){
		return;
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

function getSjyzm(o) {
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
var isHqsjyzm = false;
function hqsjyzm(o){
	$("#hjtip").val('');
	isHqsjyzm = true;
	if(!checkXm()){
		return ;
	}
	if(!checkCsrq()){
		return ;
	}
	if(!checkZjlx()){
		return ;
	}
	if(!checkZj()){
		return ;
	}
	if(!checkMz()){
		return ;
	}
	if(!checkHkdm()){
		return ;
	}
	if(!checkMm()){
		return ;
	}
	if(!checkQrMm()){
		return ;
	}
	if(!checkLxsj()){
		return;
	}
	var csrq = $('#csrq').val();
	if ($.trim(csrq) != '' && csrq.length == 10) {
	} else {
		alert("出生日期格式不正确！");
		return;
	}
	var xm = $.trim($("#xm").val());
	var cym = $.trim($("#cym").val());
	var zjlxdm = $.trim($("#zjlxdm").val());
	var zjdm = $.trim($("#zjdm").val());
	var xbdm = $('input:radio[name="xbdm"]:checked').val();
	var mzdm = $.trim($("#mzdm").val());
	var hkdm = $.trim($("#hkdm").val());
	var pwd = $.trim($("#pwd").val());
	var qrpwd = $.trim($("#qrpwd").val());
	var lxsj = $.trim($("#lxsj").val());
	$.ajax({
		type : 'POST',
		url: path + "/checkHjxxServlet",
		data: {
			"xm":xm,
			"cym":cym,
			"zjlxdm":zjlxdm,
			"zjdm":zjdm,
			"xbdm":xbdm,
			"csrq":csrq,
			"mzdm":mzdm,
			"hkdm":hkdm,
			"pwd":pwd,
			"qrpwd":qrpwd,
			"lxsj":lxsj
		},
		dataType : 'json',
		success : function(data){
			if (data.retCode == 1) {
				alert(data.msg);
				time(o,90);
			}else if(data.retCode == '-3'){
				alert('所填信息与户籍系统不符，请检查姓名及身份证号码是否填写正确！');
				$("#hjtip").text(data.msg);
				falg = false;
				return;
			}else if(data.retCode == '-4'){
				alert('所填民族信息与户籍系统不符，请检查民族是否填写正确！');
				$("#hjtip").text(data.msg);
				falg = false;
				return;
			}else if(data.retCode == '-5'){
				alert('所填户口所在地信息与户籍系统不符，请检查户口所在地是否填写正确！');
				$("#hjtip").text(data.msg);
				falg = false;
				return;
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



function kszc(){
	var mustCheck = document.getElementById('mustCheck');
	if(!mustCheck.checked){
		layer.msg("请阅读《用户注册协议》，并勾选我已阅读并同意！", {icon:7});
		return ;
	}
	if(!checkXm()){
		return ;
	}
	if(!checkCsrq()){
		return ;
	}
	if(!checkZjlx()){
		return ;
	}
	if(!checkZj()){
		return ;
	}
	if(!checkMz()){
		return ;
	}
	if(!checkHkdm()){
		return ;
	}
	if(!checkMm()){
		return ;
	}
	if(!checkQrMm()){
		return ;
	}
	if(!checkLxsj()){
		return;
	}
	if(!checkYzm()){
		return;
	}
	var csrq = $('#csrq').val();
	if ($.trim(csrq) != '' && csrq.length == 10) {
	} else {
		alert("出生日期格式不正确！");
		return;
	}
	if(!isHqsjyzm){
		alert("请先获取手机验证码！");
		return;
	}
	var xm = $.trim($("#xm").val());
	var cym = $.trim($("#cym").val());
	var zjlxdm = $.trim($("#zjlxdm").val());
	var zjdm = $.trim($("#zjdm").val());
	var xbdm = $('input:radio[name="xbdm"]:checked').val();
	var mzdm = $.trim($("#mzdm").val());
	var hkdm = $.trim($("#hkdm").val());
	var pwd = $.trim($("#pwd").val());
	var qrpwd = $.trim($("#qrpwd").val());
	var lxsj = $.trim($("#lxsj").val());
	var yzm = $.trim($("#yzm").val());
	$.ajax({
		type : 'POST',
		url: path + "/kszcServlet?method=kszc",
		data: {
			"xm":xm,
			"cym":cym,
			"zjlxdm":zjlxdm,
			"zjdm":zjdm,
			"xbdm":xbdm,
			"csrq":csrq,
			"mzdm":mzdm,
			"hkdm":hkdm,
			"pwd":pwd,
			"qrpwd":qrpwd,
			"lxsj":lxsj,
			"yzm":yzm,
		},
		dataType : 'json',
		success : function(data){
			if (data.retCode == 1) {
				//注册成功
				alert(data.msg);
				window.location.href = "cgtxzl.jsp"
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
