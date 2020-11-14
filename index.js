import Navigation from './js/navigation.js';
import RegisterSW from './js/regSW.js';

const regSW = new RegisterSW();


document.addEventListener("DOMContentLoaded", () => {
    const navigation = new Navigation();


    navigation.main();

});