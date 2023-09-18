import { ExamineeTypeMap } from '../pages/Content/constant';

export interface DataItem {
	name: string;
	gender: string;
	identityId: string;
	district: string;
	phone: string;
	password: string;
	/**
	 * 政治面貌
	 */
	politicalStatus: string;
	examLanguage: string;
	/**
	 * 考生类别： '专科升本科类' | '高中起点本科类' | '高中起点高职高专'
	 */
	examineeType: string
	graduatedSchool: string;
	graduatedProfession: string;
	graduateTime: string
	graduatedId: string;
	/**
	 * 邮政编码
	 */
	postalCode: string;
	telephone: string;
	province: string;
	city: string;
	area: string;
	addressDetail: string;
	/**
	 * 报考学校编码
	 */
	schoolOneCode: string;
	schoolTwoCode: string
	/**
	 * 报考专业编码
	 */
	professionOneCode: string;
	professionTwoCode: string;
	professionThreeCode: string
	professionFourCode: string
}
