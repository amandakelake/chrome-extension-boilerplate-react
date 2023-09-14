import { DataItem } from '../../types/item';
import { IMessageCmd } from '../../types/common';
import { register } from './register';
import { filterDetail, filterProfession } from './detail';

console.log('【Content】 script works');
console.log('Must reload extension for modifications to take effect.');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	const cmd = request.cmd as IMessageCmd
	const data = request.data as DataItem
	if (cmd === 'register') {
		register(data);
	} else if (cmd === 'filterDetail') {
		filterDetail(data);
	} else if (cmd === 'filterProfession') {
		filterProfession(data);
	}
	sendResponse({
		message: 'filter done!',
	});
});

