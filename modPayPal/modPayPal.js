/**
 * This module provides a means to process payments through PayPal, by providing a wrapper API for the Name-Value-Pair (NVP) API offered by PayPal.
 * @see https://cms.paypal.com/us/cgi-bin/?cmd=_render-content&content_ID=developer/howto_api_overview
 * 
 * The API is supports two levels of interaction. A stateless, low-level interaction, in which the user may programmatically build and execute payment requests, and handle responses accordingly.
 * Building on this, a stateful, high-level API is offered, in which a single method may be called to issue a payment processing request. 
 * In both cases, requests are executed asynchronously from the server and responses are handled in a callback to the client. 
 * 
 * It is recommended to use the high-level API, which keeps certain PayPal credentials in memory, throughout the client session.
 * The initialize() method method must be called prior to processing any payments. Here you will pass in the PayPal credentials and service end point.
 * @see initialize
 * 
 * To process payments, use the doDirectPayment() method and pass in the required information, such as credit card number and billing address, etc.
 * A callback method may be specified to handle the response
 * @see doDirectPayment
 * @see NVPResponse
 * 
 * NOTE: This module only supports the 'DIRECT PAYMENT' method of the PayPal NVP API. It does not (currently) support Credit Card authorizations.
 * This method is a feature of the 'Payments Pro' offering from pay pal
 * @see https://www.paypal.com/webapps/mpp/paypal-payments-pro 
 * 
 * NOTE: All payments are processed from Servoy's Headless Client API, and therefore use of this API consumes 1 additional License
 * 
 * NOTE: This API does not (currently) support multiple version of the PayPal API and is standardized on version 56
 */


/**
 * The name of this solution, used when invoking headless client calls
 * @type {String}
 * @private
 * @properties={typeid:35,uuid:"BDA6C2B4-362B-44CE-AA02-CACBCF97868A"}
 */
var SOLUTION_NAME = 'modPayPal';

/**
 * The default name of the user account for the headless client session which dispatches calls 
 * @type {String}
 * @properties={typeid:35,uuid:"7BDE6863-8786-454A-9A7C-0C051C933467"}
 */
var DEFAULT_REMOTE_USER_NAME = 'paypalRemoteDispatch';

/**
 * The default password for the headless session to dispatch calls 
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"CE14A4BC-0721-483D-80BF-119DDE013B17"}
 */
var DEFAULT_REMOTE_USER_PASSWORD = 'servoy';

/**
 * The client ID for the headless session to dispatch calls
 * @type {String}
 * @properties={typeid:35,uuid:"B9D3E003-4E8B-4F33-B43C-70C4A9A94D99"}
 */
var REMOTE_CLIENT_ID = '00000000-0000-0000-0000-REMOTEPAYPAL';

/**
 * The value for the user account used to log into the headless session for remote dispatch
 * @type {String}
 * @private 
 * @see initialize method to override this value
 * @properties={typeid:35,uuid:"140D5059-67DA-4999-A765-2E08ECA532CA"}
 */
var remoteUserName = DEFAULT_REMOTE_USER_NAME;

/**
 * The value for the user password used to log into the headless session for remote dispatch
 * @type {String}
 * @private 
 * @see initialize method to override this value
 * @properties={typeid:35,uuid:"BCD5E249-3418-4667-ABBE-6E6FC9F48A15"}
 */
var remoteUserPassword = DEFAULT_REMOTE_USER_PASSWORD;

/**
 * Supported values for the API parameter "METHOD"
 * @enum
 * @properties={typeid:35,uuid:"1F4583D6-B57C-405B-B60E-6E20D831F555",variableType:-4}
 */
var METHODS = {
	DO_DIRECT_PAYMENT:'DoDirectPayment'
};

/**
 * Supported values for the API parameter "PAYMENTACTION"
 * @enum
 * @properties={typeid:35,uuid:"5D441665-35ED-4CBB-B7DF-774A8663F00E",variableType:-4}
 */
var PAYMENT_ACTIONS = {
	AUTHORIZATION:'Authorization',
	SALE:'Sale'
};

/**
 * Supported values for the API parameter "REFUND_FMF_DETAILS"
 * @enum
 * @properties={typeid:35,uuid:"009920EE-F46F-4F83-88F1-2725CB987809",variableType:-4}
 */
var REFUND_FMF_DETAILS = {
	YES:1,
	NO:0
};

