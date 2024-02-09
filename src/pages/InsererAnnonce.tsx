import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton
} from '@ionic/react';
import Layout from '../components/Layout';
import api from '../services/api';
import { IonSpinner } from '@ionic/react';
import { Toast } from '@capacitor/toast';
import '../styles/InsererAnnonce.css';

const InsererAnnonce: React.FC = () => {
  const [marques, setMarques] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [carburants, setCarburants] = useState<any[]>([]);
  const [photos, setPhotos] = useState<string[] | null>(null);

  const [selectedMarque, setSelectedMarque] = useState<string>("");
  const [selectedCategorie, setSelectedCategorie] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedCarburant, setSelectedCarburant] = useState<string>("");
  const [selectedPrix, setSelectedPrix] = useState<string>("");
  const [selectedDescription, setSelectedDescription] = useState<string>("");
  const [selectedNomVoiture, setSelectedNomVoiture] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg
    })
  }

  useEffect(() => {

    const getData = async () => {
      try {
        const marqueResp = await api.get('/marque');
        setMarques(marqueResp.data.data);
        const categorieResp = await api.get('/categorie');
        setCategories(categorieResp.data.data);
        const typeResp = await api.get('/type');
        setTypes(typeResp.data.data);
        const carburantResp = await api.get('/carburant');
        setCarburants(carburantResp.data.data);
        setDataLoading(false);
      } catch (error) {
        console.error("Erreur", error);
        setDataLoading(false);
        showToast('Error during login');
      }
    };

    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      selectedNomVoiture.trim() === "" ||
      selectedMarque.trim() === "" ||
      selectedCategorie.trim() === "" ||
      selectedType.trim() === "" ||
      selectedCarburant.trim() === "" ||
      selectedPrix.trim() === "" ||
      selectedDescription.trim() === ""
    ) {
      console.log("Please fill in all the fields");
      showToast("Please fill in all the fields");
      return;
    }

    const annonce = {
      nomVoiture: selectedNomVoiture,
      marque: JSON.parse(selectedMarque),
      type: JSON.parse(selectedType),
      categorie: JSON.parse(selectedCategorie),
      carburant: JSON.parse(selectedCarburant),
      prix: Number(selectedPrix),
      description: selectedDescription,
      date: new Date()
    };

    const annoncePost = {
      annonce: annonce,
      image: photos,
    };

    setIsLoading(true);

    try {
      const response = await api.post('/user/annonce', annoncePost);

      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = '/home';

    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    const filesArray: string[] = [];

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const reader = new FileReader();
        const file = selectedFiles[i];

        reader.onload = (event) => {
          const base64String = event.target?.result?.toString()?.split(",")[1];

          if (base64String) {
            filesArray.push(base64String);
            if (filesArray.length === selectedFiles.length) {
              setPhotos(filesArray);
            }
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Layout pageTitle='Inserer annonce'>
      <IonContent className="ion-padding">
        {dataLoading ? (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <IonSpinner />
          </div>
        ) : (
          <IonList>

            <IonItem>
              <IonLabel position="stacked">Nom voiture</IonLabel>
              <IonTextarea
                value={selectedNomVoiture}
                onIonChange={(e) => setSelectedNomVoiture(e.detail.value!)}
                placeholder="Entrez nom ici"
                aria-label="Nom"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Marque</IonLabel>
              <IonSelect
                placeholder="Sélectionner"
                value={selectedMarque}
                onIonChange={(e) => setSelectedMarque(e.detail.value)}
                aria-label="Marque"
              >
                <IonSelectOption value="">
                  Sélectionner
                </IonSelectOption>
                {marques.map((ctr, index) => (
                  <IonSelectOption key={index} value={JSON.stringify(ctr)}>
                    {ctr.libelle}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Catégorie</IonLabel>
              <IonSelect
                placeholder="Sélectionner"
                value={selectedCategorie}
                onIonChange={(e) => setSelectedCategorie(e.detail.value)}
                aria-label="Categeorie"
              >
                <IonSelectOption value="">
                  Sélectionner
                </IonSelectOption>
                {categories.map((ctr, index) => (
                  <IonSelectOption key={index} value={JSON.stringify(ctr)}>
                    {ctr.libelle}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Type</IonLabel>
              <IonSelect
                placeholder="Sélectionner"
                value={selectedType}
                onIonChange={(e) => setSelectedType(e.detail.value)}
                aria-label="Type"
              >
                <IonSelectOption value="">
                  Sélectionner
                </IonSelectOption>
                {types.map((ctr, index) => (
                  <IonSelectOption key={index} value={JSON.stringify(ctr)}>
                    {ctr.libelle}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Carburant</IonLabel>
              <IonSelect
                placeholder="Sélectionner"
                value={selectedCarburant}
                onIonChange={(e) => setSelectedCarburant(e.detail.value)}
                aria-label="Carburant"
              >
                <IonSelectOption value="">
                  Sélectionner
                </IonSelectOption>
                {carburants.map((ctr, index) => (
                  <IonSelectOption key={index} value={JSON.stringify(ctr)}>
                    {ctr.libelle}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Prix</IonLabel>
              <IonInput
                type="text"
                value={selectedPrix}
                onIonChange={(e) => setSelectedPrix(e.detail.value!)}
                placeholder="Entrez prix ici"
                aria-label="Prix"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonTextarea
                value={selectedDescription}
                onIonChange={(e) => setSelectedDescription(e.detail.value!)}
                placeholder="Entrez description ici"
                aria-label="Description"
              />
            </IonItem>

            <IonItem>
              <IonLabel className="ion-text-white" position="stacked">
                Photos
              </IonLabel>
              <input type="file" name="photos" onChange={(ev) => handleFileChange(ev)} multiple />
            </IonItem>

          </IonList>
        )}

        {!dataLoading ? (
          <IonButton className="custom-button" expand="block" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <IonSpinner name="crescent" color="light" />
            ) : (
              'Valider'
            )}
          </IonButton>
        ) : null}

      </IonContent>
    </Layout>
  );
};

export default InsererAnnonce;
