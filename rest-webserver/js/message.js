(function() {
	'use strict';

	module.exports = function(datas, err) {
		if(err) {
			return {
				data : null,
				error : err
			};
		} else {
			return {
				data : datas,
				error : null
			};
		}
	};

})();