$(document).ready(()=> {
    $('.add-to-cart').on('click',addToCart);
});

function addToCart() {
    let id = $(this).data('id');
    let quantity= $(`#sst${id}`) ? $(`#sst${id}`).val() : 1;
    $.ajax({
        url: '/cart',
        type: 'POST',
        data:{id, quantity},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity)
        }
    })
}

function updateCart(id, quantity) {
    if (quantity == 0) {
        removeCartitem(id) 
    } else {
        updateCartItem(id,quantity)
    }
}

function removeCartitem(id) {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: {id},
        success: function (result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html("$"+result.totalPrice);
            if (result.totalQuantity >0) {
                $(`#item${id}`).remove();
            } else {
                $('#body-cart').html('<div class="alert alert-info text-center">Your cart is empty</div>');
            }
        }
    })
}

function updateCartItem(id,quantity) {
    $.ajax({
        url: '/cart',
        type: 'PUT',
        data: {id,quantity},
        success: function (result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html("$"+result.totalPrice);
            $(`#price${id}`).html("$"+result.item.price);
        }})
}


function clearCart() {
    if (confirm("Do you really want to empty the cart")) {
    $.ajax({
        url: '/cart/all',
        type: 'DELETE',
        success: function () {
            $('#cart-badge').html(0);
            $('#body-cart').html('<div class="alert alert-info text-center">Your cart is empty</div>');
        }})
    }
}