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
import Rewards from "../components/rewards/Rewards";
import SettingsPage from "../components/settings/SettingsPage";
import {SettingsData} from "../models/SettingsData";
import {StoreMetaData} from "../models/store/StoreMetaData";

const {Storage} = Plugins


function nameMap() {
    return {
        'SettingsPage': {
            name: 'Settings'
        }
    }
}

const Page: React.FC = () => {

    const {name} = useParams<{ name: string; }>();
    let page = null
    const [appMetaData, setAppMetaData] = useState(new AppMetaData(1000, 0, 0, new SettingsData(true),
        new StoreMetaData(0)));
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
    }, [inital])

    const saveData = async (data: any) => {
        await Storage.set({
            key: 'metaData',
            value: JSON.stringify(data)
        })
    }

    const setChildMetaData = (val: any) => {
        setAppMetaData(val)
        const json = appMetaData.toJson()
        saveData(json).then().catch()
    }

    let headerName = ''
    switch (name) {
        case 'Slots' :
            headerName = 'Slots'
            page = <Slots metaData={appMetaData} setMetaData={setChildMetaData}/>
            break
        case 'Bank':
            headerName = 'Bank'
            page = <Bank metaData={appMetaData}/>
            break
        case 'ChangeList':
            headerName = 'Patch Notes'
            page = <PathNotes/>
            break
        case 'Rewards':
            headerName = 'Shop Rewards'
            page = <Rewards/>
            break
        case 'SettingsPage':
            headerName = 'Settings'
            page = <SettingsPage metaData={appMetaData} setSetMetaData={setChildMetaData}/>
            break
        default :
            headerName = ''
            page = <DefaultPage/>
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonTitle>{headerName}</IonTitle>
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
