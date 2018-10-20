/**
 * Fetchs de order detail and appends to the page
 * ****************************
 * Please change 'json/statistics.json' 
 * with your service endpoint below
 * ****************************
 */

fetch('http://localhost:3000/api/create-orders')
    .then(response => {
        return response.json()
    })
    .then(allOrders => {

        const result = {
            popular_ingredients: ['pineapple', 'onions'],
            average_order_total: 18,
            most_valuable_customer: "Jhon Rambo"
        };
        const sortedCustomers = allOrders.sort(compare);

        let totalAverage = 0;
        allOrders.forEach(order => {
            console.log(order.total);
            totalAverage += order.total
        });

        result.most_valuable_customer = sortedCustomers[0].name;
        result.average_order_total = (totalAverage/sortedCustomers.length);

        // console.log('sorted Customers', sortedCustomers);

        let template = createStatisticsTemplate(result);
        $("#statistics").append(template);
    });

/**
 * Find the template tag and populate it with the data
 * @param statistics 
 */
function createStatisticsTemplate(statistics) {
    let template = $("#statistics-template")[0].innerHTML;
    return Mustache.render(template, statistics);
}


function compare(a,b) {
    if (a.total > b.total)
        return -1;
    if (a.total < b.total)
        return 1;
    return 0;
}
