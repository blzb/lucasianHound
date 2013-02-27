hound.tokenHandler=function(msg) {
    receivedElement.setAttribute('style', 'display:block;');
    alert("Token Handler " + msg);
};
hound.successGCMRegistration= function(){
    alert("Registration completed");
};
hound.pushRegistration = function(){
    alert("Registrando dispositivo");
        var pushNotification = window.plugins.pushNotification;    
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            alert("registrando andorid");
            pushNotification.register(this.successHandler, this.errorHandler,{
                "senderID":hound.senderId,
                "ecb":"hound.onNotificationGCM"
            });
        }
        else if(device.platform =='iPhone' || device.platform=='iPad' || device.platform == "IPhone" || device.platform=="IPad") {
            alert("registering device");
            pushNotification.register(this.tokenHandler,this.errorHandler,{
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"hound.onNotificationAPN"
            });
        }
}
hound.onNotificationAPN = function(event) {
    var pushNotification = window.plugins.pushNotification;
    alert("Received a notification! " + event.alert);
    alert("event sound " + event.sound);
    alert("event badge " + event.badge);
    alert("event " + event);
    if (event.alert) {
        navigator.notification.alert(event.alert);
    }
    if (event.badge) {
        alert("Set badge on  " + pushNotification);
        pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
    }
    if (event.sound) {
        var snd = new Media(event.sound);
        snd.play();
    }
};
hound.onNotificationGCM= function(e) {
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                var datos = {};
                datos.uuid=device.uuid;
                datos.nombre=device.name;
                datos.plataforma=device.platform;
                datos.versionOS=device.version;
                datos.regId=e.regId;
                $.ajax({
                    type : "POST",
                    url : this.config.remote_server
                    + this.config.appName +"/dispositivo",
                    data : JSON.stringify(datos),
                    contentType : "application/json",
                    success : function(data) {
                        alert("datos del dispositivo Enviados");
                    },
                    error : function(xhr,status, error) {
                        hound.errorHandler(xhr, this, hound.errorPrint);
                    },
                    retryExceeded: function(){
                        hound.errorAlert(this.mensajeError+": "+this.retryLimit+" intentos fallidos, operacion abortada intenta mas tarde");
                    },
                    tryCount: 0,
                    retryLimit: 4,
                    timeout : 30000,
                    mensajeError: "Registro de dispositivo"

                });
            }
            break;

        case 'message':
            // this is the actual push notification. its format depends on the data model
            // of the intermediary push server which must also be reflected in GCMIntentService.java
            alert(JSON.stringify(e));
            break;

        case 'error':
            alert('GCM error = '+e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
}