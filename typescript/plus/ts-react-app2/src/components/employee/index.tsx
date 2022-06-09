import { Component } from 'react';
import { Table } from 'antd';

import './index.css';

import QueryForm from './QueryForm';

import { employeeColumns } from './colums';
import { EmployeeResponse } from '../../typings/employee';

interface State {
	employee: EmployeeResponse
}

class Employee extends Component<{}, State> {
	state: State = {
		employee: undefined
	}

	getTotal = () => {
		const { employee } = this.state;
		const total: number = typeof employee !== 'undefined' ? employee.length : 0;
		
		return (
			<p style={{ margin: "20px 0" }}>
				共有 { total } 名员工
			</p>
		)
	}

	setEmployee = (employee: EmployeeResponse) => {
		this.setState({
			employee
		});
	}

	render() {
		const { employee } = this.state;

		return (
			<>
				<QueryForm onDataChange={this.setEmployee} />
				{ this.getTotal() }
				<Table columns={employeeColumns} dataSource={employee} className="table" />
			</>
		)
	}
}

export default Employee;
