import { matchBirthday } from '../../common/utils';
import { DataItem } from '../../types/item';
import { DistrictMap } from './constant';

let registerTable: HTMLTableElement | null;

export function register(item: DataItem) {
	registerTable = document.querySelector('table');
	console.log('register item', item);
	filterRegisterName(item.name);
	filterRegisterGender(item.gender === '女' ? 2 : 1);
	filterRegisterIdentityType();
	filterRegisterIdentityValue(item.identityId);
	filterRegisterBirthday(item.identityId);
	filterRegisterNation();
	filterDistrict(item.district);
	filterRegisterPassword(item.password);
	filterRegisterPasswordRepeat(item.password);
	filterRegisterPhone(item.phone);
	// TODO 户籍填充
	// filterDistrict(item.district);
}

export function getCell(row: number, column: number): HTMLTableCellElement | null {
	if (!registerTable) return null;
	const rowCells = registerTable.rows[row].cells;
	if (!rowCells || rowCells.length < column) return null;
	return rowCells[column];
}

export function filterRegisterName(name: string) {
	const cell = getCell(0, 1);
	if (!cell) return;
	const nameInput = cell.querySelector('input');
	if (!nameInput) return;
	nameInput.value = name;
}

export function filterRegisterGender(gender: 1 | 2) {
	const cell = getCell(1, 1);
	if (!cell) return;
	const radioInputs = cell.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
	if (!radioInputs || radioInputs.length < 1) return;
	if (gender === 1) {
		radioInputs[0].checked = true;
		radioInputs[1].checked = false;
	} else {
		radioInputs[0].checked = false;
		radioInputs[1].checked = true;
	}
}

export function filterRegisterIdentityType() {
	const cell = getCell(2, 1);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	selector.value = '1';
}

export function filterRegisterIdentityValue(identity: string) {
	const cell = getCell(2, 3);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = identity;
}

export function filterRegisterBirthday(identity: string) {
	try {
		const birthday = matchBirthday(identity);
		if (!birthday) return;
		const cell = getCell(1, 3);
		if (!cell) return;
		const input = cell.querySelector('input');
		if (!input) return;
		input.disabled = false;
		input.readOnly = false;
		input.value = birthday;
	} catch (err) {
		console.error('filterRegisterBirthday', err)
	}
}

export function filterRegisterNation() {
	const cell = getCell(3, 1);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	selector.value = '01';
}

export function filterDistrict(district: string) {
	const cell = getCell(3, 3);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	// @ts-ignore
	if (DistrictMap[district]) {
		// @ts-ignore
		selector.value = DistrictMap[district];
	}
}


export function filterRegisterPassword(password?: string) {
	const cell = getCell(4, 1);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = password || 'Aa8899@@';
}

export function filterRegisterPasswordRepeat(password?: string) {
	const cell = getCell(4, 3);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = password || 'Aa8899@@';
}

export function filterRegisterPhone(phone: string) {
	const cell = getCell(5, 1);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = phone;
}
