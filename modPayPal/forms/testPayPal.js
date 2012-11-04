/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"02444691-8D2A-43C3-819C-B4657216BC19"}
 */
function testPayPal(event) {
	
	var req = new scopes.modPayPal.NVPRequest();
	req.user = 'paypro_1351879757_biz_api1.servoy.com';
	req.password = '1351879798';
	req.signature= 'AQhmRD9Ow0.uJR-UkN9ai5Ks-.ZvAqc7h-T7OSm0h5HNdo8z80W9VTrs';
	req.version = '56.0';
	req.method = scopes.modPayPal.METHODS.DO_DIRECT_PAYMENT;
	req.amount = '100';
	req.paymentAction = scopes.modPayPal.PAYMENT_ACTIONS.SALE;
	req.ipAddress = '192.168.0.1';
	req.creditCardType = scopes.modPayPal.CREDIT_CARD_TYPES.VISA
	req.account = '4147768078062740';
	req.expirationDate = '102017';
	req.cvv2 = '123';
	req.firstName = 'SEAN';
	req.lastName = 'DEVLIN';
	req.street = '424 E IRVIN AVE';
	req.city = 'STATE COLLEGE';
	req.state = 'PA';
	req.zip = '16801';
	req.countryCode = 'US';
	
	req.execute(scopes.modPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES,callbackMethod);	
}

/**
 * @param {scopes.modPayPal.NVPResponse} res
 *
 * @properties={typeid:24,uuid:"2DED0BA0-406D-47BF-B951-A91CF5BCD966"}
 */
function callbackMethod(res){
	plugins.dialogs.showInfoDialog('',res.toString());
}