import { DataItem } from '../../types/item';

let detailTable: HTMLTableElement | null;
let professionTable: HTMLTableElement | null;


function getCell(row: number, column: number, table: HTMLTableElement): HTMLTableCellElement | null {
	if (!table) return null;
	const rowCells = table.rows[row].cells;
	if (!rowCells || rowCells.length < column) return null;
	return rowCells[column];
}


export function filterDetail(item: DataItem) {
	detailTable = document.querySelectorAll('table')[0];
	console.log('还没开发');
}

export function filterProfession(item: DataItem) {
	professionTable = document.querySelectorAll('table')[1];
	console.log('还没开发');
}
