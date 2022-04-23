class ApiError extends Error{
    constructor(status,message){
        super();
        this.status = status
        this.message = message
    }

    static badRequest (message){
        return new ApiError (404, message)
    }


    static fordidden (message){
        return new ApiError (403, message)
    }

}

module.exports = ApiError