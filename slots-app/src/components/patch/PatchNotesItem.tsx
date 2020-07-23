import React from "react";
import {IonContent, IonItem, IonLabel, IonText} from "@ionic/react";

interface Interface {
    patchNumber: string
    items: string[]
}

const PathNoteItem: React.FC<Interface> = (props) => {
    const listItems = props.items.map((number) =>
        <li>{number}</li>
    );
    return (

        <div>
            <IonItem lines="none">
                <IonLabel>
                    Release {props.patchNumber}
                </IonLabel>
            </IonItem>
                <IonItem>
                    <IonText className="ion-text-wrap">
                        <ul>
                                {listItems}
                        </ul>
                    </IonText>
                </IonItem>
        </div>
    );
};
export default PathNoteItem;
