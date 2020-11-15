import {Teams} from "./api.js";

class Navigation {

    constructor() {
        this.page = window.location.hash.substr(1);
    }
  
    main() {
      const elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
      this.loadNav();
      if(this.page == "") this.page = "epl-team";
      this.loadPage(this.page);
    }
  
    loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status != 200) return;
  
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });
  
                document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
                    elm.addEventListener("click", (event) => {
                        
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        this.page = event.target.getAttribute("href").substr(1);

                        helperLoadPage(this.page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();

        const helperLoadPage = (page) => {
            this.loadPage(page);
        };
  
        
    }
  
    loadPage(page) {
        const xhttp = new XMLHttpRequest();
        const teams = new Teams();
        //const standings = new Standings();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                const content = document.querySelector("#body-content");
                if(this.status == 200) {
                    if (page === 'epl-team'){
                        teams.getEPLTeams();
                    }else if(page === 'laliga-team') {
                        teams.getLaLigaTeams();
                    } else if(page === 'favorites') {
                        teams.getSavedTeams();
                    }
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }



}

export default Navigation;