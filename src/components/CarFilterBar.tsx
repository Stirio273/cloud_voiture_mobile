// CarFilterBar.tsx

import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import '../styles/CarFilterBar.css'; // Import your CSS file for styling
import { funnel, list } from 'ionicons/icons';

// interface CarFilterBarProps {
//     // Add any props if needed
// }

const CarFilterBar: React.FC = () => {
    return (
        <div className="car-filter-bar" id="car-filter-bar">
            <IonButton
                style={{ '--iconPosition': 'left' }}
                className="filter-button car-filter-button"
                href="/filters"
                data-page-zone="tri"
                data-tracking-click-id="filterAndSort"
            >
                <IonIcon
                    style={{
                        '--size': '24',
                        '--rotation': '0',
                        '--color': 'var(--ion-color-primary)',
                        '--ratio': '1',
                    }}
                    icon={funnel}
                ></IonIcon>
                <span className="filter-label">Filtrer</span>
            </IonButton>

            <IonButton
                style={{ '--iconPosition': 'left' }}
                className="filter-button car-filter-button"
            >
                <IonIcon
                    style={{
                        '--size': '24',
                        '--rotation': '0',
                        '--color': 'var(--ion-color-primary)',
                        '--ratio': '1',
                    }}
                    icon={list}
                ></IonIcon>
                <span className="filter-label">Trier</span>
            </IonButton>
        </div>
    );
};

export default CarFilterBar;
