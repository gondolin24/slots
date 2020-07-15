import {IonButtons, IonFooter, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import './Page.css';
import Bank from "../components/bank/Bank";
import DefaultPage from "../components/DefaultPage";
import Slots from "../components/slots/Slots";
import {AppMetaData} from "../models/AppMetaData";
import _ from "lodash";

import {Plugins} from '@capacitor/core';
import PathNotes from "../components/patch/PatchNotes";

const {Storage} = Plugins


const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();
    let page = null
    const [appMetaData, setAppMetaData] = useState(new AppMetaData(1000, 0));
    const [inital, setInitial] = useState(true);

    useEffect(() => {
        Storage.get({key: 'metaData'}).then((result) => {
            const val: string = _.get(result, 'value') || '{}'
            const parsed = JSON.parse(val)
            if ((_.get(parsed, 'metaData')) && (inital)) {
                const json = _.get(parsed, 'metaData')
                const metaData = AppMetaData.fromJson(json)
                setAppMetaData(metaData)
                setInitial(false)
            }
        }).catch(() => {

        })
    })

    const setChildMetaData = (val: any) => {
        setAppMetaData(val)
    }


    switch (name) {
        case 'Slots' :
            page = <Slots metaData={appMetaData} setMetaData={setChildMetaData}/>
            break
        case 'Bank':
            page = <Bank/>
            break
        case 'ChangeList':
            page = <PathNotes/>
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
                    <IonTitle></IonTitle>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Page;
