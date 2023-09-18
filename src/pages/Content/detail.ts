import { DataItem } from '../../types/item';
import {
	ExamLanguageMap,
	guangdongCityList, guangdongCode,
	PoliticalStatusMap,
} from './constant';

let detailTable: HTMLTableElement | null;

function getCell(row: number, column: number, table: HTMLTableElement | null): HTMLTableCellElement | null {
	if (!table) return null;
	const rowCells = table.rows[row].cells;
	if (!rowCells || rowCells.length < column) return null;
	return rowCells[column];
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
	filterCareer(); // 	职业固定00
	filterInputById('byxx', item.graduatedSchool)
	filterInputById('byzy', item.graduatedProfession);
	filterGraduateTime(item.graduateTime);
	filterInputById('byzshm', item.graduatedId)
	filterInputById('yzbm', item.postalCode)
	filterInputById('lxdh', item.telephone)
	filterAddress(item);
	filterProfession(item, String(type?.value));
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

function filterCareer() {
	const cell = getCell(13, 3, detailTable);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	selector.value = '00';
}

function filterGraduateTime(graduateTime: string) {
	if (!graduateTime) return;
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

export function filterProfession(item: DataItem, type: string) {
	if (type === '1') {
		// 1 专升本 第一行
		filterInputById('zsbpc1bkyx1', item.schoolOneCode);
		filterInputById('zsbpc1bkyx1zy1', item.professionOneCode);
		filterInputById('zsbpc1bkyx1zy2', item.professionTwoCode);

		filterInputById('zsbpc1bkyx2', item.schoolTwoCode);
		filterInputById('zsbpc1bkyx2zy1', item.professionThreeCode);
		filterInputById('zsbpc1bkyx2zy2', item.professionFourCode);
	} else if (type === '4') {
		// 4 高中起点本科: 非脱产班 第一行
		filterInputById('gqbpc4bkyx1', item.schoolOneCode);
		filterInputById('gqbpc4bkyx1zy1', item.professionOneCode);
		filterInputById('gqbpc4bkyx1zy2', item.professionTwoCode);

		filterInputById('gqbpc4bkyx2', item.schoolTwoCode);
		filterInputById('gqbpc4bkyx2zy1', item.professionThreeCode);
		filterInputById('gqbpc4bkyx2zy2', item.professionFourCode);
	} else if (type === '5') {
		// 5 高中起点高职高专: 非脱产班 第一行
		filterInputById('gqgpc4bkyx1', item.schoolOneCode);
		filterInputById('gqgpc4bkyx1zy1', item.professionOneCode);
		filterInputById('gqgpc4bkyx1zy2', item.professionTwoCode);

		filterInputById('gqgpc4bkyx2', item.schoolTwoCode);
		filterInputById('gqgpc4bkyx2zy1', item.professionThreeCode);
		filterInputById('gqgpc4bkyx2zy2', item.professionFourCode);
	}
}

function filterInputById(id: string, value: string) {
	const element = document.getElementById(id) as HTMLInputElement;
	if (element && value) element.value = value;
}
