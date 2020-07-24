import React from "react";
import {IonContent, IonItem, IonLabel, IonText} from "@ionic/react";
import PathNoteItem from "./PatchNotesItem";

const PathNotes: React.FC = () => {

    return (
        <IonContent>

            <PathNoteItem items={[
                'Mat bet follows an algo for scaling',
                '',
            ]} patchNumber={'1.3.3'}/>


            <IonItem lines="none">
                <IonLabel>
                    Release 1.3.2
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonText className="ion-text-wrap">
                    <ul>
                        <li>2.0 % chance to get 2 special coins</li>
                        <li>0.2 % chance to get 3 special coins</li>
                        <li>Slowly rolling our dog theme</li>

                    </ul>
                </IonText>
            </IonItem>
            <IonItem lines="none">
                <IonLabel>
                    Release 1.3.1
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonText className="ion-text-wrap">
                    <ul>
                        <li>Minor UI changes</li>
                        <li>more rewards redeemable</li>

                    </ul>
                </IonText>
            </IonItem>

            <PathNoteItem items={['Minor UI changes',
                'Some rewards now redeemable',

            ]} patchNumber={'1.3.0'}/>


            <PathNoteItem items={[
                'Minor Bug fixes',
                'Settings vibration Toggle',
                'Win change decreased', '  Min bet of 25'
            ]} patchNumber={'1.2.0'}/>


            <IonItem lines="none">
                <IonLabel>
                    Release 1.1.1
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Minor Bug fixes + ui change
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Max bet of 200,000
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Added Special coins
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Can view upcoming rewards
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className="ion-text-wrap">
                    Bank is available for stats
                </IonLabel>
            </IonItem>

            <IonItem lines="none">
                <IonLabel>
                    Release 1.1.0
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Added JackPot
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Removed loading when placing bet
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    win rate increased 55% -> 60%
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className="ion-text-wrap">
                    0+(random())*.65 to random*.75 + random*2
                </IonLabel>
            </IonItem>

            <IonItem lines="none">
                <IonLabel>
                    Release 1.0.1
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Added new losing and winning animations
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Fixed bug where back button causes infinite calculations
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Losing all your coin now yields 6 coins . Previous was 26
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className="ion-text-wrap">
                    Nerfed multiplier. 1+(random()) to 0+(random())*.65
                </IonLabel>
            </IonItem>

            <IonItem lines="none">
                <IonLabel>
                    Release 1.0.0
                </IonLabel>
            </IonItem>
            <IonItem lines={"none"}>
                <IonLabel className="ion-text-wrap">
                    Initial Release
                </IonLabel>
            </IonItem>
            <IonItem>
                <IonLabel className="ion-text-wrap">
                    Slots Working
                </IonLabel>
            </IonItem>

        </IonContent>
    );
};
export default PathNotes;
