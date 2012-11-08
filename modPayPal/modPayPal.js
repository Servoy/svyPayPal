/**
 * @type {String}
 * @private
 * @properties={typeid:35,uuid:"BDA6C2B4-362B-44CE-AA02-CACBCF97868A"}
 */
var SOLUTION_NAME = 'modPayPal';
/**
 * @type {String}
 * @properties={typeid:35,uuid:"7BDE6863-8786-454A-9A7C-0C051C933467"}
 */
var DEFAULT_REMOTE_USER_NAME = 'paypalRemoteDispatch';
/**
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"CE14A4BC-0721-483D-80BF-119DDE013B17"}
 */
var DEFAULT_REMOTE_USER_PASSWORD = 'servoy';
/**
 * @type {String}
 * @properties={typeid:35,uuid:"B9D3E003-4E8B-4F33-B43C-70C4A9A94D99"}
 */
var REMOTE_CLIENT_ID = '00000000-0000-0000-0000-REMOTEPAYPAL';

/**
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"140D5059-67DA-4999-A765-2E08ECA532CA"}
 */
var remoteUserName = DEFAULT_REMOTE_USER_NAME = DEFAULT_REMOTE_USER_NAME;

/**
 * @type {String}
 * @private 
 * @properties={typeid:35,uuid:"BCD5E249-3418-4667-ABBE-6E6FC9F48A15"}
 */
var remoteUserPassword = DEFAULT_REMOTE_USER_PASSWORD = DEFAULT_REMOTE_USER_PASSWORD;
/**
 * @type {Object}
 * @properties={typeid:35,uuid:"1F4583D6-B57C-405B-B60E-6E20D831F555",variableType:-4}
 */
var METHODS = {
	DO_DIRECT_PAYMENT:'DoDirectPayment'
};
/**
 * @type {Object}
 * @properties={typeid:35,uuid:"5D441665-35ED-4CBB-B7DF-774A8663F00E",variableType:-4}
 */
var PAYMENT_ACTIONS = {
	AUTHORIZATION:'Authorization',
	SALE:'Sale'
};

/**
 * @properties={typeid:35,uuid:"009920EE-F46F-4F83-88F1-2725CB987809",variableType:-4}
 */
var REFUND_FMF_DETAILS = {
	YES:1,
	NO:0
};

/**
 * @type {Object}
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
 * @properties={typeid:35,uuid:"14499C91-D517-4AF0-A8D6-2AB85B446B98",variableType:-4}
 */
var ACK_CODES = {
	SUCCESS:'SUCCESS',
	FAILURE:'FAILURE'
};
/**
 * @type {Object}
 * @properties={typeid:35,uuid:"C56505E6-BD32-4A83-8EC6-9508D33F91A7",variableType:-4}
 */
var NVP_END_POINTS = {
	SANDBOX_SIGNATURES:'https://api-3t.sandbox.paypal.com/nvp',
	SANDBOX_CERTIFICATES:'https://api.sandbox.paypal.com/nvp',
	PRODUCTION_SIGNATURES:'https://api-3t.paypal.com/nvp',
	PRODUCTION_CERTIFICATES:'https://api.paypal.com/nvp'
};
/**
 * @type {Object}
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
 * @type {Function}
 * @private 
 * @properties={typeid:35,uuid:"37C7A104-545E-4B5A-B47A-B973C2637182",variableType:-4}
 */
var callback;

/**
 * @constructor 
 * @properties={typeid:24,uuid:"77AA328B-56DD-4A17-A4D9-C3539DA0F5B3"}
 */
function NVPRequest(){
	
	var params = {};

	this.user = '';
	this.password = '';
	this.signature = '';
	this.version = '';
	this.method = '';
	this.amount = 0;
	this.paymentAction = '';
	this.ipAddress = '';
	this.creditCardType = '';
	this.account = '';
	this.expirationDate = '';
	this.cvv2 = '';
	this.firstName = '';
	this.lastName = '';
	this.street = '';
	this.city = '';
	this.state = '';
	this.zip = '';
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
	 * Sets a request parameter. Use one of the NVP_REQUEST_PARAMS constants
	 * @param {String} name
	 * @param {Object} value
	 */
	this.setParameter = function(name,value){
		if(!name) throw scopes.svyExceptions.IllegalArgumentException('Please specify a name',null,null);
		params[name] = value;
	}
	/**
	 * Returns the value of a request parameter. Use one of the NVP_REQUEST_PARAMS constants
	 * @param {String} name
	 * @return {Object}
	 */
	this.getParameter = function(name){
		if(!name) throw scopes.svyExceptions.IllegalArgumentException('Please specify a name',null,null);
		return params[name];
	}
	/**
	 * @param {String} nvpEndPoint the target api/server for the request. One of the NVP_END_POINTS constants.
	 * @param {Function} [callbackMethod]
	 */
	this.execute = function(nvpEndPoint, callbackMethod){
		callback = callbackMethod;
		getHeadlessClient().queueMethod(null,'scopes.modPayPal.dispatchNVPRemote',[nvpEndPoint,params],onDispatchResponse);
	}
}

/**
 * @param {String} responseBody
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
	
	this.transactionID = '';
	this.amount = 0;
	this.avsCode = '';
	this.cvv2Match = '';
	this.paymentAdviceCode = '';
	this.ack = '';
	this.errorCode = '';
	this.shortErrorMessage = '';
	this.longErrorCode = '';
	
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
	Object.defineProperty(this,'longErrorCode',{
		get:function(){return params[NVP_RESPONSE_PARAMS.L_LONGMESSAGE0]}
	});
	this.toString = function(){
		return JSON.stringify(params);
	}
}

/**
 * Remote dispatch for all PayPal NVP requests 
 * @param {String} url
 * @param {Object} params
 * @return {String} responseBody
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
 * @private
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
			'Ensure that the account exists and has correct credentials and is valid/belongs to a valid group. '+
			'The remote dispatch user can be configured using scopes.modPayPal.setRemoteDispatchUser()');
		client = plugins.headlessclient.getOrCreateClient(REMOTE_CLIENT_ID,SOLUTION_NAME,remoteUserName,remoteUserPassword,null);
		if(!client) throw new scopes.svyExceptions.IllegalStateException('Failed to create headless client for PayPal Remote Dispatch. Check the server log for details');
	}
	if(!client.isValid()) throw new scopes.svyExceptions.IllegalStateException('PayPal Remote Dispatch Client exists, but is not valid');	
	return client;
}

/**
 * @param {JSEvent} event
 * @private
 * @properties={typeid:24,uuid:"8CA1CCDB-D96C-4852-890B-15B3560CB5DD"}
 */
function onDispatchResponse(event){
	if(!callback) return;
	if(!event.data) throw new scopes.svyExceptions.IllegalStateException('PayPal Response could not be processed. See server logs for root cause.');
	if(event.getType() != JSClient.CALLBACK_EVENT) throw new scopes.svyExceptions.IllegalStateException('PayPal request resulted in error condition: ' + event.data);
	callback.apply(this,[new NVPResponse(event.data)]);
}

/**
 * @param {String} userName
 * @param {String} password
 * @properties={typeid:24,uuid:"854E1695-D7EF-4447-8335-409B949C5137"}
 */
function setRemoteDispatchUser(userName,password){
	var client = plugins.headlessclient.getClient(REMOTE_CLIENT_ID);
	if(client) throw new scopes.svyExceptions.IllegalStateException('The remote client (Client ID:'+REMOTE_CLIENT_ID+') is already started. Shutdown the client first and try again');
}