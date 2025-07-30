
// Searching, filtering, pagination

class ApiFunctionality {
    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                // Example: { name: { $regex: "tv", $options: "i" } }
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};

        // Apply keyword-based search to the Mongoose query
        // Example final query: Product.find({ name: { $regex: "tv", $options: "i" } })
        this.query = this.query.find({ ...keyword });

        return this;
    }

    // filtering the category 
    filter() {
        const queryCopy = { ...this.queryStr }
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key => delete queryCopy[key])
        this.query = this.query.find(queryCopy)
        return this

    }

    // Pagination result per page
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this
    }
}

export default ApiFunctionality