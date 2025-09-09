export const servicePackages = {
  youtubeAdvertising: [
    { name: '25,000 Views', price: 500, views: '25,000' },
    { name: '50,000 Views', price: 900, views: '50,000' },
    { name: '100,000 Views', price: 1600, views: '100,000' },
    { name: '250,000 Views', price: 3500, views: '250,000' },
    { name: '500,000 Views', price: 6000, views: '500,000' }
  ],
  spotifyPlaylisting: [
    { name: '10,000 Streams', price: 200, streams: '10,000' },
    { name: '20,000 Streams', price: 350, streams: '20,000' },
    { name: '30,000 Streams', price: 500, streams: '30,000' },
    { name: '40,000 Streams', price: 650, streams: '40,000' },
    { name: '50,000 Streams', price: 850, streams: '50,000' }
  ],
  soundcloudReposts: [
    { name: '10M Reach', price: 400, reach: '10M', plays: '~25K' },
    { name: '20M Reach', price: 700, reach: '20M', plays: '~45K' },
    { name: '30M Reach', price: 950, reach: '30M', plays: '~60K' },
    { name: '40M Reach', price: 1175, reach: '40M', plays: '~75K' },
    { name: '50M Reach', price: 1400, reach: '50M', plays: '~90K' }
  ],
  instagramSeeding: [
    { name: '50 Posts', price: 750, posts: '50', reach: '500K' },
    { name: '100 Posts', price: 1400, posts: '100', reach: '1M' },
    { name: '200 Posts', price: 2500, posts: '200', reach: '2M' },
    { name: '300 Posts', price: 3500, posts: '300', reach: '3M' },
    { name: '500 Posts', price: 5000, posts: '500', reach: '5M' }
  ],
  metaTiktokAds: [
    { name: '25,000 Views', price: 400, views: '25,000' },
    { name: '50,000 Views', price: 700, views: '50,000' },
    { name: '100,000 Views', price: 1200, views: '100,000' },
    { name: '250,000 Views', price: 2500, views: '250,000' },
    { name: '500,000 Views', price: 4500, views: '500,000' }
  ]
};

// Commission rates (percentage of package price)
export const commissionRates = {
  youtubeAdvertising: 20,
  spotifyPlaylisting: 19.8,
  soundcloudReposts: 19.4,
  instagramSeeding: 20,
  metaTiktokAds: 20
};

// Multi-service discounts
export const multiServiceDiscounts = {
  2: 1, // 1% for 2 services
  3: 2, // 2% for 3 services
  4: 3, // 3% for 4 services
  5: 5  // 5% for all services
};