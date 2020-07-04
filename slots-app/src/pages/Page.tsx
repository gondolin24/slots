import {IonButtons, IonFooter, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React from 'react';
import {useParams} from 'react-router';
import './Page.css';
import Bank from "../components/bank/Bank";
import DefaultPage from "../components/DefaultPage";
import Slots from "../components/slots/Slots";

const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();
    let page = null
    switch (name) {
        case 'Slots' :
            page = <Slots/>
            break
        case 'tt':
            page = <Bank/>
            break
        default :
            page = <DefaultPage/>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            {page}
            <IonFooter>
                <IonToolbar>
                    <IonTitle>Footer</IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Page;
