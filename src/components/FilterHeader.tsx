// FilterHeader.tsx

import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel, IonItem, IonGrid, IonRow, IonCol } from '@ionic/react';
import '../styles/FilterHeader.css'; // Import your CSS file for styling

const FilterHeader: React.FC = () => {
    return (
        <IonHeader id="stickyHeader" className="searchFormHeader sticky">
            <IonToolbar>
                <IonGrid>
                    <IonRow>
                        <IonCol size="2" className="header-filter">
                            <IonIcon
                                style={{
                                    '--size': '24',
                                    '--rotation': '0',
                                    '--color': 'var(--ion-color-dark)', // Adjust color based on your design
                                    '--ratio': '1',
                                }}
                                src="https://www.lacentrale.fr/static/fragment-lc-mozart-commons//statics/icons/crossBig.svg"
                            ></IonIcon>
                        </IonCol>
                        <IonCol size="10" className="header-filter__title">
                            <IonLabel
                                style={{
                                    '--textColor': 'var(--ion-color-dark)', // Adjust color based on your design
                                }}
                                class="Text_Text_text Text_Text_subtitle1"
                            >
                                Filtrer
                            </IonLabel>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <hr
                                style={{
                                    backgroundColor: 'var(--ion-color-medium)', // Adjust color based on your design
                                }}
                                className="Dividers_Divider_divider Dividers_Divider_horizontal divider"
                            />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonHeader>
    );
};

export default FilterHeader;
