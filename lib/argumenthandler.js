module.exports = {
  check: function(args) {
  	require('./help')(args);
		require('./list')(args);
  }
}