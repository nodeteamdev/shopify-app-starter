const fetchRecommendations = async (sortType = 'BEST_SELLERS') => {
  try {
    const urlParams = new URLSearchParams({
      limit: 5,
      sortType,
    });
    const shop = window.location.host;
    const host = window.MY_APP.hostName;
    const url = `https://${host}/api/v1/product/${shop}/products/recommendations?${urlParams}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const updateCarousel = async (sortType) => {
  const data = await fetchRecommendations(sortType);
  const products = data?.products || [];

  const carouselContainer = document.getElementById('carousel-container');

  if (carouselContainer) {
    carouselContainer.innerHTML = '';

    products.forEach(product => {
      const newDiv = document.createElement('div');
      newDiv.style.border = 'none';
      newDiv.style.borderRadius = '10px';
      newDiv.style.padding = '10px';
      newDiv.style.backgroundColor = '#f9f9f9';
      newDiv.style.textAlign = 'center';
      newDiv.style.width = '150px';
      newDiv.style.flexShrink = '0';

      const productTitle = document.createElement('h2');
      productTitle.textContent = product.title;
      productTitle.style.color = '#333';
      productTitle.style.fontWeight = 'bold';
      productTitle.style.fontSize = '12px';
      productTitle.style.margin = '10px 0';

      const productPrice = document.createElement('p');
      productPrice.textContent = `${product.priceRangeV2.minVariantPrice.amount} ${product.priceRangeV2.minVariantPrice.currencyCode}`;
      productPrice.style.color = '#333';
      productPrice.style.fontSize = '14px';
      productPrice.style.margin = '5px 0';

      const productLink = document.createElement('a');
      const slug = createSlug(product.title);
      productLink.href = `/products/${slug}`;
      productLink.style.display = 'block';
      productLink.style.textDecoration = 'none';

      const productImage = document.createElement('img');
      productImage.src = product.featuredImage.url;
      productImage.alt = product.featuredImage.altText;
      productImage.style.maxWidth = '80px';
      productImage.style.borderRadius = '10px';

      productLink.appendChild(productImage);

      newDiv.appendChild(productLink);
      newDiv.appendChild(productTitle);
      newDiv.appendChild(productPrice);

      carouselContainer.appendChild(newDiv);
    });
  } else {
    console.warn('Carousel container not found.');
  }
};

const initializeSection = () => {
  const main = document.getElementById('MainContent');

  if (main) {
    const section = document.createElement('section');
    section.id = 'recommendation-carousel-section';
    section.style.textAlign = 'center';
    section.style.padding = '36px 0';
    section.style.position = 'relative';

    const recommendationTitle = document.createElement('h2');
    recommendationTitle.textContent = 'Recommendations';
    recommendationTitle.style.fontSize = '40px';
    recommendationTitle.style.margin = '20px 0';
    recommendationTitle.style.textAlign = 'left';
    recommendationTitle.style.padding = '0 36px';

    const toggleContainer = document.createElement('div');
    toggleContainer.style.marginBottom = '25px';

    const bestSellersBtn = document.createElement('button');
    bestSellersBtn.textContent = 'Best Sellers';
    bestSellersBtn.style.marginRight = '10px';
    bestSellersBtn.style.padding = '8px 16px';
    bestSellersBtn.style.cursor = 'pointer';
    bestSellersBtn.style.border = '1px solid #333';
    bestSellersBtn.style.backgroundColor = '#333';
    bestSellersBtn.style.color = '#fff';

    const hotBtn = document.createElement('button');
    hotBtn.textContent = 'Hot';
    hotBtn.style.padding = '8px 16px';
    hotBtn.style.cursor = 'pointer';
    hotBtn.style.border = '1px solid #333';
    hotBtn.style.backgroundColor = '#fff';
    hotBtn.style.color = '#333';

    toggleContainer.appendChild(bestSellersBtn);
    toggleContainer.appendChild(hotBtn);

    section.appendChild(recommendationTitle);
    section.appendChild(toggleContainer);

    const carouselContainer = document.createElement('div');
    carouselContainer.id = 'carousel-container';
    carouselContainer.style.display = 'flex';
    carouselContainer.style.overflowX = 'scroll';
    carouselContainer.style.gap = '15px';
    carouselContainer.style.scrollBehavior = 'smooth';
    carouselContainer.style.justifyContent = 'center';
    carouselContainer.style.margin = '0 auto';

    section.appendChild(carouselContainer);

    const firstSection = main.querySelector('section');
    if (firstSection) {
      main.insertBefore(section, firstSection.nextSibling);
    } else {
      main.appendChild(section);
    }

    bestSellersBtn.addEventListener('click', () => {
      bestSellersBtn.style.backgroundColor = '#333';
      bestSellersBtn.style.color = '#fff';
      hotBtn.style.backgroundColor = '#fff';
      hotBtn.style.color = '#333';
      updateCarousel('BEST_SELLERS');
    });

    hotBtn.addEventListener('click', () => {
      hotBtn.style.backgroundColor = '#333';
      hotBtn.style.color = '#fff';
      bestSellersBtn.style.backgroundColor = '#fff';
      bestSellersBtn.style.color = '#333';
      updateCarousel('HOT');
    });

    updateCarousel('BEST_SELLERS');
  } else {
    console.warn('Main element not found.');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSection);
} else {
  initializeSection();
};
