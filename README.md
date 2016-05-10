svyPayPal
=========

PayPal API for Servoy clients


Getting started
-------------
To use the svyPayPal module download the [svyPayPal.zip](https://github.com/Servoy/svyPayPal/releases) file extract the .servoy file and import it into your workspace. 
To use the PayPal API add the svyPayPal module to the active solution

```javascript
// initialize PayPal on solution open
scopes.svyPayPal.initialize('userName', 'pwd12345', 'BQhnKD8Ow1.uGL-UiNuai9sL-.OvFqc6j-LGOSm0h7LBdt8z56W4VPrs', scopes.svyPayPal.NVP_END_POINTS.SANDBOX_SIGNATURES);
// do a payment
scopes.svyPayPal.doDirectPayment(onPaymentCallback, 10.0, 'firstName', 'lastName', 'street', 'city', 'state', 'zip', 'countryCode', scopes.svyPayPal.CREDIT_CARD_TYPES.VISA, '781279813891', '122014', '111');
```

To use the latest source code clone the git repository and checkout the develop branch. Install the [egit](http://www.eclipse.org/egit/download/) plugin for Eclipse to clone the repository and import the projects into the workspace


Documentation
-------------
See the [Wiki](https://github.com/Servoy/svyPayPal/wiki) for the available documentation


Feature Requests & Bugs
-----------------------
Found a bug or would like to see a new feature implemented? Raise an issue in the [Issue Tracker](https://github.com/Servoy/svyPayPal/issues)


Contributing
-------------
Eager to fix a bug or introduce a new feature? Clone the repository and issue a pull request


License
-------
svyPayPal is licensed under MIT
