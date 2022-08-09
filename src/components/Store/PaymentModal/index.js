import { Button, Modal, DatePicker, Form, Input } from 'antd';
import { IdcardOutlined, CreditCardOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { api } from '../../../api/api';
import { useCart } from 'react-use-cart';

export const PaymentModal = () => {
	const { emptyCart, items, cartTotal } = useCart();

	const countDown = () => {
		const modal = Modal.success({
			title: 'Pack your bags',
			content: `Your Order was completed successfully`,
		});
		setTimeout(() => {
			modal.destroy();
		}, 3000);
	};

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await api.post('/order/new-order', {
				trips: items,
				orderTotal: cartTotal,
			});
		} catch (error) {
			console.log(error);
		}
	}

	const [visible, setVisible] = useState(false);
	const [componentSize, setComponentSize] = useState('default');
	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};
	const showModal = () => {
		setVisible(true);
	};
	const handleCancel = () => {
		console.log('Clicked cancel button');
		setVisible(false);
	};

	return (
		<>
			<Button onClick={showModal}>Checkout</Button>
			<Modal
				bodyStyle={{ height: 330, paddingTop: 20 }}
				width={400}
				title={<strong>Payment Information</strong>}
				visible={visible}
				onOk={(e) => {
					handleSubmit(e);
					emptyCart();
					setVisible(false);
					countDown();
				}}
				onCancel={handleCancel}
				okText="Pay Now"
				closable={false}
			>
				<Form
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 14,
					}}
					layout="horizontal"
					initialValues={{
						size: componentSize,
					}}
					onValuesChange={onFormLayoutChange}
					size={componentSize}
				>
					<label htmlFor="input-owner">
						Card Owner <IdcardOutlined />
					</label>
					<Form.Item>
						<Input name="owner" />
					</Form.Item>
					<label htmlFor="input-card">
						Card Number <CreditCardOutlined />
					</label>
					<Form.Item>
						<Input name="card" />
					</Form.Item>
					<label>Expiration Date</label>
					<Form.Item>
						<DatePicker />
					</Form.Item>
					<label>Security Code</label>
					<Form.Item>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