/**
 * Supported values for the API parameter "CREDITCARDTYPE"
 * @enum
 * @properties={typeid:35,uuid:"0A8E1663-6952-4EF9-995C-80AE8F18A003",variableType:-4}
 */
var CREDIT_CARD_TYPES = {
	VISA:'Visa',
	MASTERCARD:'Mastercard',
	DISCOVER:'Discover',
	AMEX:'Amex',
	MAESTRO:'Maestro'
};

/**
 * Supported values for the API response parameter "ACK"
 * @enum
 * @properties={typeid:35,uuid:"14499C91-D517-4AF0-A8D6-2AB85B446B98",variableType:-4}
 */
var ACK_CODES = {
	SUCCESS:'SUCCESS',
	FAILURE:'FAILURE'
};

/**
 * Supported values for API end points
 * @enum
 * @properties={typeid:35,uuid:"C56505E6-BD32-4A83-8EC6-9508D33F91A7",variableType:-4}
 */
var NVP_END_POINTS = {
	SANDBOX_SIGNATURES:'https://api-3t.sandbox.paypal.com/nvp',
	SANDBOX_CERTIFICATES:'https://api.sandbox.paypal.com/nvp',
	PRODUCTION_SIGNATURES:'https://api-3t.paypal.com/nvp',
	PRODUCTION_CERTIFICATES:'https://api.paypal.com/nvp'
};

/**
 * Names of all request parameters
 * @enum
 * @properties={typeid:35,uuid:"2DAAACA3-1FEC-4A93-9D59-80B12F08842A",variableType:-4}
 */
var NVP_REQUEST_PARAMS = {
	USER:'USER',
	PWD:'PWD',
	SIGNATURE:'SIGNATURE',
	VERSION:'VERSION',
	METHOD:'METHOD',
	AMT:'AMT',
	PAYMENTACTION:'PAYMENTACTION',
	IPADDRESS:'IPADDRESS',
	CREDITCARDTYPE:'CREDITCARDTYPE',
	ACCT:'ACCT',
	EXPDATE:'EXPDATE',
	CVV2:'CVV2',
	FIRSTNAME:'FIRSTNAME',
	LASTNAME:'LASTNAME',
	STREET:'STREET',
	CITY:'CITY',
	STATE:'STATE',
	ZIP:'ZIP',
	COUNTRYCODE:'COUNTRYCODE'
};

/**
 * Names of all response parameters
 * @enum
 * @properties={typeid:35,uuid:"834A6298-45F0-4B97-B4F3-AD797DB9146E",variableType:-4}
 */
var NVP_RESPONSE_PARAMS = {
	TRANSACTIONID:'TRANSACTIONID',
	AMT:'AMT',
	AVSCODE:'AVSCODE',
	CVV2MATCH:'CVV2MATCH',
	PAYMENTADVICECODE:'PAYMENTADVICECODE',
	ACK:'ACK',
	L_ERRORCODE0:'L_ERRORCODE0',
	L_SHORTMESSAGE0:'L_SHORTMESSAGE0',
	L_LONGMESSAGE0:'L_LONGMESSAGE0'
};

/**
 * Internal callback function used to handle headless client callbacks and delegates to user callbacks
 * @type {Function}
 * @private 
 * @properties={typeid:35,uuid:"37C7A104-545E-4B5A-B47A-B973C2637182",variableType:-4}
 */
var callback;

/**
 * The PayPal API user name for a stateful session
 * @type {String}
 * @private 
 * @see initialize to set this value
 * @properties={typeid:35,uuid:"1E91C258-8986-4210-89A3-1B4DBA0AA8A9"}
 */
var user = '';

/**
 * The PayPal API user password for a stateful session
 * @type {String}
 * @private 
 * @see initialize to set this value
 * @properties={typeid:35,uuid:"6C1560D9-0640-4FE8-BE35-61A1C0BBA7CE"}
 */
var password = '';

/**
 * The PayPal API signature string for a stateful session
 * @type {String}
 * @private 
 * @see initialize to set this value
 * @properties={typeid:35,uuid:"66F4B260-5000-4C9C-8ADB-DC2054B0328F"}
 */
var signature = '';

/**
 * The PayPal URL endpoint for a stateful session
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"5432A2B3-9E11-4218-9A2F-74BEDD0F4750"}
 */
var nvpEndPoint = '';

