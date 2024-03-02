const portfolioContainer = document.getElementById('gallery');

function renderPortfolio(category) {
  category.forEach(item => {

    const classes = Array.isArray(item.type) ? item.type : item.type.split(' ');

    const div = document.createElement('div');
    div.setAttribute('data-lg-size', item['size']);
    div.setAttribute('data-src', item['src']);
    div.setAttribute('data-sub-html', "#" + item['captionID']);
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
    div.setAttribute('data-sub-html', "#" + item['captionID']);
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
      div.setAttribute('id', item['captionID']);
      div.innerHTML = item['caption-text'];
  
      captionContainer.appendChild(div);
  })

}

const webData = [
  {
    'category': 'category-web',
    'size': '1917-913',
    'captionID': 'webTelenavNew',
    'src': 'images/24/portfolio/webs/tnv_new.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1904-905',
    'captionID': 'webTelenavOld',
    'src': 'images/24/portfolio/webs/tnv_old.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1901-910',
    'captionID': 'webSynpheon',
    'src': 'images/24/portfolio/webs/synpheon.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1902-909',
    'captionID': 'webDakar',
    'src': 'images/24/portfolio/webs/dakar.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1920-4800',
    'captionID': 'webLandingpage',
    'src': 'images/24/portfolio/webs/Landingpage.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'portrait'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  }
];

const codePenData = [
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenSignInUp',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/QWPwbEr?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenGridList',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/GRLgJgr?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenSVGJS',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/MWxxmyr?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenBlobs',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/XWGGRNB?default-tab=result&theme-id=darkk',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenTransparentMenu',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/mdoommJ?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenResponsiveTable',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/bGZZWzo?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2><p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenFloatingButtons',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/OJqqmYg?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenAnimatedMenuInOut',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/NWJJgGM?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenTriangleCarousel',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/poYYwWY?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-web',
    'size': '1920-1080',
    'captionID': 'webCodePenCSSSkeleton',
    'iframe': true,
    'thumb': 'images/24/portfolio/webs/fiddle-loader.png',
    'src': 'https://codepen.io/sgtdangates/embed/PoLLKZX?default-tab=result&theme-id=dark',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['web', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
]
const mapsData = [
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'captionID': 'mapArt',
    'src': 'images/24/portfolio/maps/port_maps_3d_art.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'captionID': 'mapPaper',
    'src': 'images/24/portfolio/maps/port_maps_3d_paper.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1080-1080',
    'captionID': 'mapBlender',
    'src': 'images/24/portfolio/maps/port_maps_blender.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'square'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1520-1080',
    'captionID': 'mapRenderSun',
    'src': 'images/24/portfolio/maps/port_maps_day.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1520-1080',
    'captionID': 'mapRenderMoon',
    'src': 'images/24/portfolio/maps/port_maps_night.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1792-1080',
    'captionID': 'mapGradients',
    'src': 'images/24/portfolio/maps/port_maps_gradient.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'captionID': 'mapStyle1',
    'src': 'images/24/portfolio/maps/port_maps_detroit1.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'captionID': 'mapStyle2',
    'src': 'images/24/portfolio/maps/port_maps_detroit2.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  },
  {
    'category': 'category-maps',
    'size': '1920-1080',
    'captionID': 'mapStyle3',
    'src': 'images/24/portfolio/maps/port_maps_detroit3.png',
    'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
    'type': ['map', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
  }
];
const brandData = [
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'captionID': 'logoAtleticMed',
      'src': 'images/24/portfolio/brand/port_logo_atletic.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1196-1080',
      'captionID': 'logoCityScroller',
      'src': 'images/24/portfolio/brand/port_logo_city.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'captionID': 'logoCoop',
      'src': 'images/24/portfolio/brand/port_logo_coop.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'square'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'captionID': 'logoFlower',
      'src': 'images/24/portfolio/brand/port_logo_flower.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'captionID': 'logoGames',
      'src': 'images/24/portfolio/brand/port_logo_games.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1440-1080',
      'captionID': 'logoKeytana',
      'src': 'images/24/portfolio/brand/port_logo_keytana.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'landscape'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
  
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'captionID': 'logoOM',
      'src': 'images/24/portfolio/brand/port_logo_oman.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'square'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'captionID': 'logoRecord',
      'src': 'images/24/portfolio/brand/port_logo_reco.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'square'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
    },
    {
      'category': 'category-brand',
      'size': '1080-1080',
      'captionID': 'logoWanted',
      'src': 'images/24/portfolio/brand/port_logo_wanted.png',
      'project-text': "<h2>Telenav's website [US]</h2><p>web development</p>",
      'type': ['logo', 'square'],
    'caption-text': '	<h2 class="galleryitem-caption-title">Project title or what is it for</h2>	<p class="galleryitem-caption-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet consequuntur dolorem dolor asperiores id esse consectetur ut, debitis sed similique incidunt quasi fugiat accusamus quo delectus soluta deleniti eaque? Reiciendis?</p>	'
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
