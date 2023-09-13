import { DataItem } from '../../types/item';

console.log('[BG]This is the background page.');
console.log('[BG]Put the background scripts here.');


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'saveData') {
		const dataToSave = request.data as DataItem[];

		// 将数据保存到chrome.storage.local
		chrome.storage.local.set({ data: dataToSave }, () => {
			console.log('save success')
		});

		sendResponse({ message: 'success' })
	}
});
