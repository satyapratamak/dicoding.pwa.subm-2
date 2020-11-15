class DB {

    constructor(){
        this.dbPromised = idb.open("rumah_bola", 1, (upgradeDb) => {
            const teamsObjectStore = upgradeDb.createObjectStore("teams", {
                keyPath: "id"
            });
            teamsObjectStore.createIndex("team_name", "name", {
                unique: false
            });
        });
    }

    getEPLAll() {
        return new Promise((resolve, reject) => {
            this.dbPromised
            .then((db) => {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then((teams) => {
                resolve(teams);
            });
        });
    }

    removeFavEPLTeam(id) {
        this.dbPromised
        .then((db) => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.delete(id);
            return tx.complete
        }).then(() => {
            console.log('Team deleted');
        });
    }

    saveFavEPLTeam(team) {
        this.dbPromised
        .then((db) => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.add(team);
            return tx.complete;  
        })
        .then(() => {
            console.log("Team berhasil di simpan");
        });
    }
}

export default DB;