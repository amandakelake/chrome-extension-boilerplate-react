import { DataItem } from '../../types/item';
import { matchBirthday } from '../../common/utils';

console.log('【Content】 script works!');
console.log('Must reload extension for modifications to take effect.');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	const { cmd, data } = request;
	if (cmd === 'register') {
		register(data);
	} else if (cmd === 'filterDetail') {
		filterDetail(data);
	}
	sendResponse({
		message: 'filter done!',
	});
});

let registerTable: HTMLTableElement | null;

function getCell(row: number, column: number): HTMLTableCellElement | null {
	if (!registerTable) return null;
	const rowCells = registerTable.rows[row].cells;
	if (!rowCells || rowCells.length < column) return null;
	return rowCells[column];
}

function register(item: DataItem) {
	registerTable = document.querySelector('table');
	console.log('register item', item);
	filterRegisterName(item.name);
	filterRegisterGender(item.gender === '女' ? 2 : 1);
	filterRegisterIdentityType();
	filterRegisterIdentityValue(item.identityId);
	// TODO 生日功能暂不开放
	// filterRegisterBirthday(item.identityId);
	filterRegisterNation();
	filterRegisterPassword();
	filterRegisterPasswordRepeat();
	filterRegisterPhone(item.phone);
	// TODO 户籍填充
	// filterDistrict(item.district);
}

function filterDetail(item: DataItem) {
	console.log('还没开发')
	// filterRegisterBirthday(item.identityId);
}

function filterRegisterName(name: string) {
	const cell = getCell(0, 1);
	if (!cell) return;
	const nameInput = cell.querySelector('input');
	if (!nameInput) return;
	nameInput.value = name;
}

function filterRegisterGender(gender: 1 | 2) {
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

function filterRegisterIdentityType() {
	const cell = getCell(2, 1);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	selector.value = '1';
}

function filterRegisterIdentityValue(identity: string) {
	const cell = getCell(2, 3);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = identity;
}

function filterRegisterBirthday(identity: string) {
	try {
		const birthday = matchBirthday(identity);
		if (!birthday) return;
		const cell = getCell(1, 3);
		if (!cell) return;
		const input = cell.querySelector('input');
		if (!input) return;
		input.disabled = false;
		input.value = birthday;
	} catch (err) {
		console.error('filterRegisterBirthday', err)
	}
}

function filterDistrict(district: string) {
	console.log('district', district);
}

function filterRegisterNation() {
	const cell = getCell(3, 1);
	if (!cell) return;
	const selector = cell.querySelector('select');
	if (!selector) return;
	selector.value = '01';
}

function filterRegisterPassword(password?: string) {
	const cell = getCell(4, 1);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = password || '*AAa2255';
}

function filterRegisterPasswordRepeat(password?: string) {
	const cell = getCell(4, 3);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = password || '*AAa2255';
}

function filterRegisterPhone(phone: string) {
	const cell = getCell(5, 1);
	if (!cell) return;
	const input = cell.querySelector('input');
	if (!input) return;
	input.value = phone;
}
