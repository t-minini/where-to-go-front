import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import { useCart } from 'react-use-cart';
import CardDetails from '../CardDetails/index';
import { ShoppingCartOutlined } from '@ant-design/icons';
import style from '../TripCard/style.module.css';

export function TripCard() {
	const { addItem } = useCart();
	const [clone, setClone] = useState([]);
	const [trips, setTrips] = useState([
		{
			tripImg: '',
			destination: '',
			description: '',
			price: '',
			category: '',
		},
	]);

	useEffect(() => {
		async function fetchTrips() {
			const response = await api.get('/trip/all-trips');
			setTrips(response.data);
			setClone(response.data);
			console.log(response.data);
		}
		fetchTrips();
	}, []);

	let filteredCategory = [...clone];
	function handleCategory(category) {
		filteredCategory = filteredCategory.filter((currentCategory) => {
			return currentCategory.category === category;
		});
		setTrips(filteredCategory);
	}
	return (
		<>
			<div className={style.cardContainer}>
				<div className={style.categoriesDiv}>
					<p
						onClick={() => {
							setTrips(clone);
						}}
					>
						All Trips
					</p>
					<p
						onClick={() => {
							handleCategory('Adventure');
						}}
					>
						Adventure
					</p>
					<p
						onClick={() => {
							handleCategory('Romance');
						}}
					>
						Romance
					</p>
					<p
						onClick={() => {
							handleCategory('Culture');
						}}
					>
						Culture
					</p>
					<p
						onClick={() => {
							handleCategory('Nightlife');
						}}
					>
						Nightlife
					</p>
					<p
						onClick={() => {
							handleCategory('Relax');
						}}
					>
						Relax
					</p>
				</div>

				<div className={style.cardsDiv}>
					{trips.map((currentTrip) => {
						let item = {
							...currentTrip,
							id: currentTrip._id,
							price: currentTrip.unitPrice,
						};

						return (
							<div className={style.card} key={currentTrip._Id}>
								<img
									className={style.cardImg}
									src={currentTrip.tripImg}
									alt={currentTrip.destination}
								/>
								<div className={style.infoCards}>
									<p className={style.infoDestination} >{currentTrip.destination}</p>
									<p className={style.infoPrice}>${currentTrip.unitPrice}</p>
								</div>
								<div className={style.cardGroupBtn}>
									<CardDetails trip={currentTrip} />
									<p onClick={() => addItem(item)}>
										<ShoppingCartOutlined style={{ fontSize: 30 }} />
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
