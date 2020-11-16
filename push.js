var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMGPi-ujXHdQf-TeHcXf0E4dIxtxlV9rdZ9GriULzx5HmgLkbMEVtYGoHD0h7JyhlN8HoPLALP8J_sJw13CQLd0",
   "privateKey": "w3DZuGTT96bg1RV6mT1mkrX2vlhe1mfD6rF4q_XEKss"
};
 
 
webPush.setVapidDetails(
   'mailto:satya0906@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f-DGDTTz5AA:APA91bEpMferlw-jXPOVwAQRxYXLHDI4RWE9tsEpdic5YoM2t71rPzO-QJyWrTdxKzBRLrIqtgSY5l3X-0gTLp8RKhHDZ7Fpbt1n59KyY-cxXORDPoL8upVcI-mP-bTTsBu3T5U9aTt0",
   "keys": {
       "p256dh": "BGIDjuhfYX9Wue+sUlP6HuiSPmoq5Vpc/RFOETeqzfglF6cG6DzQlNO07huJxzkRQQ3t4rd8iqGgB/qDOaaZi+k=",
       "auth": "/nICDwpk9Mbx96+tLX/z5w=="
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