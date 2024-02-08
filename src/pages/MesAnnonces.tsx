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
  IonRefresherContent,
  IonRefresher,
} from "@ionic/react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import "../styles/Home.css";
import CarFilterBar from "../components/CarFilterBar";
import PaginationComponent from "../components/PaginationComponent";
import api from "../services/api";
import { IonSpinner } from "@ionic/react";
import MonAnnonce from "../components/MonAnnonce";

const ITEMS_PER_PAGE = 2;

const MesAnnonces: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState(""); // Ajouter le filtre par défaut
  const [sortBy, setSortBy] = useState(""); // Ajouter le tri par défaut
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [annonceFavoris,setAnnonceFavoris] = useState<any[]>([]);

  const getData = async () => {
    try {
      const responseMarque = await api.get("/user/annonce/mesannonces");
      const annonceFavoris = await api.get("/user/annonce/favoris");
      setAnnonces(responseMarque.data.data);
      setAnnonceFavoris(annonceFavoris.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur", error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
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

  const visibleAnnonces = annonces.map((annonce) => ({
    ...annonce,
    isFavorite: annonceFavoris.some((favAnnonce) => favAnnonce.id === annonce.id),
  }));

  const handleRefresh = async (event: CustomEvent) => {
    try {
      await getData();
    } finally {
      event.detail.complete();
    }
  };

  return (
    <Layout pageTitle="MilaVam">

      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingText="Pull to refresh"
          refreshingText="Refreshing..."
        />
      </IonRefresher>

      <CarFilterBar />
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large" className="medium-title">
          Mes annonces
          </IonTitle>
          <IonText color="medium">Tirez vers le bas pour rafraîchir</IonText>
        </IonToolbar>
      </IonHeader>

      {loading && <IonSpinner name="crescent" color="light" />}
      {!loading && (
        
        <IonContent>
          <IonGrid>
            <IonRow>
              {visibleAnnonces.map((annonce, index) => (
                <IonCol size="12" size-md="6" key={`carPost_${index}`}>
                  <MonAnnonce annonce={annonce} key={`carPost_${index}`} afficherStatus={true} isFavorite={annonce.isFavorite}/>
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

export default MesAnnonces;
