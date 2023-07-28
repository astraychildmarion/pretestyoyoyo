import React from 'react';
import { useState, useEffect } from 'react';
import Counter from './CustomInputNumber';

function Room({ onChange, roomIndex, roomDisabled }) {
	const [totalPeople, setTotalPeople] = useState(1);
	const [kidCount, setKidCount] = useState(0);
	const [adultCount, setAdultCount] = useState(1);
	const [isKidInc, setKidInc] = useState(roomDisabled);
	const [isAdultInc, setAdultInc] = useState(roomDisabled);
	const [isKidDec, setKidDec] = useState(false);
	const [isAdultDec, setAdultDec] = useState(false);

	function counterAdultChange(payload) {
		setAdultCount(payload);
		setTotalPeople(payload + kidCount);
		onChange({ people: { adult: payload, child: kidCount }, roomIndex });
	}
	function counterAdultBlur(payload) {
		setAdultCount(payload);
		setTotalPeople(payload + kidCount);
		onChange({ people: { adult: payload, child: kidCount }, roomIndex });
	}
	function counterKidChange(payload) {
		setKidCount(payload);
		setTotalPeople(payload + adultCount);
		onChange({ people: { adult: adultCount, child: payload }, roomIndex });
	}
	function counterKidBlur(payload) {
		setKidCount(payload);
		setTotalPeople(payload + adultCount);
		onChange({ people: { adult: adultCount, child: payload }, roomIndex });
	}

	useEffect(() => {
		if (totalPeople === 4) {
			setKidInc(true);
			setAdultInc(true);
		} else {
			setKidInc(false);
			setAdultInc(false);
		}
	}, [totalPeople]);
	useEffect(() => {
		if (roomDisabled[0]) {
			setKidInc(true);
			setAdultInc(true);
		} else {
			setKidInc(false);
			setAdultInc(false);
		}
		if (roomDisabled[1]) {
			setKidDec(true);
			setAdultDec(true);
		} else {
			setKidDec(false);
			setAdultDec(false);
		}
	}, [roomDisabled]);

	return (
		<div className="room_human_counter-wrapper">
			<div className="room_human_title">房間：{totalPeople} 人</div>
			<div className="room_human_counter">
				<div className="room_human_text">
					大人
					<div className="room_human_text-hint">年齡20+</div>
				</div>
				<div>
					<Counter
						min={1}
						max={4}
						step={1}
						name={'string'}
						value={1}
						disabled={[isAdultInc, isAdultDec]}
						onChange={counterAdultChange}
						onBlur={counterAdultBlur}
					/>
				</div>
			</div>
			<div className="room_human_counter">
				<div className="room_human_text">小孩</div>
				<div>
					<Counter
						min={0}
						max={3}
						step={1}
						name={'string'}
						value={0}
						disabled={[isKidInc, isKidDec]}
						onChange={counterKidChange}
						onBlur={counterKidBlur}
					/>
				</div>
			</div>
		</div>
	);
}
export default Room;
