import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle, 
    IonContent,
    IonSplitPane,
    IonMenu,
    IonRouterOutlet,
    IonMenuToggle,
    IonItem
} from '@ionic/react'
import { Redirect, Route } from 'react-router'
import Notification from './Notification'
import Dashboard from './Dashboard'

const Menu: React.FC = () => {

    const paths =[
        {name: 'Notification', url:'/app/Notification'},
        {name: 'Dashboard', url:'/app/Dashboard'}
    ];
    return (
        <IonPage>
        <IonSplitPane contentId='main'>

            <IonMenu contentId='main'>

               <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
               </IonHeader>

               <IonContent>
                {paths.map((item, index) =>(
                    <IonMenuToggle key ={index}>
                        <IonItem routerLink={item.url} routerDirection='forward'>
                            {item.name}
                        </IonItem>
                    </IonMenuToggle> 
                ))}
               </IonContent>
            </IonMenu>

            <IonRouterOutlet id='main'>
            <Route exact path="/app/Notification" component={Notification}/>
            <Route exact path="/app/Dashboard" component={Dashboard}/>
                    <Redirect to="/app/Notification"/>
            </IonRouterOutlet>
        </IonSplitPane>
        </IonPage>
    )
}

export default Menu