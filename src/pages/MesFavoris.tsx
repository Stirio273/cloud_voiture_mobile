// Home.tsx

import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import "../styles/Home.css";
import CarFilterBar from "../components/CarFilterBar";
import PaginationComponent from "../components/PaginationComponent";
import api from "../services/api";
import { IonSpinner } from "@ionic/react";

const ITEMS_PER_PAGE = 2;

const MesFavoris: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState(""); // Ajouter le filtre par défaut
  const [sortBy, setSortBy] = useState(""); // Ajouter le tri par défaut
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseMarque = await api.get("/user/annonce/favoris");
        console.log(responseMarque.data.data);
        setAnnonces(responseMarque.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur", error);
        setLoading(false);
        setError(error);
      }
    };

    getData();
  }, []);

  const totalPages = Math.ceil(annonces.length / ITEMS_PER_PAGE);

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
          color={currentPage === i ? "primary" : "medium"}
          className="pagination-button"
        >
          {i}
        </IonButton>
      );
    }
    return pages;
  };

  const visibleAnnonces = annonces;

  return (
    <Layout pageTitle="MilaVam">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large" className="medium-title">
            Ventes de Voitures
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {loading && <IonSpinner name="crescent" color="light" />}
      {!loading && (
        <IonContent>
          <CarFilterBar />

          <IonGrid>
            <IonRow>
              {visibleAnnonces.map((annonce, index) => (
                <IonCol size="12" size-md="6" key={`carPost_${index}`}>
                  <Post annonce={annonce} key={`carPost_${index}`} afficherStatus={true}/>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonContent>
      )}
      {error && (
      <div className="error-message">
          <IonText color="danger">
              <p>{error.message || "An error occurred."}</p>
          </IonText>
      </div>
      )}
    </Layout>
  );
};

export default MesFavoris;
