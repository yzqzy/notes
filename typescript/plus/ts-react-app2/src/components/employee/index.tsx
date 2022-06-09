import { Table } from 'antd';
import { useSelector } from 'react-redux'

import './index.css';

import QueryForm from './QueryForm';

import { employeeColumns } from './colums';
import { RootState } from '../../store';

const  Employee  = () => {
	const employee = useSelector((state: RootState) => state.employee.employeeList)

	const getTotal = () => {
		const total: number = typeof employee !== 'undefined' ? employee.length : 0;
		
		return (
			<p style={{ margin: "20px 0" }}>
				共有 { total } 名员工
			</p>
		)
	}

	return (
		<>
			<QueryForm />
			{ getTotal() }
			<Table columns={employeeColumns} dataSource={employee} className="table" />
		</>
	)
}

export default Employee;