/**
 * This class wraps the parameters for a PayPal NVP (Name/Value Pair) API request
 * All parameters can be set prior to calling the execute method, which returns a response object into an asynchronous callback method
 * @constructor 
 * @properties={typeid:24,uuid:"77AA328B-56DD-4A17-A4D9-C3539DA0F5B3"}
 */
function NVPRequest(){
	
	var params = {};

	/** @type {String} */
	this.user = '';
	/** @type {String} */
	this.password = '';
	/** @type {String} */
	this.signature = '';
	/** @type {String} */
	this.version = '';
	/** @type {String} */
	this.method = '';
	/** @type {Number} */
	this.amount = 0;
	/** @type {String} */
	this.paymentAction = '';
	/** @type {String} */
	this.ipAddress = '';
	/** @type {String} */
	this.creditCardType = '';
	/** @type {String} */
	this.account = '';
	/** @type {String} */
	this.expirationDate = '';
	/** @type {String} */
	this.cvv2 = '';
	/** @type {String} */
	this.firstName = '';
	/** @type {String} */
	this.lastName = '';
	/** @type {String} */
	this.street = '';
	/** @type {String} */
	this.city = '';
	/** @type {String} */
	this.state = '';
	/** @type {String} */
	this.zip = '';
	/** @type {String} */
	this.countryCode = '';

	Object.defineProperty(this,'user',{
		get:function(){return params[NVP_REQUEST_PARAMS.USER]},
		set:function(x){params[NVP_REQUEST_PARAMS.USER] = x}
	});
	Object.defineProperty(this,'password',{
		get:function(){return params[NVP_REQUEST_PARAMS.PWD]},
		set:function(x){params[NVP_REQUEST_PARAMS.PWD] = x}
	});
	Object.defineProperty(this,'signature',{
		get:function(){return params[NVP_REQUEST_PARAMS.SIGNATURE]},
		set:function(x){params[NVP_REQUEST_PARAMS.SIGNATURE] = x}
	});
	Object.defineProperty(this,'version',{
		get:function(){return params[NVP_REQUEST_PARAMS.VERSION]},
		set:function(x){params[NVP_REQUEST_PARAMS.VERSION] = x}
	});
	Object.defineProperty(this,'method',{
		get:function(){return params[NVP_REQUEST_PARAMS.METHOD]},
		set:function(x){params[NVP_REQUEST_PARAMS.METHOD] = x}
	});
	Object.defineProperty(this,'amount',{
		get:function(){return params[NVP_REQUEST_PARAMS.AMT]},
		set:function(x){params[NVP_REQUEST_PARAMS.AMT] = x}
	});
	Object.defineProperty(this,'paymentAction',{
		get:function(){return params[NVP_REQUEST_PARAMS.PAYMENTACTION]},
		set:function(x){params[NVP_REQUEST_PARAMS.PAYMENTACTION] = x}
	});
	Object.defineProperty(this,'ipAddress',{
		get:function(){return params[NVP_REQUEST_PARAMS.IPADDRESS]},
		set:function(x){params[NVP_REQUEST_PARAMS.IPADDRESS] = x}
	});
	Object.defineProperty(this,'creditCardType',{
		get:function(){return params[NVP_REQUEST_PARAMS.CREDITCARDTYPE]},
		set:function(x){params[NVP_REQUEST_PARAMS.CREDITCARDTYPE] = x}
	});
	Object.defineProperty(this,'account',{
		get:function(){return params[NVP_REQUEST_PARAMS.ACCT]},
		set:function(x){params[NVP_REQUEST_PARAMS.ACCT] = x}
	});
	Object.defineProperty(this,'expirationDate',{
		get:function(){return params[NVP_REQUEST_PARAMS.EXPDATE]},
		set:function(x){params[NVP_REQUEST_PARAMS.EXPDATE] = x}
	});
	Object.defineProperty(this,'cvv2',{
		get:function(){return params[NVP_REQUEST_PARAMS.CVV2]},
		set:function(x){params[NVP_REQUEST_PARAMS.CVV2] = x}
	});
	Object.defineProperty(this,'firstName',{
		get:function(){return params[NVP_REQUEST_PARAMS.FIRSTNAME]},
		set:function(x){params[NVP_REQUEST_PARAMS.FIRSTNAME] = x}
	});
	Object.defineProperty(this,'lastName',{
		get:function(){return params[NVP_REQUEST_PARAMS.LASTNAME]},
		set:function(x){params[NVP_REQUEST_PARAMS.LASTNAME] = x}
	});
	Object.defineProperty(this,'street',{
		get:function(){return params[NVP_REQUEST_PARAMS.STREET]},
		set:function(x){params[NVP_REQUEST_PARAMS.STREET] = x}
	});
	Object.defineProperty(this,'city',{
		get:function(){return params[NVP_REQUEST_PARAMS.CITY]},
		set:function(x){params[NVP_REQUEST_PARAMS.CITY] = x}
	});
	Object.defineProperty(this,'state',{
		get:function(){return params[NVP_REQUEST_PARAMS.STATE]},
		set:function(x){params[NVP_REQUEST_PARAMS.STATE] = x}
	});
	Object.defineProperty(this,'zip',{
		get:function(){return params[NVP_REQUEST_PARAMS.ZIP]},
		set:function(x){params[NVP_REQUEST_PARAMS.ZIP] = x}
	});
	Object.defineProperty(this,'countryCode',{
		get:function(){return params[NVP_REQUEST_PARAMS.COUNTRYCODE]},
		set:function(x){params[NVP_REQUEST_PARAMS.COUNTRYCODE] = x}
	});
	

	/**
	 * Executes the request for the specified target, with an optional callback handler for the response
	 * @param {String} target the target api/server for the request. One of the NVP_END_POINTS constants.
	 * @param {Function} [callbackMethod]
	 * @see NVP_END_POINTS
	 * @see NVPResponse
	 */
	this.execute = function(target, callbackMethod){
		callback = callbackMethod;
		getHeadlessClient().queueMethod(null,'scopes.modPayPal.dispatchNVPRemote',[nvpEndPoint,params],onDispatchResponse);
	}
}

