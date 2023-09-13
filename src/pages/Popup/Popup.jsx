import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import UploadExcel from './upload/uploadExcel';

const Popup = () => {

	useEffect(() => {
		chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
			sendResponse('我收到了你的来信')
			console.log('接收了来自 content.js的消息', req.info)
		})
		// chrome.runtime.sendMessage({
		// 	info: "我是 pop.js"
		// }, res => {
		// 	// 答复
		// 	console.log(res)
		// })
	}, [])

	return (
		<div className="App">
			<header className="App-header">
				<h3>
					请提前上传Excel录入考生信息，表格模版找杰哥要
				</h3>
			</header>
			<main>
				<UploadExcel />
			</main>
		</div>
	);
};

export default Popup;
