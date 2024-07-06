document.addEventListener("DOMContentLoaded", () => {
  const removeButtons = document.querySelectorAll(".remove-from-cart-btn");
  const cartId = document.querySelector("h1[data-cart-id]").getAttribute("data-cart-id");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.closest(".product").getAttribute("data-product-id");

      try {
        const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        if (response.ok) {
          alert("Producto eliminado del carrito");
          location.reload(); // Recargar la página
        } else {
          alert("Hubo un problema al eliminar el producto del carrito");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al eliminar el producto del carrito");
      }
    });
  });
});
