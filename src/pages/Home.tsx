// Home.tsx

import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { carPosts } from '../localData';
import Layout from '../components/Layout';
import Post from '../components/Post';
import '../styles/Home.css';
import CarFilterBar from '../components/CarFilterBar';
import PaginationComponent from '../components/PaginationComponent';

const ITEMS_PER_PAGE = 2;

const Home: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [filterBy, setFilterBy] = useState(''); // Ajouter le filtre par défaut
	const [sortBy, setSortBy] = useState(''); // Ajouter le tri par défaut

	const totalPages = Math.ceil(carPosts.length / ITEMS_PER_PAGE);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleFilter = (filter: string) => {
		setFilterBy(filter);
		// Mettez à jour ici la logique de filtrage en fonction du filtre choisi
	};

	const handleSort = (sort: string) => {
		setSortBy(sort);
		// Mettez à jour ici la logique de tri en fonction du tri choisi
	};

	const renderPagination = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<IonButton
					key={i}
					onClick={() => handlePageChange(i)}
					color={currentPage === i ? 'primary' : 'medium'}
					className="pagination-button"
				>
					{i}
				</IonButton>
			);
		}
		return pages;
	};

	const visibleCarPosts = carPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

	return (
		<Layout pageTitle='MilaVam'>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle size="large" className="medium-title">Ventes de Voitures</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<CarFilterBar />

				<IonGrid>
					<IonRow>
						{visibleCarPosts.map((car, index) => (
							<IonCol size="12" size-md="6" key={`carPost_${index}`}>
								<Post post={car} key={`carPost_${index}`} />
							</IonCol>
						))}
					</IonRow>
				</IonGrid>

				<PaginationComponent totalPages={carPosts.length / ITEMS_PER_PAGE} currentPage={currentPage} />
			</IonContent>
		</Layout>
	);
};

export default Home;
