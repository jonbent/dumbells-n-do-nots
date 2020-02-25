import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import configureStore from './store/store'
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './util/SessionApiUtil'
import { receiveNewRoutineStartDate } from './actions/NewRoutineActions';
import { logout, login } from './actions/SessionActions';
import { openModal } from './actions/ModalActions';


document.addEventListener('DOMContentLoaded', () => {
    window.axios = axios;
    window.openModal = openModal;
    window.receiveNewRoutineStartDate = receiveNewRoutineStartDate;
    window.mobileAndTabletcheck = () => {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    };
    let store;
    let preloadedState = {ui:{
        filters: {
            currentStep: 1,
            pageSize: 10,
            pageNum: 1,
            maxCals: 625,
            minCals: 500
        }
    }};
    if (localStorage.jwtToken) {

        // Set the token as a common header for all axios requests
        setAuthToken(localStorage.jwtToken);

        // Decode the token to obtain the user's information
        const decodedUser = jwt_decode(localStorage.jwtToken);

        // Create a preconfigured state we can immediately add to our store
        preloadedState = { session: { isAuthenticated: true, user: decodedUser }, entities: { users: { [decodedUser.username]: decodedUser}} };
        store = configureStore(preloadedState);

        const currentTime = Date.now() / 1000;

        // If the user's token has expired
        if (decodedUser.exp < currentTime) {
            // Logout the user and redirect to the login page
            store.store.dispatch(logout());
            window.location.href = '/#/login';
        }
    } else {
        // If this is a first time user, start with an empty store
        store = configureStore(preloadedState);
    }
    window.store = store.store
    window.login = login
    window.logout = logout
    ReactDOM.render(<Root store={store.store} persistor={store.persistor}/>, document.getElementById('root'));
})



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
