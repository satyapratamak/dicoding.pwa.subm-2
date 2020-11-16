var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLtxAe-dWIkt--DUxM9LsgU23e0C-PKr_mYnqvOrd4JuzyTxJLbP2n8q36VIogupGmMkQa3hCgsU_q4glpGiIQE",
   "privateKey": "UYqnVz17JwhnWKdcGtLnW_c2L7fiSFA7cEmrVKa9Sa0"
};
 
 
webPush.setVapidDetails(
   'mailto:satya0906@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f0_M1XY7zUo:APA91bGdogHqKN5F-pbBScg4y5J2_1qv26pBnT3Gu7JE0ZGWf7KPhPPvma5OugjoLkLV7tAl20yWqqMhSgglaajKAD72wFttb_On1QO3V-zuQ8uGweNmi4KTMIeHx59S5Q7tBnjdViJx",
   "keys": {
       "p256dh": "BCBcbvOUmvpeh5XRF4u7/zKROJy0mZSsdzTYYqYqhx/HGTBeu8mvpmy2sW7uTmyFC6nqzTUHJlbI3R6hH+xEbCw=",
       "auth": " ItUssysN8LEZcZRAFLDfUg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '745683224092',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);