import { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

class QueryForm extends Component {
	render() {
		return (
			<Form layout="inline">
				<Form.Item>
					<Input
						placeholder="姓名"
						style={{ width: 120 }}
						allowClear
					/>
				</Form.Item>
				<Form.Item>
					<Select
						placeholder="部门"
						style={{ width: 120 }}
						allowClear
					>
						<Option value={1}>技术部</Option>
						<Option value={2}>产品部</Option>
						<Option value={3}>市场部</Option>
						<Option value={4}>运营部</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary">查询</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default QueryForm;
