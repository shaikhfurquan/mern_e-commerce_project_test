
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

}

export default ApiFunctionality