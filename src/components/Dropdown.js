import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	//click anywhere and close dropdown
	useEffect(() => {
		const onBodyClick = (event) => {
		  if (ref.current.contains(event.target)) {
			return;
		  }
		  setOpen(false);
		};
		//provide onBodyClick as a call back(change a piece of the state that is
		//apart of the parent component)
		document.body.addEventListener("click", onBodyClick, { capture: true });
	 
		//Whenever component is removed from DOM we remove event listeners
		return () => {
		  document.body.removeEventListener("click", onBodyClick, {
			capture: true,
		  });
		};
	  }, []);

	const renderedOptions = options.map((option) => {
		//currently selected item does not show up on list again
		if (option.value === selected.value) {
			return null;
		}

		return (
			<div
				key={option.value}
				className="item"
				onClick={() => {
					onSelectedChange(option);
				}}
			>
				{option.label}
			</div>
		);
	});

console.log(ref.current)

	return (
		<div ref={ref} className="ui form">
			<div className="field">
				<label className="label">{label}</label>
				<div
					onClick={() => {
						setOpen(!open);
					}}
					className={`ui selection dropdown ${open ? "visible active" : ""}`}
				>
					<i className="dropdown icon"></i>
					<div className="text">{selected.label}</div>
					<div className={`menu ${open ? "visible transition" : ""}`}>
						{renderedOptions}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dropdown;
