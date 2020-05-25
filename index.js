const host = 'https://newsapi.org/v2'

const queryPoints = {
    country: "country",
    category: "category",
    query: "q",
    sources: "sources",
    pageSize: "pageSize",
    page: "page",
    language: "language",
    from: "from",
    to: "to",
    domains: "domains",
    excludeDomains: "excludeDomains",
    queryInTitle: "qInTitle",
    sortBy: "sortBy",
}

export class NewsAPI{
    constructor(API_KEY){
        if(!API_KEY)
            throw new Error("No API Key provided")
        this.apiKey = API_KEY
        this.queryString = host
    }
    topHeadlines = (...args) => {
        this.queryString = host+"/top-headlines?"
        this.queryString = makeQueryString(this.queryString, args[0])
        return getData(this.queryString, this.apiKey);
    }
    everything = (...args) => {
        this.queryString = host+"/everything?"
        this.queryString = makeQueryString(this.queryString, args[0])
        return getData(this.queryString, this.apiKey);
    }
    sources = (...args) => {
        this.queryString = host+"/sources?"
        this.queryString = makeQueryString(this.queryString, args[0])
        return getData(this.queryString, this.apiKey);
    }
}


class ApiError extends Error{
    constructor(err){
        super();
        this.name = `Error Occured with code : ${err.status}`
        this.message = err.statusText
    }
}

class HTTPError extends Error {}

const getData = async (initialQuery, API_KEY) => {
    let requestString = initialQuery + `&apiKey=${API_KEY}`
    let tester;
    let result = await fetch(requestString)
    if(!result.ok){
        throw new ApiError(result)
    }
    return result.json();
}

const makeQueryString = (initialQuery, pointsObject) => {
    let query = initialQuery
    for(let point in pointsObject) 
        query += `${queryPoints[point]}=${pointsObject[point]}&`;
    query = query.substring(0, query.length-1);
    return query;
}

var test = host + '/top-headlines?'

var testQuery = {
    country: 'in',
    query: "test"
}

// let testres = getData(makeQueryString(test, testQuery), "10fe6539e67344ff99a6d3b7b1dec530")
//             .then(data => console.log(data))

// console.log(testres)

export default NewsApi