
/**
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"11F7DA77-BC25-481E-B15F-DCF59B371C59"}
 */
var PAY_PAL_USER = 'paypro_1351879757_biz_api1.servoy.com';
/**
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"5C66FC66-E094-4F8B-A983-FBDF5A843239"}
 */
var PAY_PAL_PASSWORD = '1351879798';
/**
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"49516429-76AB-4A88-B830-7E7290EE3622"}
 */
var PAY_PAL_SIGNATURE = 'AQhmRD9Ow0.uJR-UkN9ai5Ks-.ZvAqc7h-T7OSm0h5HNdo8z80W9VTrs'
	
/**
 * @properties={typeid:24,uuid:"55B9F550-C1D2-4356-9208-7BFF324C8D5C"}
 */
function testDoPayment() {
	
	var amount = .10;
	var creditCardType = scopes.modPayPal.CREDIT_CARD_TYPES.VISA;
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
	
	scopes.modPayPal.doDirectPayment(onPaymentCallback,amount,firstName,lastName,street,city,state,zip,countryCode,creditCardType,account,expirationDate,cvv2);
}

/**
 * @param {scopes.modPayPal.NVPResponse} res
 *
 * @properties={typeid:24,uuid:"9FD4C5DD-9C12-4798-AB9E-F3BE992E9B1A"}
 */
function onPaymentCallback(res){
	jsunit.assertTrue(res.ack == scopes.modPayPal.ACK_CODES.SUCCESS || res.ack == scopes.modPayPal.ACK_CODES.FAILURE);
}

/**
 * Test the initialization of Pay Pal Session
 * @properties={typeid:24,uuid:"1A673770-1B19-4432-975F-E713F2A98801"}
 */
function testInitialize() {
	jsunit.assertEquals(scopes.modPayPal.getUser(),PAY_PAL_USER);
	jsunit.assertEquals(scopes.modPayPal.getPassword(),PAY_PAL_PASSWORD);
	jsunit.assertEquals(scopes.modPayPal.getSignature(),PAY_PAL_SIGNATURE);
	jsunit.assertEquals(scopes.modPayPal.getNVPEndpoint(),scopes.modPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES);
}

/**
 * @properties={typeid:24,uuid:"1233CB1B-0F49-4D0B-B184-9229961E2E58"}
 */
function testNVPRequest(){
	var req = new scopes.modPayPal.NVPRequest();
	req.amount = .10;
	req.creditCardType = scopes.modPayPal.CREDIT_CARD_TYPES.VISA;
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
	req.execute(scopes.modPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES,onPaymentCallback);
}

/**
 * Callback method for when solution is opened.
 *
 * @properties={typeid:24,uuid:"8E2DD91B-BED5-4E10-A72E-DA7BCFCC8083"}
 */
function setup() {
	scopes.modPayPal.initialize(PAY_PAL_USER,PAY_PAL_PASSWORD,PAY_PAL_SIGNATURE,scopes.modPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES);
}
