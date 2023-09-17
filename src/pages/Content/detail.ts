import { DataItem } from '../../types/item';
import { ExamineeTypeMap, ExamLanguageMap, GuangdongAddressTree, PoliticalStatusMap } from './constant';

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
	filterPoliticalStatus(item.politicalStatus || '群众');
	filterExamLanguage(item.examLanguage || '英语');
	// 选择完考生类别就会出下面的表格
	filterExamineeType(item.examineeType || '专科升本科类');
	filterCareer(); // 	职业固定00
	filterGraduatedSchool(item.graduatedSchool);
	filterGraduatedProfession(item.graduatedProfession);
	filterGraduateTime(item.graduateTime);
	filterGraduatedId(item.graduatedId);
	filterPostalCode(item.postalCode);
	filterTelephone(item.telephone);
	filterAddress(item);
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

function filterExamineeType(examineeType: string) {
	const cell = getCell(9, 1, detailTable);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
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
	const provinceCode = '44'; // 写死广东省
	provinceSelector.value = provinceCode; // 写死广东省
	if (!citySelector) return;
	const cityList = GuangdongAddressTree.filter(ele => Number(ele.depth) === 2 && ele.code.substring(0, 2) === provinceCode);
	console.log('cityList', cityList);
	cityList.forEach(area => {
		const optionElement = document.createElement('option');
		optionElement.value = area.code;
		optionElement.text = area.name;
		citySelector.append(optionElement);
	});
	const cityCode = GuangdongAddressTree.find(ele => ele.name === item.city)?.code;
	console.log('cityCode', cityCode);
	if (!cityCode) return;
	citySelector.value = cityCode;
	const areaList = GuangdongAddressTree.filter(ele => Number(ele.depth) === 3 && ele.code.substring(0, 4) === cityCode);
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

export function filterProfession(item: DataItem) {
	if (!detailTable) {
		alert('请先填充基础信息');
		return false;
	}
	professionTable = document.querySelectorAll('table')[1];
	if (ExamineeType === '1') {
		// 1 专升本 第一行
		const schoolElement = getCellElement(1, 1, professionTable, 'input') as HTMLInputElement;
		schoolElement.value = item.schoolCode;
		const professionOneElement = getCellElement(1, 3, professionTable, 'input') as HTMLInputElement;
		professionOneElement.value = item.professionOneCode;
		const professionTwoElement = getCellElement(1, 4, professionTable, 'input') as HTMLInputElement;
		professionTwoElement.value = item.professionTwoCode;
	} else {
		// 4 高中起点本科 非脱产班 第一行
// 		5 高中起点高职高专  非脱产班 第一行
		const schoolElement = getCellElement(1, 1, professionTable, 'input') as HTMLInputElement;
		schoolElement.value = item.schoolCode;
		const professionOneElement = getCellElement(1, 3, professionTable, 'input') as HTMLInputElement;
		professionOneElement.value = item.professionOneCode;
		const professionTwoElement = getCellElement(1, 4, professionTable, 'input') as HTMLInputElement;
		professionTwoElement.value = item.professionTwoCode;
	}
}
