import { DataItem } from '../../types/item';
import {
	ExamineeTypeMap,
	ExamLanguageMap,
	GuangdongAddressTree,
	guangdongCityList, guangdongCode,
	PoliticalStatusMap,
} from './constant';

let detailTable: HTMLTableElement | null;
let professionTable: HTMLTableElement | null;
let ExamineeType: string;

function getCell(row: number, column: number, table: HTMLTableElement | null): HTMLTableCellElement | null {
	if (!table) return null;
	const rowCells = table.rows[row].cells;
	if (!rowCells || rowCells.length < column) return null;
	return rowCells[column];
}

function getCellElement(row: number, column: number, table: HTMLTableElement | null, element: 'input' | 'select') {
	const cell = getCell(row, column, table);
	if (!cell) return;
	return cell.querySelector(element) || null;
}

export function filterDetail(item: DataItem) {
	console.log('[content]: filterDetail', item);
	detailTable = document.querySelectorAll('table')[0];
	// 先选考生类别，再进行填充
	const type = getExamineeType();
	if (!type?.value) {
		console.error('请先选择考生类别');
		alert('请先选择考生类别');
		return false;
	}
	filterPoliticalStatus(item.politicalStatus || '群众');
	filterExamLanguage(item.examLanguage || '英语');
	// 收到选中类别才会出下面的表格
	// filterExamineeType(item.examineeType || '专科升本科类');
	filterCareer(); // 	职业固定00
	filterGraduatedSchool(item.graduatedSchool);
	filterGraduatedProfession(item.graduatedProfession);
	filterGraduateTime(item.graduateTime);
	filterGraduatedId(item.graduatedId);
	filterPostalCode(item.postalCode);
	filterTelephone(item.telephone);
	filterAddress(item);
	filterProfession(item, type.value);
}

function filterPoliticalStatus(politicalStatus: string) {
	const cell = getCell(7, 1, detailTable);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	// @ts-ignore
	selector.value = PoliticalStatusMap[politicalStatus];
}

function filterExamLanguage(examLanguage: string) {
	const cell = getCell(7, 3, detailTable);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	// @ts-ignore
	selector.value = ExamLanguageMap[examLanguage];
}

function getExamineeType() {
	const cell = getCell(9, 1, detailTable);
	if (!cell) return;
	const selector = cell.querySelector('select');
	return selector;
}

function filterExamineeType(examineeType: string) {
	const selector = getExamineeType() as HTMLSelectElement;
	selector.value = ExamineeTypeMap[examineeType];
	ExamineeType = ExamineeTypeMap[examineeType];
}

function filterCareer() {
	const cell = getCell(13, 3, detailTable);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	selector.value = '00';
}

function filterGraduatedSchool(graduatedProfession: string) {
	const cell = getCell(14, 1, detailTable);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = graduatedProfession;
}

function filterGraduatedProfession(graduatedSchool: string) {
	const cell = getCell(15, 1, detailTable);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = graduatedSchool;
}

function filterGraduateTime(graduateTime: string) {
	try {
		const cell = getCell(14, 3, detailTable);
		if (!cell) return;
		const input = cell.querySelector('input');
		if (!input) return;
		input.disabled = false;
		input.readOnly = false;
		input.value = graduateTime;
	} catch (err) {
		console.error('filterGraduateTime', err);
	}
}

function filterGraduatedId(graduatedId: string) {
	const cell = getCell(16, 1, detailTable);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = graduatedId;
}

function filterPostalCode(postalCode: string) {
	const cell = getCell(17, 1, detailTable);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = postalCode;
}

function filterTelephone(telephone: string) {
	const cell = getCell(17, 3, detailTable);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = telephone;
}

function filterAddress(item: DataItem) {
	console.log('guangdongCityList', guangdongCityList);
	const cell = getCell(18, 1, detailTable) as HTMLElement;
	if (!cell) return;
	const selectorAll = cell.querySelectorAll('select');
	const inputEle = cell.querySelector('input');
	if (inputEle) {
		inputEle.value = item.addressDetail;
	}
	const provinceSelector = selectorAll[0];
	const citySelector = selectorAll[1];
	const areaSelector = selectorAll[2];
	if (!provinceSelector) return;
	// console.log('window.ssxzs', window.ssxzs); // 懒得读取window.ssxzs了  需要多重通信
	provinceSelector.value = guangdongCode; // 写死广东省

	if (!citySelector) return;
	guangdongCityList.forEach(area => {
		const optionElement = document.createElement('option');
		optionElement.value = area.code;
		optionElement.text = area.name;
		citySelector.append(optionElement);
	});
	const cityCode = guangdongCityList.find(ele => ele.name === item.city)?.code;
	console.log('cityCode', cityCode);
	if (!cityCode) return;
	citySelector.value = cityCode;

	const areaList = guangdongCityList.find(item => item.code === cityCode)?.children || [];
	console.log('areaList', areaList);
	areaList.forEach(area => {
		const optionElement = document.createElement('option');
		optionElement.value = area.code;
		optionElement.text = area.name;
		areaSelector.append(optionElement);
	});
	const areaCode = areaList.find(ele => ele.name === item.area)?.code;
	console.log('areaCode', areaCode);
	if (!areaCode) return;
	areaSelector.value = areaCode;
}

export interface ISsxzsItem {
	code: string;
	depth: string;
	iszd: string;
	name: string;
}

declare global {
	interface Window {
		ssxzs: ISsxzsItem[];
	}
}

export function filterProfession(item: DataItem, ExamineeType: string) {
	console.log('ExamineeType', ExamineeType);
	if (ExamineeType === '1') {
		// 1 专升本 第一行
		const schoolElement = document.getElementById('zsbpc1bkyx1') as HTMLInputElement;
		console.log('schoolElement', schoolElement);
		if (schoolElement) schoolElement.value = item.schoolCode;
		const professionOneElement = document.getElementById('zsbpc1bkyx1zy1') as HTMLInputElement;
		if (professionOneElement) professionOneElement.value = item.professionOneCode;
		const professionTwoElement = document.getElementById('zsbpc1bkyx1zy2') as HTMLInputElement;
		if (professionTwoElement) professionTwoElement.value = item.professionTwoCode;
	} else {
		// 4 高中起点本科: 非脱产班 第一行
		// 5 高中起点高职高专: 非脱产班 第一行
		const schoolElement = document.getElementById('gqbpc4bkyx1') as HTMLInputElement;
		if (schoolElement) schoolElement.value = item.schoolCode;
		const professionOneElement = document.getElementById('gqbpc4bkyx1zy1') as HTMLInputElement;
		if (professionOneElement) professionOneElement.value = item.professionOneCode;
		const professionTwoElement = document.getElementById('gqbpc4bkyx1zy2') as HTMLInputElement;
		if (professionTwoElement) professionTwoElement.value = item.professionTwoCode;
	}
}
