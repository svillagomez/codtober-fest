/**
 * Set the id to query the order
 */

/**
 * Fetchs de order detail and appends to the page.
 * 
 * ****************************
 * Please change '/json/order.json?id=${id}' 
 * with your service endpoint below
 * ****************************
 */

(function(){
    let urlParams = new URLSearchParams(window.location.search);
    let customerId = urlParams.get('id');
    fetch(`http://localhost:3000/api/create-orders/${customerId}`)
        .then(response => response.json())
        .then(order => {
            let template = createRowTemplate(order);
            $("#order").append(template);
        });
})();

/**
 * Find the template tag and populate it with the data
 * @param order
 */
function createRowTemplate(order) {
    let template = $("#order-template")[0].innerHTML;
    return Mustache.render(template, order);
}
