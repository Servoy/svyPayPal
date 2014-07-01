
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
	var creditCardType = scopes.svyPayPal.CREDIT_CARD_TYPES.VISA;
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
	
	scopes.svyPayPal.doDirectPayment(onPaymentCallback,amount,firstName,lastName,street,city,state,zip,countryCode,creditCardType,account,expirationDate,cvv2);
}

/**
 * @param {scopes.svyPayPal.NVPResponse} res
 *
 * @properties={typeid:24,uuid:"9FD4C5DD-9C12-4798-AB9E-F3BE992E9B1A"}
 */
function onPaymentCallback(res){
	jsunit.assertTrue(res.ack == scopes.svyPayPal.ACK_CODES.SUCCESS || res.ack == scopes.svyPayPal.ACK_CODES.FAILURE);
}

/**
 * Test the initialization of Pay Pal Session
 * @properties={typeid:24,uuid:"1A673770-1B19-4432-975F-E713F2A98801"}
 */
function testInitialize() {
	jsunit.assertEquals(scopes.svyPayPal.getUser(),PAY_PAL_USER);
	jsunit.assertEquals(scopes.svyPayPal.getPassword(),PAY_PAL_PASSWORD);
	jsunit.assertEquals(scopes.svyPayPal.getSignature(),PAY_PAL_SIGNATURE);
	jsunit.assertEquals(scopes.svyPayPal.getNVPEndpoint(),scopes.svyPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES);
}

/**
 * @properties={typeid:24,uuid:"1233CB1B-0F49-4D0B-B184-9229961E2E58"}
 */
function testNVPRequest(){
	var req = new scopes.svyPayPal.NVPRequest();
	req.amount = .10;
	req.creditCardType = scopes.svyPayPal.CREDIT_CARD_TYPES.VISA;
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
	req.execute(scopes.svyPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES,onPaymentCallback);
}

/**
 * Callback method for when solution is opened.
 *
 * @properties={typeid:24,uuid:"8E2DD91B-BED5-4E10-A72E-DA7BCFCC8083"}
 */
function setup() {
	scopes.svyPayPal.initialize(PAY_PAL_USER,PAY_PAL_PASSWORD,PAY_PAL_SIGNATURE,scopes.svyPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES);
}

/**
 * Callback method for when solution is closed, force boolean argument tells if this is a force (not stoppable) close or not.
 *
 * @param {Boolean} force if false then solution close can be stopped by returning false
 *
 * @returns {Boolean}
 *
 * @properties={typeid:24,uuid:"3EA668B3-1155-418F-B124-E25B426AD51D"}
 */
function onSolutionClose(force) {
		
	// var log = scopes.svyLogManager.getLogger('bap.jenkins.istanbul')

	
	// write coverage json object.
	var coverageExists = false;
	try {
		if (__coverage__) {
			coverageExists = true;
			application.output('STD OK')
		}
	} catch (e) {
		application.output('STD __coverage__ is not defined')
		//log.error('__coverage__ is not defined')
	}

	
	if (coverageExists) {
		// TODO change file path
		var filePath = "C://Program Files (x86)//Jenkins//jobs//svyPayPal//report_coverage//coverage.json"
		var jsFile = plugins.file.createFile(filePath)
		if (!plugins.file.writeTXTFile(jsFile,JSON.stringify(__coverage__),'UTF-8','json')) {
			application.output('Cannot write file ' + filePath)
			// throw new scopes.svyIO.IOException('Cannot write file ' + filePath)
		} else {
			// TODO remove exception
			application.output('file ' + filePath + ' written with success')
			//throw new scopes.svyExceptions.IllegalStateException('file ' + filePath + ' written with success')
		}
	} else {
		// TODO remove exception
		//throw new scopes.svyExceptions.IllegalStateException('__coverage__ is not defined')
	}
	return true
}
