const CACHE_NAME = "RumahBola-v1";

const urlsToCache = [

    // root folder
    "/",
    "/nav.html",
    "/index.html",
    "/index.js",
    "/manifest.json",
    //assets/img/
    "/assets/img/logo.jpg",
    "/assets/img/logo.png",
    "/assets/img/my-picture.png",
    "/assets/img/user.png",
    "/assets/img/LaLiga.png",
    "/assets/img/EPL.png",
    // /css
    "/css/custom.css",
    // /js
    "/js/api.js",
    "/js/navigation.js",
    "/js/regSW.js",
    "/js/db.js",
    "/js/idb.js",
    "/js/fav.js",
    // /pages
    "/pages/epl-team.html",
    "/pages/laliga-team.html",
    "/pages/favorites.html",

    // online reference
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
    
   
    
];

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then( (cache) => {
        return cache.addAll(urlsToCache);
      })
    );
});


self.addEventListener("fetch", (event) => {
    const base_url = "https://api.football-data.org";
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then( (cache) => {
          return fetch(event.request).then( (response) => {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
      event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((response) => {
          return response || fetch (event.request);
        })
      )
    }
});