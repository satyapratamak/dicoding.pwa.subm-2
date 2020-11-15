import DB from './db.js';

class Fav {

    constructor(){
        this.db = new DB();
    }

    favEPLTeam(id, data){

        $(document).ready(() => {
            $(`#click_favorite_${id}`).click(() => {
                if ($(`#add_start_${id}`).hasClass("fa-heart")) {
                        const page = window.location.hash.substr(1);
                        this.db.removeFavEPLTeam(id);
                        $(`#click_favorite_${id}`).removeClass('active')
                    setTimeout(() =>  {
                        $(`#click_favorite_${id}`).removeClass('active-2')
                    }, 30)
                        $(`#click_favorite_${id}`).removeClass('active-3')
                    setTimeout(() =>  {
                        $(`#add_start_${id}`).removeClass('fa-heart')
                        $(`#add_start_${id}`).addClass('fa-heart-o')
                        if(page !== 'home' && page !=='') {
                            document.getElementById("favorites").click()
                        }
                    }, 15)
                } else {
                    this.db.saveFavEPLTeam(data);
                    $(`#click_favorite_${id}`).addClass('active')
                    $(`#click_favorite_${id}`).addClass('active-2')
                    setTimeout(() =>  {
                        $(`#add_start_${id}`).addClass('fa-heart')
                        $(`#add_start_${id}`).removeClass('fa-heart-o')
                    }, 150)
                    setTimeout(() => {
                        $(`#click_favorite_${id}`).addClass('active-3')
                    }, 150)
                }
            })
        });

    }
}

export default Fav;