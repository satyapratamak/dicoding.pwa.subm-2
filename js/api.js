
import DB from "./db.js";
import Fav from "./fav.js";


class API {

    constructor(){
        this.baseUrl = 'https://api.football-data.org/v2';
        this.apiKey = '0e42cd9c1953405f81134678fb75b5dd';
        this.fav = new Fav();

        this.db = new DB();
        this.options = {
            headers: {
                'X-Auth-Token': `${this.apiKey}`
            }
        };
    }

    status(response) {
        if (response.status !== 200) {
            console.log('Error : ' + response.status);
            return Promise.reject(new Error(response.statusText));
        } else {
            return Promise.resolve(response);
        }
    }

    json(response) {
        return response.json(); 
    }

    error(error) {
        if (!"caches" in window) {
            alert(error);
        } 
    }
}

class Teams extends API{

    checkCacheEPLTeams() {
        if ("caches" in window) {
            caches.match(`${this.baseUrl}/competitions/2021/teams`)
            .then(this.status)
            .then(this.json)
            .then(data => {
                this.db.getAll().
                then(savedTeams => {
                    setTimeout(() => {
                        this.renderHtmlTeams(data.teams, savedTeams);
                    }, 1000);
                });
            })
            .catch(this.error);
        }
    }

    

    checkCacheLaLigaTeams() {
        if ("caches" in window) {
            caches.match(`${this.baseUrl}/competitions/2021/teams`)
            .then(this.status)
            .then(this.json)
            .then(data => {
                this.db.getAll().
                then(savedTeams => {
                    setTimeout(() => {
                        this.renderHtmlTeams(data.teams, savedTeams);
                    }, 1000);
                });
            })
            .catch(this.error);
        }
    }

    
    getEPLTeams() {
        this.checkCacheEPLTeams();
        fetch(`${this.baseUrl}/competitions/2021/teams`, this.options)
        .then(this.status)
        .then(this.json)
        .then(data => {
            this.db.getAll().
            then(savedTeams => {
                setTimeout(() => {
                    this.renderHtmlTeams(data.teams, savedTeams);
                }, 1000);
            });
        })
        .catch(this.error);
    }

    getLaLigaTeams() {
        this.checkCacheLaLigaTeams();
        fetch(`${this.baseUrl}/competitions/2014/teams`, this.options)
        .then(this.status)
        .then(this.json)
        .then(data => {
            this.db.getAll().
            then(savedTeams => {
                setTimeout(() => {
                    this.renderHtmlTeams(data.teams, savedTeams);
                }, 1000);
            });
        })
        .catch(this.error);
    }

    renderHtmlTeams(teams, savedTeams) {
        const teamsHtml = document.getElementById("teams");
        teamsHtml.innerHTML = '';
        teams.forEach(data => {
           
            let faHeart = 'fa-heart-o';
            let isSaved = false;
            let active = '';
            for(let i = 0; i < savedTeams.length; i++) {
                if(data.id === savedTeams[i].id) {
                    isSaved = true;
                    break;
                }
            }        
            if(isSaved) {
                active = 'active active-2 active-3';
                faHeart = 'fa-heart';
            }
            teamsHtml.innerHTML += `
                <div class="col s12 m6">
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src="${data.crestUrl}" alt="${data.name}" class="responsive-img" style="margin: 10px;">
                        </div>
                        <div class="card-stacked">
                            <div class="col s5" style="margin-top: 5px;">
                                <div class="click ${active}" id="click_favorite_${data.id}">
                                    <span class="fa ${faHeart}" id="add_start_${data.id}"></span>
                                    <div class="ring"></div>
                                    <div class="ring2"></div>
                                </div>
                            </div>
                            <div class="card-content">
                                <span class="card-title" style="color: black;"><strong>${data.name}</strong></span>
                                <p>
                                    Address: ${data.address}
                                </p>
                            </div>
                            <div class="card-action">
                                <a href="${data.website}" target="__blank">Website</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            this.fav.favTeam(data.id, data);
        });

        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = "./assets/img/logo.png"
            })
        });
    }
    
    getSavedTeams() {
        
        this.db.getAll()
        .then(teams => {
            setTimeout(() => {
                this.renderFavTeams(teams);
            }, 1000);
        });
    }

    

    renderFavTeams(teams) {
        const teamsHtml = document.getElementById("favorite_teams");
        teamsHtml.innerHTML = '';
        if(teams.length != 0) {
            teams.forEach(data => {
                
                teamsHtml.innerHTML += `
                    <div class="col s12 m6">
                        <div class="card horizontal">
                            <div class="card-image">
                                <img src="${data.crestUrl}" alt="${data.name}" class="responsive-img" style="margin: 10px;">
                            </div>
                            <div class="card-stacked">
                                <div class="col s5" style="margin-top: 5px;">
                                    <div class="click active active-2 active-3" id="click_favorite_${data.id}">
                                        <span class="fa fa-heart" id="add_start_${data.id}"></span>
                                        <div class="ring"></div>
                                        <div class="ring2"></div>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <span class="card-title" style="color: black;"><strong>${data.name}</strong></span>
                                    <p>
                                        Address: ${data.address}
                                    </p>
                                </div>
                                <div class="card-action">
                                    <a href="${data.website}" target="__blank">Website</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                this.fav.favTeam(data.id, data);
            });
        } else {
            teamsHtml.innerHTML = `
                <h4>The favorite team is empty</h4>
            `;
        }

        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            img.addEventListener('error', () => {
                img.src = "./assets/img/logo.png"
            })
        });
    }

    
}


export {Teams};