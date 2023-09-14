import React, { useEffect, useMemo, useState } from 'react';
import { Button, Table, Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import * as XLSX from 'xlsx';
import { ColumnsType } from 'antd/es/table';
import { DataItem } from '../../../types/item';
import { IMessageCmd } from '../../../types/common';

import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';

const { Search } = Input;

const UploadExcel: React.FC = () => {
	const [searchText, setSearchText] = useState('');
	const [excelJsonData, setExcelJsonData] = useState<DataItem[]>([]);

	useEffect(() => {
		readDataFromStorage();
	}, []);

	const columns: ColumnsType<DataItem> = [
		{
			title: '姓名',
			dataIndex: 'name',
			fixed: 'left',
			key: 'name',
			width: 80,
		},
		{
			title: '户籍',
			dataIndex: 'district',
			key: 'district',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (index, record) => <div key={index}>
				<Button type="primary" size={'small'}
						onClick={() => sendMessageToTab('register', record)}>注册填充</Button>
				<Button type="primary" size={'small'} onClick={() => sendMessageToTab('filterDetail', record)}
						style={{ marginTop: '6px' }}>信息填充</Button>
				<Button type="primary" size={'small'} onClick={() => sendMessageToTab('filterProfession', record)}
						style={{ marginTop: '6px' }}>专业填充</Button>
			</div>,
		},
	];

	const sendMessageToTab = (cmd: IMessageCmd, item: DataItem) => {
		console.log('item', item);
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			// @ts-ignore
			chrome.tabs.sendMessage(tabs[0].id, {
				cmd: cmd,
				value: '你好，我是popup！',
				data: item,
			}, function (response) {
				console.log('来自content的回复：' + response);
			});
		});
	};

	const handleUpload = (info: UploadChangeParam) => {
		console.log('start upload', info);
		if (info.file.status === 'done') return;
		const file = info.file.originFileObj as File;
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const data = e.target?.result;
				if (data) {
					const workbook = XLSX.read(data, { type: 'array' });
					const sheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[sheetName];
					const jsonData = XLSX.utils.sheet_to_json(worksheet);
					console.log('json data', jsonData);
					setExcelJsonData(jsonData as DataItem[]);
					saveDataToStorage(jsonData as DataItem[]);
				}
			} catch (error) {
				message.error('解析Excel文件出错！');
			}
		};

		reader.readAsArrayBuffer(file);
	};

	const readDataFromStorage = () => {
		chrome.storage.local.get(['data'], (result) => {
			const storedData = result.data as DataItem[];
			if (storedData) {
				setExcelJsonData(storedData);
			}
		});
	};

	const saveDataToStorage = (data: DataItem[]) => {
		chrome.runtime.sendMessage({ action: 'saveData', data: data }, response => {
			console.log(response);
		});
	};


	const searchedData = useMemo(() => {
		if (!searchText) return excelJsonData;
		return excelJsonData.filter((record) =>
			record.name.toLowerCase().includes(searchText.toLowerCase())
		);
	}, [searchText, excelJsonData]);

	const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
		console.log('onSearch', value, _e, info);
		setSearchText(value);
	}

	return (
		<div>
			<Upload
				accept=".xlsx,.xls,.excel"
				showUploadList={false}
				onChange={handleUpload}
			>
				<Button type="primary" size={'large'}>上传Excel文件</Button>
			</Upload>

			<Search
				placeholder="搜索名字"
				allowClear
				enterButton="Search"
				size="large"
				onChange={(e) => setSearchText(e.target.value)}
				onSearch={onSearch}
				style={{ marginTop: `24px`, marginBottom: `24px` }}
			/>
			<div style={{height: '300px', overflowY: 'scroll'}}>
				<Table<DataItem>
					style={{
						marginTop: '24px',
					}}
					columns={columns}
					dataSource={searchedData}
					pagination={{ pageSize: 100 }}
					bordered
				/>
			</div>
		</div>
	);
};

export default UploadExcel;
