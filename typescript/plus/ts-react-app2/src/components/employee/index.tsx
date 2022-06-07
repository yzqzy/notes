import { Component } from 'react';
import { Table } from 'antd';

import './index.css';

import QueryForm from './QueryForm';

class Employee extends Component {
	render() {
		return (
			<>
				<QueryForm />
				<Table className="table" />
			</>
		)
	}
}

export default Employee;
