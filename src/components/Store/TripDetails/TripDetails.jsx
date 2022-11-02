import { Button, Modal } from 'antd';
import Draggable from 'react-draggable';
import React, { useRef, useState } from 'react';


const TripDetails = ({ trip }) => {
	const [visible, setVisible] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

	const showModal = () => {
		setVisible(true);
	};

	const handleOk = (e) => {
		console.log(e);
		setVisible(false);
	};

	const handleCancel = (e) => {
		console.log(e);
		setVisible(false);
	};

	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();

		if (!targetRect) {
			return;
		}

		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	return (
		<>
			<Button onClick={showModal}>Trip Details</Button>
			{trip && (
				<Modal
					footer={null}
					title={
						<div
							style={{
								width: '100%',
								cursor: 'move',
							}}
							onMouseOver={() => {
								if (disabled) {
									setDisabled(false);
								}
							}}
							onMouseOut={() => {
								setDisabled(true);
							}}
							onFocus={() => {}}
							onBlur={() => {}} // end
						>
							<b>{trip.destination} Experience</b>
						</div>
					}
					visible={visible}
					onOk={handleOk}
					onCancel={handleCancel}
					modalRender={(modal) => (
						<Draggable
							disabled={disabled}
							bounds={bounds}
							onStart={(event, uiData) => onStart(event, uiData)}
						>
							<div ref={draggleRef}>{modal}</div>
						</Draggable>
					)}
				>
					<p>{trip.description}</p>
					<p>
						<b>Category:</b> {trip.category}{' '}
					</p>
				</Modal>
			)}
		</>
	);
};

export default TripDetails;
