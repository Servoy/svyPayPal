/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"02444691-8D2A-43C3-819C-B4657216BC19"}
 */
function testPayPal(event) {
	
	var amount = .99;
	var creditCardType = scopes.modPayPal.CREDIT_CARD_TYPES.VISA
	var account = '4147768078062740';
	var expirationDate = '102017';
	var cvv2 = '123';
	var firstName = 'SEAN';
	var lastName = 'DEVLIN';
	var street = '424 E IRVIN AVE';
	var city = 'STATE COLLEGE';
	var state = 'PA';
	var zip = '16801';
	var countryCode = 'US';
	
	scopes.modPayPal.doDirectPayment(callbackMethod,amount,firstName,lastName,street,city,state,zip,countryCode,creditCardType,account,expirationDate,cvv2);
}

/**
 * @param {scopes.modPayPal.NVPResponse} res
 *
 * @properties={typeid:24,uuid:"2DED0BA0-406D-47BF-B951-A91CF5BCD966"}
 */
function callbackMethod(res){
	plugins.dialogs.showInfoDialog('',res.toString());
}
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6B8EF189-3D73-4C6D-9D1A-C2A218545F0F"}
 */
function onShow(firstShow, event) {
	if(firstShow)
		scopes.modPayPal.initialize('paypro_1351879757_biz_api1.servoy.com','1351879798','AQhmRD9Ow0.uJR-UkN9ai5Ks-.ZvAqc7h-T7OSm0h5HNdo8z80W9VTrs',scopes.modPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES);
}
