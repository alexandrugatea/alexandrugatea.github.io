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
        'project-text': `
        <h2>
            Telenav's website [latest] [US]
        </h2>
        <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Implemented this version of the website
        </h2>	
        <p class="galleryitem-caption-text">
            After receiving the design from the Principal UI Designer I coded the entire website on top of Webflow platform. Only used webflow to create the basic grid layouts, then used Custom CSS and JS snippets to create animations and interractivity.
        </p>
        <a href="https://www.telenav.com/" target="_blank">Visit site</a>`
    },
    {
        'category': 'category-web',
        'size': '1904-905',
        'captionID': 'webTelenavOld',
        'src': 'images/24/portfolio/webs/tnv_old.png',
        'project-text': `
        <h2>
            Telenav's website [previous] [US]
        </h2>
        <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Implemented this version of the website
        </h2>	
        <p class="galleryitem-caption-text">
             What I am the most proud of on this project are the animated SVG background graphics, which was 100% my idea and effort.
        </p>
        <a href="https://web.archive.org/web/20200308073901/https://www.telenav.com/" target="_blank">Visit site</a>`
    },
    {
        'category': 'category-web',
        'size': '1901-910',
        'captionID': 'webSynpheon',
        'src': 'images/24/portfolio/webs/synpheon.png',
        'project-text': `
        <h2>
            Synpheon [DE]
        </h2>
        <p>web design & development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Interractive animations based on scroll
        </h2>	
        <p class="galleryitem-caption-text">
            Client came with the design for the landingpage. Then it was up to me tu adapt and create other pages while respecting the brand identity.
            The connectors [animated lines] between cards were generated with JS for full responsiveness. Contact me for more technical details.
        </p>
        <a href="https://www.synpheon.com/" target="_blank">Visit site</a>`
    },
    {
        'category': 'category-web',
        'size': '1902-909',
        'captionID': 'webDakar',
        'src': 'images/24/portfolio/webs/dakar.png',
       'project-text': `
        <h2>
            AutoDakar [RO]
        </h2>
        <p>web design & development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            UIUX, from Brand to Code
        </h2>	
        <p class="galleryitem-caption-text">
            Created the entire brand image, starting with the Logo, then moved into creating the UIUX for entire website, including the admin dashboards. Created from scratch an entire custom SCSS framework for the project.
        </p>
        <a href="https://www.autodakar.ro/" target="_blank">Visit site</a>`
    },
    {
        'category': 'category-web',
        'size': '1920-4800',
        'captionID': 'webLandingpage',
        'src': 'images/24/portfolio/webs/Landingpage.png',
        'project-text': `
            <h2>
                UX portfolio Idea
            </h2>
            <p>web design</p>`,
        'type': ['web', 'portrait'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            UX portfolio Idea
        </h2>	
        <p class="galleryitem-caption-text">
            Prior to implementing this website I had this design in mind. 
        </p>`
    }
];

const codePenData = [
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenSignInUp',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_signInUp.png',
        'src': 'https://codepen.io/sgtdangates/embed/QWPwbEr?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                SignIn / SignUp animated form switch
            </h2>
            <p>web design</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            SignIn / SignUp animated form switch
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenGridList',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_grid_list.png',
        'src': 'https://codepen.io/sgtdangates/embed/GRLgJgr?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                Animated switch for Grid / List view
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Animated switch for Grid / List view
        </h2>	
        <p class="galleryitem-caption-text">
            I'm using JS to control the states of the cards, for creating an interesting animation.
            upon changing the view mode, the cards fade out smoothly then fade back in with the selected view mode.
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenSVGJS',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_svg_circles.png',
        'src': 'https://codepen.io/sgtdangates/embed/MWxxmyr?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                JS generated SVG loader
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            JS generated SVG loader
        </h2>	
        <p class="galleryitem-caption-text">
            Stroke animations were made with the power of SCSS functions and a little bit of trigonometry.
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenBlobs',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_blob.png',
        'src': 'https://codepen.io/sgtdangates/embed/XWGGRNB?default-tab=result&theme-id=darkk',
        'project-text': `
            <h2>
                JS generated and animated concentric blobs
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            JS generated and animated concentric blobs
        </h2>	
        <p class="galleryitem-caption-text">
            Had an idea to "create" the looks of an AI assistant. Immagined the blobs randomly spinning and rotating, until a human interraction occurs, and the blobs react by moving or changing color. Currently it only floats.
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenTransparentMenu',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_blur_menu.png',
        'src': 'https://codepen.io/sgtdangates/embed/mdoommJ?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                Transparent & Blury Multilevel menu
            </h2>
            <p>web design & development</p>`,
        'type': ['web', 'portrait'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Transparent & Blury Multilevel menu
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenResponsiveTable',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_table.png',
        'src': 'https://codepen.io/sgtdangates/embed/bGZZWzo?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                Responsive Tables
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            From Table to Cards
        </h2>	
        <p class="galleryitem-caption-text">
            I'm using lists with items, instead of the classic table element. The with just plain CSS I switch the view from tabelar to cards on mobile devices.
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenFloatingButtons',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/fiddle-float.png',
        'src': 'https://codepen.io/sgtdangates/embed/OJqqmYg?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                Floating Buttons, floating in a circle
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Floating Buttons, floating in a circle
        </h2>	
        <p class="galleryitem-caption-text">
            Interesting animation for displaying multiple CTAs. The JS function can be adjusted to display content on either full circle or coarters/halves. 
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenAnimatedMenuInOut',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_animated_menu.png',
        'src': 'https://codepen.io/sgtdangates/embed/NWJJgGM?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                Incremental animated menu items
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Incremental animated menu items
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenTriangleCarousel',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_carousel_triangle.png',
        'src': 'https://codepen.io/sgtdangates/embed/poYYwWY?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                JS Carousel 
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            JS Carousel
        </h2>	
        <p class="galleryitem-caption-text">
            Interesting carousel arranged in a triangle. All slides are always visible, 2 in the front, one in the back. Slides are transparent and have depth-of-field, which gives the carousel an interesting effect.
        </p>`
    },
    {
        'category': 'category-web',
        'size': '1920-1080',
        'captionID': 'webCodePenCSSSkeleton',
        'iframe': true,
        'thumb': 'images/24/portfolio/webs/codepen_skeleton.png',
        'src': 'https://codepen.io/sgtdangates/embed/PoLLKZX?default-tab=result&theme-id=dark',
        'project-text': `
            <h2>
                Simple HTML skeleton
            </h2>
            <p>web development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            HTML & CSS skeleton 
        </h2>	
        <p class="galleryitem-caption-text">
            Useful for displaying the content of a page during page load.
        </p>`
    },
]
const mapsData = [
    {
        'category': 'category-maps',
        'size': '1920-1080',
        'captionID': 'mapArt',
        'src': 'images/24/portfolio/maps/port_maps_3d_art.png',
       'project-text': `
        <h2>
            3D map: Blender + BlenderOSM
        </h2>
        <p>3D art</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            3D map: Blender + BlenderOSM
        </h2>	
        <p class="galleryitem-caption-text">
            Used BlenderOSM plugin to import real map-data into blender, then styled the entire environment. Route was added in Photoshop.
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1920-1080',
        'captionID': 'mapPaper',
        'src': 'images/24/portfolio/maps/port_maps_3d_paper.png',
       'project-text': `
        <h2>
            3D paper buildings
        </h2>
        <p>3D art</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            A Blender Project
        </h2>	
        <p class="galleryitem-caption-text">
            Used Blender OSM to import real map-data form downtown Los Angels. Created the "paperly" effect on buildings by applying texture and dark wireframes. The red lines were road curves, which I styled to glow, like congested traffic. Used this idea to ask Telenav developers to implement building gradients and reflections.
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1080-1080',
        'captionID': 'mapBlender',
        'src': 'images/24/portfolio/maps/port_maps_blender.png',
       'project-text': `
        <h2>
            3D San Francisco Neighbourhood
        </h2>
        <p>3D art</p>`,
        'type': ['map', 'square'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            3D San Francisco Neighbourhood
        </h2>	
        <p class="galleryitem-caption-text">
            Worked in Blender to create new efects for the actual navigation systems. Used the Blender renders to create interesting animated movies for Marketing presentations.
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1520-1080',
        'captionID': 'mapRenderSun',
        'src': 'images/24/portfolio/maps/port_maps_day.png',
       'project-text': `
        <h2>
            Adding a Sun to the Navigation Engine
        </h2>
        <p>map design & development</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Adding a Sun to the Navigation Engine
        </h2>	
        <p class="galleryitem-caption-text">
            Successfully pursued PMs POs and developers into implementing a world-space Sun inside the navigation engine. Used custom properties to code and animate the movement of the Sun based on time-of-day. The sky object also emits light, that affects the reflections on the 3D buildings.
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1520-1080',
        'captionID': 'mapRenderMoon',
        'src': 'images/24/portfolio/maps/port_maps_night.png',
       'project-text': `
        <h2>
            Adding a Moon to the Navigation Engine
        </h2>
        <p>web development</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Adding a Moon to the Navigation Engine
        </h2>	
        <p class="galleryitem-caption-text">
            Successfully pursued PMs POs and developers into implementing a world-space Moon inside the navigation engine. Used custom properties to code and animate the movement of the Moon based on time-of-day. The sky object also emits light, that affects the reflections on the 3D buildings.
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1792-1080',
        'captionID': 'mapGradients',
        'src': 'images/24/portfolio/maps/port_maps_gradient.png',
       'project-text': `
        <h2>
            Buildings with Gradients
        </h2>
        <p>web development</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Buildings with Gradients
        </h2>	
        <p class="galleryitem-caption-text">
            Collaborated with dev teams in order to create special styling properties that allowed me to apply gradients on the 3D building's sides and rooftop. 
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1920-1080',
        'captionID': 'mapStyle1',
        'src': 'images/24/portfolio/maps/port_maps_detroit1.png',
       'project-text': `
        <h2>
            Map style preview
        </h2>
        <p>web development</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Map style preview
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1920-1080',
        'captionID': 'mapStyle2',
        'src': 'images/24/portfolio/maps/port_maps_detroit2.png',
       'project-text': `
        <h2>
            Map style preview
        </h2>
        <p>web development</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Map style preview
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-maps',
        'size': '1920-1080',
        'captionID': 'mapStyle3',
        'src': 'images/24/portfolio/maps/port_maps_detroit3.png',
       'project-text': `
        <h2>
            Map style preview
        </h2>
        <p>web development</p>`,
        'type': ['map', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Map style preview
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    }
];
const brandData = [
    {
        'category': 'category-brand',
        'size': '1440-1080',
        'captionID': 'logoAtleticMed',
        'src': 'images/24/portfolio/brand/port_logo_atletic.png',
       'project-text': `
        <h2>
            Brand design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1196-1080',
        'captionID': 'logoCityScroller',
        'src': 'images/24/portfolio/brand/port_logo_city.png',
       'project-text': `
        <h2>
            Brand design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1080-1080',
        'captionID': 'logoCoop',
        'src': 'images/24/portfolio/brand/port_logo_coop.png',
       'project-text': `
        <h2>
            Logo design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'square'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1440-1080',
        'captionID': 'logoFlower',
        'src': 'images/24/portfolio/brand/port_logo_flower.png',
       'project-text': `
        <h2>
            Logo Design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1440-1080',
        'captionID': 'logoGames',
        'src': 'images/24/portfolio/brand/port_logo_games.png',
       'project-text': `
        <h2>
            Brand design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1440-1080',
        'captionID': 'logoKeytana',
        'src': 'images/24/portfolio/brand/port_logo_keytana.png',
       'project-text': `
        <h2>
            Logo Design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },

    {
        'category': 'category-brand',
        'size': '1080-1080',
        'captionID': 'logoOM',
        'src': 'images/24/portfolio/brand/port_logo_oman.png',
       'project-text': `
        <h2>
            Logo Design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'square'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1080-1080',
        'captionID': 'logoRecord',
        'src': 'images/24/portfolio/brand/port_logo_reco.png',
       'project-text': `
        <h2>
            Logo Design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'square'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
    },
    {
        'category': 'category-brand',
        'size': '1080-1080',
        'captionID': 'logoWanted',
        'src': 'images/24/portfolio/brand/port_logo_wanted.png',
       'project-text': `
        <h2>
            Brand design
        </h2>
        <p>logo design</p>`,
        'type': ['logo', 'square'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
        </h2>	
        <p class="galleryitem-caption-text">
        </p>`
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
