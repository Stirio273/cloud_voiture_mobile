import { IonCard, IonIcon } from '@ionic/react';
import React from 'react';
import '../styles/PaginationComponent.css'
import { chevronBack, chevronForward } from 'ionicons/icons';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
    const generatePageLink = (page: number) => {
        const isActive = currentPage === page;
        const pageLinkClass = isActive ? 'page active' : 'page';
        const pageLink = `/listing?makesModelsCommercialNames=&options=&page=${page}`;

        return (
            <IonCard key={page} href={pageLink} className={pageLinkClass} data-tracking-click-id="rechercheAnnonces">
                {page}
            </IonCard>
        );
    };

    const generatePagination = () => {
        const pages: JSX.Element[] = [];

        for (let i = 1; i <= Math.min(totalPages, 9); i++) {
            pages.push(generatePageLink(i));
        }

        if (totalPages > 9) {
            pages.push(<span key="ellipsis" className="showOtherPagesToggle">...</span>);
            pages.push(generatePageLink(totalPages));
        }

        return pages;
    };

    return (
        <div className="pagination" data-page-zone="pagination">
            <div className='chevronLeft'>
                <a role="navigation" aria-label="previous-page" className="link disabled" data-tracking-click-id="rechercheAnnonces">
                    <span className="Icon_Icon_root arrow disabled Icon_Icon_colored">
                        <IonCard className='chevronLeftButton'>
                            <IonIcon icon={chevronBack} />
                        </IonCard>
                    </span>
                </a>
            </div>
            <div className="numberPages">{generatePagination()}</div>
            <div className='chevronRight'>
                <a aria-label="next-page" className="link" href={`/listing?makesModelsCommercialNames=&options=&page=${currentPage + 1}`} data-tracking-click-id="rechercheAnnonces">
                    <span className="Icon_Icon_root arrow Icon_Icon_colored">
                        <IonCard className='chevronRightButton'>
                            <IonIcon icon={chevronForward} />
                        </IonCard>
                    </span>
                </a>
            </div>
        </div>
    );
};

export default PaginationComponent;
