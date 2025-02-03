function hideProductModal() {
  const productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach((modal) => modal.hide());
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  const blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;

  const parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();

  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft,
    });
  }, 200);
});

document.addEventListener('shopify:block:deselect', function (event) {
  const blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  const parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});

document.addEventListener('shopify:section:load', () => {
  hideProductModal();
  const zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;
  if (zoomOnHoverScript) {
    const newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});

document.addEventListener('shopify:section:unload', (event) => {
  document.querySelectorAll(`[data-section="${event.detail.sectionId}"]`).forEach((element) => {
    element.remove();
    document.body.classList.remove('overflow-hidden');
  });
});

document.addEventListener('shopify:section:reorder', () => hideProductModal());

document.addEventListener('shopify:section:select', () => hideProductModal());

document.addEventListener('shopify:section:deselect', () => hideProductModal());

document.addEventListener('shopify:inspector:activate', () => hideProductModal());

document.addEventListener('shopify:inspector:deactivate', () => hideProductModal());











document.addEventListener('DOMContentLoaded', function () {
  const bundlePriceDisplay = document.getElementById('bundle-price');
  const addBundleButton = document.getElementById('add-bundle-to-cart');
  const puddingQuantities = document.querySelectorAll('.pudding-quantity');

  const bundlePrice = 48; // Fixed price for the bundle
  const bundleSize = 5;   // Number of items required in the bundle

  addBundleButton.addEventListener('click', function () {
    let selectedProducts = [];
    let totalQuantity = 0;

    puddingQuantities.forEach(input => {
      const quantity = parseInt(input.value) || 0;
      if (quantity > 0) {
        selectedProducts.push({
          id: input.dataset.productId,
          quantity: quantity
        });
        totalQuantity += quantity;
      }
    });

    if (totalQuantity === bundleSize) {
      selectedProducts.forEach(product => {
        fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: product.id,
            quantity: product.quantity
          })
        });
      });

      alert('Bundle added to cart!');
      location.reload();
    } else {
      alert(`Please select exactly ${bundleSize} items.`);
    }
  });

  puddingQuantities.forEach(input => {
    input.addEventListener('change', function () {
      let totalQuantity = 0;

      puddingQuantities.forEach(input => {
        totalQuantity += parseInt(input.value) || 0;
      });

      if (totalQuantity > bundleSize) {
        alert(`You can only select up to ${bundleSize} items.`);
        input.value = '';
      }

      bundlePriceDisplay.textContent = `Total: $${bundlePrice}`;
    });
  });
});









