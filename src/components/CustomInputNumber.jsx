import React from 'react';
import { useState, useEffect } from 'react';

function CustomInputNumber({ min, max, step, name, value, onChange, onBlur, disabled }) {
	let [num, setNum] = useState(value);
	let [inputDisable, setInputDisable] = useState(value);

	let incNum = () => {
		if (num < max) {
			setNum((num) => Number(num) + step);
			onChange(Number(num) + step);
		}
	};
	let decNum = () => {
		if (num > min) {
			setNum((num) => Number(num) - step);
			onChange(Number(num) - step);
		}
	};
	function isNumber(value) {
		const numberPattern = /^[-+]?\d*\.?\d+$/;
		return numberPattern.test(value);
	}
	let handleChange = (e) => {
		setNum(parseInt(e.target.value));
	};
	let handlerBlur = (e) => {
		setNum(parseInt(e.target.value));
		onBlur(parseInt(e.target.value));
	};
	useEffect(() => {
		if (!isNumber(num)) setNum(0);
		if (num > max) setNum(max);
		else if (num < min) setNum(min);
		else setNum(num);
	}, [num]);
	useEffect(() => {
		if (disabled[0] !== disabled[1] || (disabled[0] === false && !disabled[1] === false)) {
			setInputDisable(true);
		} else {
			setInputDisable(false);
		}
	}, [disabled]);

	return (
		<>
			<div className="counter_wrapper">
				<button
					className="counter_item counter_btn"
					type="button"
					onClick={decNum}
					disabled={disabled[1]}
				>
					-
				</button>
				<input className="counter_item counter_input" value={num} onChange={handleChange} onBlur={handlerBlur} disabled={inputDisable} />
				<button
					className="counter_item counter_btn"
					type="button"
					onClick={incNum}
					disabled={disabled[0]}
				>
					+
				</button>
			</div>
		</>
	);
}
export default CustomInputNumber;