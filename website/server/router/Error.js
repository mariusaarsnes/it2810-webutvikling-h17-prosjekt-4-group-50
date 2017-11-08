/**
 * Default function for displaying an error.
 * @param res
 * @param message
 */
module.exports = (res, message, statusCode) => {
    res.status(statusCode).json({ message: message });
};

/**
 * List of related HTTP codes
 * 200 - OK; if a get request was successful
 * 201 - Created; If a post request successfully created a new resource
 * 401 - Unauthorized; If the server refuses action
 * 500 - Internal server error; If the server encounters some error
 */