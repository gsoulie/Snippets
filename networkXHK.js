/**
 * Generic HTTP request function to create on lib like network.js
 */

/**
 * Standard HTTP Request
 *
 * @param {Object} _params Paramètres
 * @param {integer} _params.timeout Timeout request
 * @param {string} _params.type GET/POST
 * @param {string} _params.format Format (json, xml, bin, etc).
 * @param {blob} _params.data The data to pass
 * @param {string} _params.url The url source to call
 * @param {function} _params.failure Callback function if error
 * @param {function} _params.success Callback function if success
 * @param {object} _params.passthrough Any passthrough params
 * @param {array} _params.headers Array of request headers
 * @return {object} _data
 */
exports.request = function(_params) {
        if(Ti.Network.online) {
                // Setup the xhr object
                var xhr = Ti.Network.createHTTPClient();

                // Set the timeout or a default if one is not provided
                xhr.timeout = _params.timeout ? _params.timeout : 10000;

                // Clear cookie
                /*if(_params.clearCookies) {
                        xhr.clearCookies(_params.clearCookies);
                }*/

                // For mobile web CORs
                if(Ti.Platform.osname === "mobileweb") {
                        xhr.withCredentials = true;
                }

                /**
                 * When XHR request is loaded
                 */
                xhr.onload = function(_data) {
                        if(_data) {
                                switch(_params.format) {
                                        case "json":
                                                _data = JSON.parse(this.responseText);
                                        break;
                                        case "xml":
                                                _data = this.responseXML.documentElement;
                                        break;
                                        case "bin":
                                                _data = this.responseData;
                                        break;
                                        default:
                                                _data = this.responseText;
                                        break;
                                };
                                if(xhr.getResponseHeaders) {
                                        var headers = xhr.getResponseHeaders();
                                }

                                if(_params.success) {
                                        if(_params.passthrough) {
                                                _params.success(_data, headers, _params.passthrough);
                                        } else {
                                                _params.success(_data, headers);
                                        }
                                } else {
                                        return _data;
                                }
                        }
                };

                if(_params.ondatastream) {
                        xhr.ondatastream = function(_event) {
                                if(_params.ondatastream) {
                                        _params.ondatastream(_event.progress);
                                }
                        };
                }

                /**
                 * Error handling
                 * @param {Object} _event The callback object
                 */
                xhr.onerror = function(_event) {
                        if(_params.failure) {
                                _params.failure(this.responseText);
                        } else {
                                Ti.API.error(JSON.stringify(this));
                                alert('Internet connection timed out');
                        }
                };

                // Open the remote connection
                _params.type = _params.type ? _params.type : "GET";
                _params.async = _params.async ? _params.async : true;

                xhr.open(_params.type, _params.url, _params.async);

                if(_params.headers) {
                        for(var i = 0, j = _params.headers.length; i < j; i++) {
                                Ti.API.info('[---http---] ' + _params.headers[i].name + ": " + _params.headers[i].value);
                                xhr.setRequestHeader(_params.headers[i].name, _params.headers[i].value);
                        }
                }

                if(_params.data) {
                        // send the data
                        xhr.send(_params.data);
                } else {
                        xhr.send();
                }
        } else {
                Ti.API.info("No network available");
                alert('No network available');
        }
};
