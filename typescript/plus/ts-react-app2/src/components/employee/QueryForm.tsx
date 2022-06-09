import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';

import { EmployeeRequest, EmployeeResponse } from '../../typings/employee';
import { get } from '../../utils/request';
import { GET_EMPLOYEE_URL } from '../../constants/urls';

const { Option } = Select;

interface Props {
	onDataChange(data: EmployeeResponse): void
}

class QueryForm extends Component<Props, EmployeeRequest> {
	state: EmployeeRequest = {
		name: '',
		departmentId: undefined
	}

	handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			name: e.currentTarget.value
		})
	}

	handleDepartmentChange = (value: number) => {
		this.setState({
			departmentId: value
		})
	}

	handleSubmit = () => {
		this.queryEmployee(this.state)
	}
	
	componentDidMount() {
		this.queryEmployee(this.state)
	}

	queryEmployee(param: EmployeeRequest) {
		get(GET_EMPLOYEE_URL, param)
			.then(res => {
				this.props.onDataChange(res.data);
			});
	}

	render() {
		const { name, departmentId } = this.state

		return (
			<Form layout="inline">
				<Form.Item>
					<Input
						placeholder="姓名"
						style={{ width: 120 }}
						allowClear
						value={name}
						onChange={this.handleNameChange}
					/>
				</Form.Item>
				<Form.Item>
					<Select
						placeholder="部门"
						style={{ width: 120 }}
						allowClear
						value={departmentId}
						onChange={this.handleDepartmentChange}
					>
						<Option value={1}>技术部</Option>
						<Option value={2}>产品部</Option>
						<Option value={3}>市场部</Option>
						<Option value={4}>运营部</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" onClick={this.handleSubmit}>查询</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default QueryForm;