/**
 * This class parses the parameters returned by a PayPal NVP request. If a request supplied a callback method, then a response object is passed into the handler when the server responds.
 * @constructor 
 * @param {String} responseBody The HTTP response body to be parsed
 * @see NVPRequest
 * @properties={typeid:24,uuid:"0227D9A9-BDCB-4728-8D15-078F92A8CD21"}
 */
function NVPResponse(responseBody){
	var params = {};
	var body = Packages.java.net.URLDecoder.decode(responseBody);
	var args = body.split('&');
	for(i in args){
		var param = args[i].split('=');
		params[param[0]] = param[1];
	}
	
	/**
	 * @type {String}
	 */
	this.transactionID = null;
	/**
	 * @type {Number}
	 */
	this.amount = null;
	/**
	 * @type {String}
	 */
	this.avsCode = null;
	/**
	 * @type {String}
	 */
	this.cvv2Match = null;
	/**
	 * @type {String}
	 */
	this.paymentAdviceCode = null;
	/**
	 * @type {String}
	 */
	this.ack = null;
	/**
	 * @type {String}
	 */
	this.errorCode = null;
	/**
	 * @type {String}
	 */
	this.shortErrorMessage = null;
	/**
	 * @type {String}
	 */
	this.longErrorMessage = null;
	
	Object.defineProperty(this,'transactionID',{
		get:function(){return params[NVP_RESPONSE_PARAMS.TRANSACTIONID]}
	});
	Object.defineProperty(this,'amount',{
		get:function(){return parseFloat(params[NVP_RESPONSE_PARAMS.AMT])}
	});
	Object.defineProperty(this,'avsCode',{
		get:function(){return params[NVP_RESPONSE_PARAMS.AVSCODE]}
	});
	Object.defineProperty(this,'cvv2Match',{
		get:function(){return params[NVP_RESPONSE_PARAMS.CVV2MATCH]}
	});
	Object.defineProperty(this,'paymentAdviceCode',{
		get:function(){return params[NVP_RESPONSE_PARAMS.PAYMENTADVICECODE]}
	});
	Object.defineProperty(this,'ack',{
		get:function(){return params[NVP_RESPONSE_PARAMS.ACK]}
	});
	Object.defineProperty(this,'errorCode',{
		get:function(){return params[NVP_RESPONSE_PARAMS.L_ERRORCODE0]}
	});
	Object.defineProperty(this,'shortErrorMessage',{
		get:function(){return params[NVP_RESPONSE_PARAMS.L_SHORTMESSAGE0]}
	});
	Object.defineProperty(this,'longErrorMessage',{
		get:function(){return params[NVP_RESPONSE_PARAMS.L_LONGMESSAGE0]}
	});
	this.toString = function(){
		return JSON.stringify(params);
	}
}

