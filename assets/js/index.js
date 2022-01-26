$("#add_product").submit(function (event) {
    alert("Data Inserted Successfully!");
})

$("#update_product").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })



    var request = {
        "url": `http://localhost:3000/api/products/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
    })
})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/products/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
    // Sell fuction
    async function doAjax(url, params, method) {
        return $.ajax( {
          url: url,
          type: method || 'POST',
          dataType: 'json',
          data: params
        });
    }
    $onsell = $(".table tbody td a.sell");
    $onsell.click(async function () {
        var id = $(this).attr("data-id")
        var productdata = {};
        var salesdata = {};
        try{
            productdata = await doAjax(`http://localhost:3000/api/products?id=${id}`,{},"GET");
            salesdata = await doAjax(`http://localhost:3000/api/sales?id=61f040fa19ce5cfd39fcbb29`,{},"GET")
        }catch{}
        productdata.quantity = productdata.quantity - 1;
        salesdata.totalSales = salesdata.totalSales+productdata.price;

        try{
            await doAjax(`http://localhost:3000/api/products/${id}`,productdata,"PUT");
            await doAjax(`http://localhost:3000/api/sales/61f040fa19ce5cfd39fcbb29`,salesdata,"PUT");
            alert("Product Sold Successfully!");
            location.reload();
        }catch{}

    





    })
}