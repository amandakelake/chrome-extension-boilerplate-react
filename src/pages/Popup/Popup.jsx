import React, { useEffect } from 'react';
import './Popup.css';
import UploadExcel from './upload/uploadExcel';
import { Space, Typography } from 'antd';
const { Text, Link } = Typography;

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
				<Space direction="vertical" style={{marginBottom: '24px'}}>
					<Text type="danger">提前上传Excel录入考生信息, 最新模版 -> 找杰哥</Text>
				</Space>
			</header>
			<main>
				<UploadExcel />
			</main>
		</div>
	);
};

export default Popup;
