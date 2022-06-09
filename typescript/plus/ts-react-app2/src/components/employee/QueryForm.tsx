import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import {  useDispatch } from 'react-redux'
import { getEmployee } from '../../store/employee'

import { EmployeeRequest } from '../../typings/employee';
import { AnyAction } from '@reduxjs/toolkit';

const { Option } = Select;

const QueryForm = () => {
	const dispatch = useDispatch()

	const [name, setName] = useState('');
	const [departmentId, setDepartmentId] = useState<number | undefined>(undefined);

	const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value);
	}

	const handleDepartmentChange = (value: number) => {
		setDepartmentId(value);
	}

	const queryEmployee = (param: EmployeeRequest) => {
		dispatch(getEmployee(param) as unknown as AnyAction);
	}

	const handleSubmit = () => {
		queryEmployee({
			name,
			departmentId
		})
	}

	useEffect(() => {
		queryEmployee({
			name,
			departmentId
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<Form layout="inline">
			<Form.Item>
				<Input
					placeholder="姓名"
					style={{ width: 120 }}
					allowClear
					value={name}
					onChange={handleNameChange}
				/>
			</Form.Item>
			<Form.Item>
				<Select
					placeholder="部门"
					style={{ width: 120 }}
					allowClear
					value={departmentId}
					onChange={handleDepartmentChange}
				>
					<Option value={1}>技术部</Option>
					<Option value={2}>产品部</Option>
					<Option value={3}>市场部</Option>
					<Option value={4}>运营部</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Button type="primary" onClick={handleSubmit}>查询</Button>
			</Form.Item>
		</Form>
	)
}

export default QueryForm;
