function SelectUser({ changedUser }) {
	const changeUser = (e) => {
		changedUser(e.target.value);
	};
	return (
		<>
			<select name="user" id="user" onChange={changeUser}>
				<option value="1">Арсен</option>
				<option value="2">Арут</option>
			</select>
		</>
	);
}

export default SelectUser;
