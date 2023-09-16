import { DataItem } from '../../types/item';
import { ExamineeTypeMap, ExamLanguageMap, PoliticalStatusMap } from './constant';

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
