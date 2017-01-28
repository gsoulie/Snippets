var UI = {};

UI.info = function(_title, _message){
	return Ti.API.info("[--- " + (_title || "info") + " ---] " + (_message || ""));
};
UI.warn = function(_title, _message){
	return Ti.API.warn("[--- " + (_title || "info") + " ---] " + (_message || ""));
};

UI.createCard = function(){
	var card;
	card = Ti.UI.Android.createCardView({
        cardCornerRadius: 2,
        cardUseCompatPadding: true,
        top: 10,
        left: 10,
        right: 10,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
	return card;
};



UI.createSeparator = function(){
	var separator;
	separator = Ti.UI.createView({
        top: 5,
        bottom: 5,
        width: Ti.UI.FILL,
        height: 1,
        backgroundColor: Alloy.CFG.color.lightGrey 
    });
	return separator;
};

/**
 * 
 * @param {String}	_args.message
 * @param {String}	_args.ok
 * @param {String}	_args.cancel 
 */
UI.confirmation = function(_args){
	_args = _args || {};
	
	var opts = {title: _args.message || ""};
	opts.options = [_args.ok || "OK", _args.cancel || "ANNULER"];
	
	var dialog = Ti.UI.createOptionDialog(opts).show();
	
};
/**
 * boîte de dialogue de confirmation (oui / non)
 * 
 * @param {String} 		_args.title : titre de la dialogBox
 * @param {String} 		_args.message : Message à afficher
 * @param {String}		_args.successMessage : Message à afficher après exécution de la fonction de retour
 * @param {Function}	_args.successCallback : fonction de retour sur l'action ok
 * @param {Function}	_args.cancelCallback : fonction de retour sur l'action annuler
 * @param {String}		_args.libelleBoutonOk
 * @param {String}		_args.libelleBoutonAnnuler
 */
UI.confirmationDialogBox = function(_args){
    UI.info("Utils","confirmationDialogBox");
	// Create AlertDialog
	var alertBox = Ti.UI.createAlertDialog({
		title: _args.title ? _args.title : '',
		message: _args.message ? _args.message : '?',
		buttonNames: [_args.libelleBoutonAnnuler ? _args.libelleBoutonAnnuler : 'Annuler',_args.libelleBoutonOk ? _args.libelleBoutonOk : 'Ok'],
		cancel: 0
	});

	// Listener				
	alertBox.addEventListener('click', function(e){
		
	    // Annulation
		if(e.index == 0) {
			if(_args.cancelCallback){_args.cancelCallback();}
			alertBox.hide();
		} // Success
		else {
			if(_args.successCallback){
				_args.successCallback();
				
				if(_args.successMessage){UTILS.Alert('',_args.successMessage);}
			}
		}
	});
	alertBox.show();
};

UI.toast = function(_message,_shortDuration){
	if(_message && _message != ''){
		if(_shortDuration){
			var toast = Titanium.UI.createNotification({
			    duration: Ti.UI.NOTIFICATION_DURATION_SHORT,
			    message: _message
			});
		}else{
			
			var toast = Titanium.UI.createNotification({
			    duration: Ti.UI.NOTIFICATION_DURATION_LONG,
			    message: _message
			});
		}
	}
	toast.show();
};

module.exports = UI;
