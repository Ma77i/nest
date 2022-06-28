const addSpan = document.getElementById("addSpan")

async function fadeOut(el) {
  el.style.display = "none";
};

// ** FADE IN FUNCTION **
function fadeIn(elem) {
  console.log("FadeIn")
  return elem.style.display = "block";
};

/* async function badgeCarro(unidad) {

  $("#badgeCart").remove();
  if (unidad > 0) {
      $("#test").prepend(`<span id="badgeCart" class="badge badge-pill badge-danger">${unidad}</span>`);
  }
  
}; */


async function addToCart(cartId, productId) {
  
  fadeIn(addSpan)

  const res = await fetch(`/api/cart/${cartId}/products/${productId}`, { method: 'POST' })
  console.log("STATUS", res.status)
  console.log("Producto agregado con exito", res)
  if (res.status != 201) {
    return "error"
  }

  setTimeout(() => fadeOut(addSpan), 500);
    

    //await updateCartBadge()
}


const removeFromCart = async (cartId, productId) => {
  try {
    const res = await fetch(`/api/cart/${cartId}/products/${productId}`, { method: 'DELETE' })
    console.log("Producto borrado con exito", res)
    if (res.status != 200) {
      return "error"
    }
  
    //await updateCartBadge()
  
    const el = document.getElementById(productId)
    el.parentElement.removeChild(el)
  } catch (err) {
    console.log(err)
  }
}


const deleteAllOrders = async()=>{
  const res = await fetch(`/admin/orders`, { method: 'DELETE' })
  console.log("ordenes borradas")
  if (res.status != 200) {
    return "error"
  }
}

const sendOrder = (pedidoId) => {
  fetch(`/api/sms/${pedidoId}`, { method: 'POST' })
  .then(res => {
    if (res.status != 202) {
      return
    }

    const row = document.getElementById(pedidoId)

    const cell = row.children.item(3)
    cell.innerHTML = 'Si'
  })
}




