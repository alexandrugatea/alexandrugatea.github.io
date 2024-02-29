const portfolioContainer = document.getElementById('gallery');

function renderPortfolio(category) {
  category.forEach(item => {

    const classes = Array.isArray(item.type) ? item.type : item.type.split(' ');

    const div = document.createElement('div');
    div.setAttribute('data-lg-size', item['size']);
    div.setAttribute('data-src', item['src']);
    div.setAttribute('data-sub-html', "#" + item['caption']);
    div.classList.add('gallery-item', 'kursor-hover', 'zoom', item['category']);

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectImageDiv = document.createElement('div');
    projectImageDiv.classList.add('project-image');

    const img = document.createElement('img');
    img.setAttribute('src', item['src']);
    img.setAttribute('alt', '');
    classes.forEach(className => {
      img.classList.add(className);
    });
    const projectTextDiv = document.createElement('div');
    projectTextDiv.classList.add('project-text');
    projectTextDiv.innerHTML = item['project-text'];

    projectImageDiv.appendChild(img);
    projectDiv.appendChild(projectImageDiv);
    div.appendChild(projectDiv);
    div.appendChild(projectTextDiv);

    portfolioContainer.appendChild(div);
  });
}

function renderIframes(category) {

  category.forEach(item => {

    const classes = Array.isArray(item.type) ? item.type : item.type.split(' ');

    const div = document.createElement('div');
    div.setAttribute('data-lg-size', item['size']);
    div.setAttribute('data-src', item['src']);
    div.setAttribute('data-sub-html', "#" + item['caption']);
    if (item['iframe']) {
      div.setAttribute('data-iframe', item['iframe']);
    }
    div.classList.add('gallery-item', 'kursor-hover', 'zoom', item['category']);

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectImageDiv = document.createElement('div');
    projectImageDiv.classList.add('project-image');

    const img = document.createElement('img');
    img.setAttribute('src', item['thumb']);
    img.setAttribute('alt', '');
    classes.forEach(className => {
      img.classList.add(className);
    });
    const projectTextDiv = document.createElement('div');
    projectTextDiv.classList.add('project-text');
    projectTextDiv.innerHTML = item['project-text'];

    projectImageDiv.appendChild(img);
    projectDiv.appendChild(projectImageDiv);
    div.appendChild(projectDiv);
    div.appendChild(projectTextDiv);

    portfolioContainer.appendChild(div);
  });
}

function renderCaptions(category) {
  const captionContainer = document.getElementById('captions');
  category.forEach(item => {
    const div = document.createElement('div');
      div.setAttribute('id', item['caption']);
      div.innerHTML = item['project-text'];
  
      captionContainer.appendChild(div);
  })

}

const webData = [
  {
    'category': 'category-web',
    'size': '1917-913',
    'caption': 'webTelenavNew',
    'src': 'images/24/portfolio/webs/tnv_new.png',
    'project-text': "Telenav's website [US]",
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1904-905',
    'caption': 'webTelenavOld',
    'src': 'images/24/portfolio/webs/tnv_old.png',
    'project-text': 'Previous Telenav Website [US]',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1901-910',
    'caption': 'webSynpheon',
    'src': 'images/24/portfolio/webs/synpheon.png',
    'project-text': 'Synpheon [DE]',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1902-909',
    'caption': 'webDakar',
    'src': 'images/24/portfolio/webs/dakar.png',
    'project-text': 'AutoDakar [RO]',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-4800',
    'caption': 'webLandingpage',
    'src': 'images/24/portfolio/webs/Landingpage.png',
    'project-text': 'LandingPage idea for portfolio',
    'type': ['web', 'portrait']
  }
];

const codePenData = [
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenSVGJS',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/MWxxmyr?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenBlobs',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/XWGGRNB?default-tab=result&theme-id=darkk',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenTransparentMenu',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/mdoommJ?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenResponsiveTable',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/bGZZWzo?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenFloatingButtons',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/OJqqmYg?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenAnimatedMenuInOut',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/NWJJgGM?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenTriangleCarousel',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/poYYwWY?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'caption': 'webCodePenCSSSkeleton',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/PoLLKZX?default-tab=result&theme-id=dark',
    'project-text': 'Project 1',
    'type': ['web', 'landscape']
  },
]
const mapsData = [
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'caption': 'mapArt',
    'src': 'images/24/portfolio/maps/port_maps_3d_art.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'caption': 'mapPaper',
    'src': 'images/24/portfolio/maps/port_maps_3d_paper.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1080-1080',
    'caption': 'mapBlender',
    'src': 'images/24/portfolio/maps/port_maps_blender.png',
    'project-text': 'Project 1',
    'type': ['map', 'square']
  },
  {
    'category': 'category-maps',
    'size': '1520-1080',
    'caption': 'mapRenderSun',
    'src': 'images/24/portfolio/maps/port_maps_day.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1520-1080',
    'caption': 'mapRenderMoon',
    'src': 'images/24/portfolio/maps/port_maps_night.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1792-1080',
    'caption': 'mapGradients',
    'src': 'images/24/portfolio/maps/port_maps_gradient.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'caption': 'mapStyle1',
    'src': 'images/24/portfolio/maps/port_maps_detroit1.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'caption': 'mapStyle2',
    'src': 'images/24/portfolio/maps/port_maps_detroit2.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'caption': 'mapStyle3',
    'src': 'images/24/portfolio/maps/port_maps_detroit3.png',
    'project-text': 'Project 1',
    'type': ['map', 'landscape']
  },
];
const brandData = [
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'caption': 'logoAtleticMed',
      'src': 'images/24/portfolio/brand/port_logo_atletic.png',
      'project-text': 'Project 1',
      'type': ['logo', 'landscape']
    },
    {
      'category': 'category-brand',
      'size': '1196-1080',
      'caption': 'logoCityScroller',
      'src': 'images/24/portfolio/brand/port_logo_city.png',
      'project-text': 'Project 1',
      'type': ['logo', 'landscape']
    },
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'caption': 'logoCoop',
      'src': 'images/24/portfolio/brand/port_logo_coop.png',
      'project-text': 'Project 1',
      'type': ['logo', 'square']
    },
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'caption': 'logoFlower',
      'src': 'images/24/portfolio/brand/port_logo_flower.png',
      'project-text': 'Project 1',
      'type': ['logo', 'landscape']
    },
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'caption': 'logoGames',
      'src': 'images/24/portfolio/brand/port_logo_games.png',
      'project-text': 'Project 1',
      'type': ['logo', 'landscape']
    },
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'caption': 'logoKeytana',
      'src': 'images/24/portfolio/brand/port_logo_keytana.png',
      'project-text': 'Project 1',
      'type': ['logo', 'landscape']
    },
  
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'caption': 'logoOM',
      'src': 'images/24/portfolio/brand/port_logo_oman.png',
      'project-text': 'Project 1',
      'type': ['logo', 'square']
    },
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'caption': 'logoRecord',
      'src': 'images/24/portfolio/brand/port_logo_reco.png',
      'project-text': 'Project 1',
      'type': ['logo', 'square']
    },
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'caption': 'logoWanted',
      'src': 'images/24/portfolio/brand/port_logo_wanted.png',
      'project-text': 'Project 1',
      'type': ['logo', 'square']
    },
    // Add more portfolio items as needed
  ];

// Call the function with your portfolio data
renderPortfolio(webData);
renderIframes(codePenData);
renderPortfolio(mapsData);
renderPortfolio(brandData);

renderCaptions(webData);
renderCaptions(codePenData);
renderCaptions(mapsData);
renderCaptions(brandData);
