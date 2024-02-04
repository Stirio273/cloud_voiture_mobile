import { IonAlert, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import api from "../services/api";
import { useState ,useEffect } from "react";
import { IonSpinner } from "@ionic/react";
import { Utilisateur } from '../services/interface';
 
const VendreAnnonce: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const [loading,setLoading] = useState(true);
    const [allUser,setAllUser] = useState<Utilisateur[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Utilisateur[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const responseMarque = await api.get("/utilisateur/liste");
            console.log(responseMarque.data.data);
            
            const allUsersData = responseMarque.data.data;
            setAllUser(allUsersData);
            setFilteredUsers(allUsersData);

            setLoading(false);
          } catch (error) {
            console.error("Erreur", error);
            setLoading(false);
            setError(error);
          }
        };
    
        getData();
      },[id]);

      const handleSearch = (event: CustomEvent) => {
        const term = event.detail.value || ''; // Si term est null, utilise une chaîne vide
        setSearchTerm(term);
        filterUsers(term);
    };

    const filterUsers = (term: string) => {
        if (term.trim() === '') {
            // Si la barre de recherche est vide, afficher tous les utilisateurs
            setFilteredUsers(allUser);
        } else {
            const filtered = allUser.filter((user) =>
                `${user.nom} ${user.prenom}`.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    const handleSellClick = (userId: number) => {
      // L'utilisateur a cliqué sur le bouton "Vendre"
      setSelectedUserId(userId);
    };

    const handleConfirmation = async (confirm: boolean) => {
      if (confirm) {
        const req = "/user/annonce/vendre/"+id+"/acheteur/"+selectedUserId;
        console.log(req);

        const responseMarque = await api.post(req);
        console.log(responseMarque);
        window.location.href = "mes-annonces";
      } 

      setSelectedUserId(null);

      
  };
    

    return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot="start">
                      <IonBackButton text="" style={{ left: '10px' }} />
                  </IonButtons>
                  <IonTitle className="ion-text-center">Vendre la voiture</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent>
              {loading && <IonSpinner name="crescent" color="light" />}
              {!loading && (
                  <IonGrid className="vendre-annonce-container">
                      <IonRow>
                          <IonCol className="ion-text-center">
                              <p className="instruction-text">Choisissez un utilisateur pour vendre votre voiture</p>
                          </IonCol>
                      </IonRow>
                      <IonRow>
                          <IonCol>
                              <IonSearchbar
                                  value={searchTerm}
                                  onIonInput={(e: CustomEvent) => handleSearch(e)}
                                  placeholder="Rechercher un utilisateur"
                                  onIonClear={() => setFilteredUsers(allUser)}
                              />
                          </IonCol>

                      </IonRow>
                      {filteredUsers.map((user) => (
                          <IonRow key={user.id} className="user-item">
                              <IonCol>
                                  <p>{`${user.nom} ${user.prenom}`}</p>
                              </IonCol>
                              <IonCol>
                                  <IonButton onClick={() => handleSellClick(user.id)}>Lui vendre</IonButton>
                              </IonCol>
                          </IonRow>
                      ))}
                  </IonGrid>
              )}
              {error && (
                <div className="error-message">
                    <IonText color="danger">
                        <p>{error.message || "An error occurred."}</p>
                    </IonText>
                </div>
            )}
              <IonAlert
                    isOpen={selectedUserId !== null}
                    header={'Confirmation de la vente'}
                    message={`Voulez-vous vraiment vendre le véhicule a cet utilisateur?`}
                    buttons={[
                        {
                            text: 'Non',
                            role: 'cancel',
                            handler: () => handleConfirmation(false),
                        },
                        {
                            text: 'Oui',
                            handler: () => handleConfirmation(true),
                        },
                    ]}
                />
          </IonContent>
      </IonPage>
  );
}

export default VendreAnnonce;
