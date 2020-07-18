import React, {useEffect, useState} from 'react';
import {IonContent, IonItem, IonLabel, IonList, IonToggle} from "@ionic/react";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;


function vibrationLabel(checked: boolean) {
    return (checked) ? 'on' : 'off'
}

interface SettingsPageProps {
    setSetMetaData: (val: any) => void
    metaData: any
}

const SettingsPage: React.FC<SettingsPageProps> = (props) => {
    console.log(props.metaData.settingsData.vibration + "componetns")

    const [checked, setChecked] = useState(props.metaData.settingsData.vibration);


    useEffect(() => {
        setChecked((props.metaData.settingsData.vibration))
    })

    const saveData = async (data: any) => {
        console.log(data)
        await Storage.set({
            key: 'metaData',
            value: JSON.stringify(data)
        })
    }

    return (
        <IonContent>
            <IonList>
                <IonItem>
                    <IonLabel>Vibration: {vibrationLabel(checked)}</IonLabel>
                    <IonToggle checked={checked} onIonChange={e => {
                        props.metaData.settingsData.vibration = e.detail.checked
                        setChecked(e.detail.checked)
                        props.setSetMetaData(props.metaData)
                        const json = props.metaData.toJson()
                        saveData(json).then().catch()

                    }}/>
                </IonItem>
            </IonList>
        </IonContent>
    );
};

export default SettingsPage;
