export function matchBirthday(identity: string): string {
	const regex18 = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9Xx])$/;
	const regex15 = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;

	let birthYear, birthMonth, birthDay;
	// 匹配18位身份证号码
	const match18 = identity.match(regex18);
	if (match18) {
		birthYear = match18[2];
		birthMonth = match18[3];
		birthDay = match18[4];
	}

	// 如果没有匹配到18位身份证号码，则尝试匹配15位身份证号码
	if (!birthYear) {
		const match15 = identity.match(regex15);
		if (match15) {
			const yearPrefix = new Date().getFullYear().toString().substring(0, 2);
			birthYear = yearPrefix + match15[2];
			birthMonth = match15[3];
			birthDay = match15[4];
		}
	}

	if (birthYear && birthMonth && birthDay) {
		console.log(`出生年月日：${birthYear}-${birthMonth}-${birthDay}`);
		return `${birthYear}-${birthMonth}-${birthDay}`;
	} else {
		console.error("无法从身份证号码中提取出生日期。");
		return '';
	}
}
