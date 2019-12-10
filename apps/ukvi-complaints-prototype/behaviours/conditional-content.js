module.exports = superclass => class extends superclass {

	locals (req, res, next) {
		res.locals.isBehaviourIssue = req.form.values.reason === 'staff-behaviour';
		res.locals.isRefundIssue = req.form.values.reason === 'refund';
		super.locals(req, res, next);
	}

};