/**
 * A convenience method which executes a payment request using stateful information about the PayPal account holder
 * This is the intended method to process most payments
 * The asynchronous response is delegated to the callback parameter, into which a response object is passed
 * @see scopes.modPayPal.NVPResponse
 * 
 * @param {Function} callbackMethod The handler for the response object
 * @param {Number} amount The currency amount for the transaction
 * @param {String} firstName The card holder's First name
 * @param {String} lastName The card holder's Last name
 * @param {String} street The card holder's Street Address
 * @param {String} city The card holder's City
 * @param {String} state The card holder's State
 * @param {String} zip The card holder's Zip Code
 * @param {String} countryCode The card holder's Country Code
 * @param {String} creditCardType The credit card type
 * @see scopes.modPayPal CREDIT_CARD_TYPES
 * @param {String} account The Card Number
 * @param {Date|String} expirationDate The Expiration date, which can be a data object, or a string with the format MMyyyy
 * @param {String} [cvv2] The short security code for the card
 * 
 * @see initialize() to setup PayPal account information
 * @throws {scopes.svyExceptions.IllegalStateException} When the PayPal account information is not initialized
 * 
 * @properties={typeid:24,uuid:"124D8AC3-1DA4-4C4D-B378-93E903396AC8"}
 */
function doDirectPayment(callbackMethod,amount,firstName,lastName,street,city,state,zip,countryCode,creditCardType,account,expirationDate,cvv2){
	
	if(!user) throw new scopes.svyExceptions.IllegalStateException('Pay Pal Account User is not initialized');
	if(!password) throw new scopes.svyExceptions.IllegalStateException('Pay Pal Account Password is not initialized');
	if(!signature) throw new scopes.svyExceptions.IllegalStateException('Pay Pal Account Signature is not initialized');
	if(!nvpEndPoint) throw new scopes.svyExceptions.IllegalStateException('Pay Pal endpoint is not initialized');
	
	var requiredFields = {
		callbackMethod:'Callback Method',
		amount:'Amount',
		firstName:'First Name',
		lastName:'Last Name',
		street:'Street',
		city:'City',
		state:'State',
		zip:'Zip Code',
		countryCode:'Country Code',
		creditCardType:'Credit Card Type',
		account:'Card Number',
		expirationDate:'Expiration Date'
	};
	for(f in requiredFields){
		if(!eval(f)) throw new scopes.svyExceptions.IllegalArgumentException('Missing required input for: ' + requiredFields[f]);
	}
	
	var req = new scopes.modPayPal.NVPRequest();
	req.user = user;
	req.password = password;
	req.signature= signature;
	req.version = '56.0';	// TODO: Provide versioned support for APIs, perhaps in the initialization
	req.method = scopes.modPayPal.METHODS.DO_DIRECT_PAYMENT;
	var ipAddress = application.getIPAddress();
	//	Paypal is only supporting ipv4
	if(scopes.svyNet.getIPVersion(ipAddress) == scopes.svyNet.IPv4){
		req.ipAddress = application.getIPAddress();
	}
	req.paymentAction = scopes.modPayPal.PAYMENT_ACTIONS.SALE;	

	req.firstName = firstName;
	req.lastName = lastName;
	req.street = street;
	req.city = city;
	req.state = state;
	req.zip = zip;
	req.countryCode = countryCode;
	
	req.amount = amount;
	req.creditCardType = creditCardType;
	req.account = account;
	req.expirationDate = (expirationDate instanceof Date) ? utils.dateFormat(expirationDate,'MMyyyy') : expirationDate;
	req.cvv2 = cvv2;
	
	req.execute(nvpEndPoint,callbackMethod);
	
}

/**
 * Remote dispatch for all PayPal NVP requests. This is queued server-side to dispatch all requests via HTTP 
 * @param {String} url The target URL
 * @param {Object} params An object containing name-value pairs for request parameters
 * @return {String} responseBody The HTTP response body
 * @private 
 * @properties={typeid:24,uuid:"3E77D68E-4B87-4794-85BB-03CACC4E713C"}
 */
