document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-product-id");
      const cart = document.querySelector(".profile-btn[data-user-cart]").getAttribute("data-user-cart");

      try {
        const response = await fetch(`/api/carts/${cart}/product/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        if (response.ok) {
          alert("Se agregó al carrito");
        } else {
          alert("Hubo un problema al agregar al carrito");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al agregar al carrito");
      }
    });
  });
});
