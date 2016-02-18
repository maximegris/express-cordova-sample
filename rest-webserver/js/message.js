(function() {
	'use strict';

    /**
    * AFormat http response message.
    * @param {Object} The data block
    * @param {Object} The error block
    */
	var message = function(datas, err) {
		// If there is an error, we return it
		if(err) {
			return {
				data : null,
				error : err
			};
		} else {
			// Else we return the datas
			return {
				data : datas,
				error : null
			};
		}
	};

	module.exports = message;

})();