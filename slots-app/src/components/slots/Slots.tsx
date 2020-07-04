import {IonContent, IonFab, IonFabButton, IonFabList, IonIcon} from '@ionic/react';
import React from 'react';
import {
    add,
    arrowBackCircle,
    arrowForwardCircle,
    arrowUpCircle, cash, chevronDown, chevronUp, logoFacebook, logoInstagram, logoTwitter,
    logoVimeo,
    person,
    settings,
    share
} from "ionicons/icons";

const Slots: React.FC = () => {


    return (
        <IonContent>
            <IonFab vertical="bottom" horizontal="start" slot="fixed">
                <IonFabButton color={'money'} >
                    <IonIcon icon={cash} />
                </IonFabButton>
                <IonFabList side="top" >
                    <IonFabButton color={'money'}><IonIcon icon={chevronUp} /></IonFabButton>
                </IonFabList>
                <IonFabList side="bottom">
                    <IonFabButton color={'money'}><IonIcon icon={chevronDown} /></IonFabButton>
                </IonFabList>
            </IonFab>

        </IonContent>
    );
};

export default Slots;
