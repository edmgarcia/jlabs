import { getGeo } from "../../helpers/endpoints/geos";
import { useState, useReducer } from "react";
import Alert from "../../components/Alert";
import axios from "axios";

const Index = ({ myGeo }) => {
	const [geos, dispatch] = useReducer(geoReducer, [{ ...myGeo }]);
	const [newGeo, setNewGeo] = useState(null);
	const [error, setError] = useState(null);
	const [ip, setIp] = useState(null);
	const [toRemove, setToRemove] = useState([]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const ipFormat = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;

		if (!ipFormat.test(ip)) return setError("Invalid IP Address format.");

		const response = await axios.get(getGeo, { params: { ip } });
		const { data } = response;

		if (!data.success) {
			setError(data.message);
		} else {
			setNewGeo({ ...data.data });
			addGeo({ ...data.data });
			setIp(null);
		}
	}

	const addGeo = (data) => {
		dispatch({
			type: "add",
			data,
		})
	}

	const removeGeo = (data) => {
		dispatch({
			type: "remove",
			data,
		})

		setToRemove([]);
	}

	return (
		<div className="home">
			<div className="container">
				<div className="panel">
					<div className="panel-header">My Geo Data</div>
					<div className="panel-body">

						{
							geos.length === 1 ?
								Object.keys(geos).map((key, index) => {
									return Object.keys(geos[0]).map((key, index) =>
										<div key={index} className="object-item">
											<p className="object-item-key">{key}</p>
											<p>{geos[0][key]}</p>
										</div>
									)
								}
								)
								:
								Object.keys(newGeo).map((key, index) =>
									<div key={index} className="object-item">
										<p className="object-item-key">{key}</p>
										<p>{newGeo[key]}</p>
									</div>
								)
						}

						{
							newGeo ?
								<iframe
									allowFullScreen={false}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									width="100%"
									height="300"
									src={
										`https://maps.google.com/maps?q=${newGeo["loc"].split(",")[0]}, ${newGeo["loc"].split(",")[1]}&z=15&output=embed`
									} title="Google Map" />
								:
								<iframe
									allowFullScreen={false}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									width={"100%"}
									height="300"
									src={
										`https://maps.google.com/maps?q=${myGeo["loc"].split(",")[0]}, ${myGeo["loc"].split(",")[1]}&z=15&output=embed`
									} title="Google Map" />
						}


					</div>
				</div>

				<div className="panel">
					<div className="panel-header">Search Geo Data</div>
					<div className="panel-body">
						<form onSubmit={e => handleFormSubmit(e)}>
							<div className="input-wrapper">
								<label htmlFor="ip">
									IP Address
									<input type="text" id="ip" value={ip || ""} onChange={e => setIp(e.target.value)} />
								</label>
							</div>
							{error && <Alert error={error} setError={setError} />}
							<div className="input-wrapper">
								<input type="submit" value="Search Geo" className="btn-theme" onSubmit={e => handleFormSubmit(e)} />
							</div>
						</form>
					</div>
				</div>

				{
					geos ?
						<>
							<hr></hr>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }} >
								<h3 style={{ margin: 0 }}>Search History</h3>
								{toRemove.length ? <button onClick={e => removeGeo(toRemove)}>Remove</button> : null}

							</div>
							<div className="search-history-wrapper">
								<table>
									<thead>
										<tr>
											<th><div>Select</div></th>
											<th><div>IP Address</div></th>
											<th><div>Hostname</div></th>
											<th><div>City</div></th>
											<th><div>Country</div></th>
										</tr>
									</thead>
									<tbody>
										{
											Object.keys(geos).map((key, index) =>
												<tr key={index}>
													<td>
														<div style={{ textAlign: "center" }}>
															{
																geos[key].ip === myGeo.ip ?
																	"You"
																	:
																	<input type="checkbox" onChange={e => setToRemove([...toRemove, geos[key].ip])} />
															}
														</div>
													</td>
													<td>{geos[key].ip}</td>
													<td>{geos[key].hostname}</td>
													<td>{geos[key].city}</td>
													<td>{geos[key].country}</td>
												</tr>
											)
										}
									</tbody>
								</table>
							</div>
						</>
						:
						null
				}

			</div>
		</div>
	)
}

const geoReducer = (geos, action) => {
	switch (action.type) {
		case "add": {
			return [
				...geos,
				{ ...action.data }
			]
		}
		case "remove": {
			return geos.filter(obj => !action.data.includes(obj.ip));
		}
		default: {
			console.log("default");
		}
	}
}



export default Index;