
// validation error middleware
export const handleAsyncError = (myErrorFuc) => (req, res, next) => {

    Promise.resolve(myErrorFuc(req,res,next)).catch(next)
}