function dispatchNVPRemote(url, params){
	var req = plugins.http.createNewHttpClient().createPostRequest(url);
	for(p in params){
		req.addParameter(p,params[p]);
	}
	var res = req.executeRequest();
	var code = res.getStatusCode();
	var body = res.getResponseBody();
	if(code != plugins.http.HTTP_STATUS.SC_OK) throw new scopes.svyExceptions.HTTPException('Failed HTTP Request',null,null,code,body);
	return body;
}

/**
 * Create and/or get headless client instance used to queue requests
 * Uses the user name and password variables for the headless session
 * @private
 * @throws {scopes.svyExceptions.IllegalStateException} When the user cannot be logged into the solution
 * @see remoteUserName
 * @see remoteUserPassword
 * 
 * @return {plugins.headlessclient.JSClient}
 *
 * @properties={typeid:24,uuid:"794A4FAF-4165-4759-AA50-7AA2E842415C"}
 */
function getHeadlessClient(){
	var client = plugins.headlessclient.getClient(REMOTE_CLIENT_ID);
	if(!client){
		var uid = security.getUserUID(remoteUserName);
		if(!uid || !security.checkPassword(uid,remoteUserPassword) || security.getUserGroups(uid).getMaxRowIndex() < 1)
			throw new scopes.svyExceptions.IllegalStateException(
			'Failed to authenticate remote dispatch user "'+remoteUserName+'" for PayPal Remote Dispatch Client. '+
			'Ensure that the account exists and has correct credentials and is valid/belongs to a valid group.');
		client = plugins.headlessclient.getOrCreateClient(REMOTE_CLIENT_ID,SOLUTION_NAME,remoteUserName,remoteUserPassword,null);
		if(!client) throw new scopes.svyExceptions.IllegalStateException('Failed to create headless client for PayPal Remote Dispatch. Check the server log for details');
	}
	if(!client.isValid()) throw new scopes.svyExceptions.IllegalStateException('PayPal Remote Dispatch Client exists, but is not valid');	
	return client;
}

/**
 * The internal handler for the asynchronous HTTP response returned from the headless request
 * Delegates to the supplied callback method and supplies a new NVPReponse object
 * @param {JSEvent} event
 * @private
 * @see callback
 * @see NVPResponse
 * @properties={typeid:24,uuid:"8CA1CCDB-D96C-4852-890B-15B3560CB5DD"}
 */
function onDispatchResponse(event){
	if(!callback) return;
	if(!event.data) throw new scopes.svyExceptions.IllegalStateException('PayPal Response could not be processed. See server logs for root cause.');
	if(event.getType() != JSClient.CALLBACK_EVENT) throw new scopes.svyExceptions.IllegalStateException('PayPal request resulted in error condition: ' + event.data);
	callback.apply(this,[new NVPResponse(event.data)]);
}

/**
 * Initializes a stateful PayPal client session with the required account information.
 * This method must be called before issuing any requests. I should be called once and only once, preferably on solution startup
 * 
 * @param {String} apiUser The PayPal API uSer
 * @param {String} apiPassword The PayPal Password
 * @param {String} apiSignature The PayPal Signature
 * @param {String} apiEndPoint The target, use NVP_END_POINTS constants
 * @see NVP_END_POINTS
 *
 * @properties={typeid:24,uuid:"BCD08C32-2DBA-4496-ABC1-1C43931E849E"}
 */
function initialize(apiUser,apiPassword,apiSignature,apiEndPoint){
	if(!apiUser) throw new scopes.svyExceptions.IllegalArgumentException('Pay Pal Account User is required');
	if(!apiPassword) throw new scopes.svyExceptions.IllegalArgumentException('Pay Pal Account Password is required');
	if(!apiSignature) throw new scopes.svyExceptions.IllegalArgumentException('Pay Pal Account Signature is required');
	if(!apiEndPoint) throw new scopes.svyExceptions.IllegalArgumentException('Pay Pal endpoint is required');
	if(user || password || signature || nvpEndPoint) throw new scopes.svyExceptions.IllegalStateException('Session is already initialized');
	var validEndpoint = false;
	for(i in NVP_END_POINTS){
		if(NVP_END_POINTS[i] == apiEndPoint){
			validEndpoint = true;
			break;
		}
	}
	if(!validEndpoint) throw new scopes.svyExceptions.IllegalArgumentException('Invalid endpoint. Please use one of the constans provided through scopes.modPayPa.NVP_ENDPOINTS')
	user = apiUser;
	password = apiPassword;
	signature = apiSignature;
	nvpEndPoint = apiEndPoint;
}