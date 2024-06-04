const portfolioContainer = document.getElementById('gallery');

function renderPortfolio(category) {
    category.forEach(item => {

        const classes = Array.isArray(item.type) ? item.type : item.type.split(' ');

        const div = document.createElement('div');
        div.setAttribute('data-lg-size', item['size']);
        div.setAttribute('data-src', item['src']);
        div.setAttribute('data-sub-html', "#" + item['captionID']);
        div.setAttribute('data-slide-name', item['captionID']);
        div.classList.add('gallery-item', 'kursor-hover', 'zoom', item['category']);

        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectImageDiv = document.createElement('div');
        projectImageDiv.classList.add('project-image');

        const img = document.createElement('img');
        img.setAttribute('src', item['src']);
        img.setAttribute('alt', item['alt']);
        img.setAttribute('loading', 'lazy');
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
        'size': '1440-682',
        'captionID': 'toDoApp',
        'src': 'build/images/portfolio/webs/ToDo.png',
        'project-text': `
        <h2>
            To Do App
        </h2>
        <p>web design & development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            ToDo App 
        </h2>	
        <p class="galleryitem-caption-text">
        Built with ♥ (and JS + WebPack)
        </p>
        <a href="/odin/odintodo/" target="_blank">Visit Project</a>`,
        'alt':  "ToDo App"
    },
    {
        'category': 'category-web',
        'size': '1440-686',
        'captionID': 'js30',
        'src': 'build/images/portfolio/webs/jsch.png',
        'project-text': `
        <h2>
            30Day JS challenge by WesBos
        </h2>
        <p>JS course</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Built 30 mini JavaScript projects
        </h2>	
        <p class="galleryitem-caption-text">
        <br>
        <a href="https://www.wesbos.com/" target="_blank">wesbos.com</a>
        <br>
        <br>
        </p>
        <a href="/js30" target="_blank">View completed projects</a>`,
        'alt':  "WesBos"
    },
    {
        'category': 'category-web',
        'size': '1914-907',
        'captionID': 'webAdminDash',
        'src': 'build/images/portfolio/webs/admindash.png',
        'project-text': `
            <h2>
                Admin Dashboard
            </h2>
            <p>web design & development</p>`,
        'type': ['web', 'landscape'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Admin Dashboard
        </h2>	
        <p class="galleryitem-caption-text">
            Part of "The Odin Project" curriculum, this project showcases an admin dashboard with animated sidebar.
        </p>
        <a href="/odin/odin-dashboard/" target="_blank">Visit project</a>`,
        'alt': "Admin Dashboard"
    },
    {
        'category': 'category-web',
        'size': '959-911',
        'captionID': 'webSignInUp',
        'src': 'build/images/portfolio/webs/valhalla_sign_up.png',
        'project-text': `
            <h2>
                SignIn SignUp Animated Switch
            </h2>
            <p>web design & development</p>`,
        'type': ['web', 'square'],
        'caption-text': `
        <h2 class="galleryitem-caption-title">
            Sign up / Sign In forms
        </h2>	
        <p class="galleryitem-caption-text">
            Part of "The Odin Project" curriculum, this project showcases an animated way of switching between sign up and sign in forms. Live validation is made through Javascript. For demo purpose, I've implemented a "dummy data" button, that saves the credentials in your local storage. 
        </p>
        <a href="/odin/odin-signup/" target="_blank">Visit project</a>`,
        'alt': "SignIn SignUp Animated Switch"
    },
    {
        'category': 'category-web',
        'size': '1440-686',
        'captionID': 'webTelenavNew',
        'src': 'build/images/portfolio/webs/tnv_new.png',
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
        <a href="https://www.telenav.com/" target="_blank">Visit site</a>`,
        'alt':  "Telenav's website [US]"
    },
    {
        'category': 'category-web',
        'size': '1440-685',
        'captionID': 'webTelenavOld',
        'src': 'build/images/portfolio/webs/tnv_old.png',
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
        <a href="https://web.archive.org/web/20200308073901/https://www.telenav.com/" target="_blank">Visit site</a>`,
        'alt': "Telenav's website [US]"
    },
    {
        'category': 'category-web',
        'size': '1440-689',
        'captionID': 'webSynpheon',
        'src': 'build/images/portfolio/webs/synpheon.png',
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
        <a href="https://www.synpheon.com/" target="_blank">Visit site</a>`,
        'alt': "Synpheon [DE]"
    },
    // {
    //     'category': 'category-web',
    //     'size': '1440-688',
    //     'captionID': 'webDakar',
    //     'src': 'build/images/portfolio/webs/dakar.png',
    //    'project-text': `
    //     <h2>
    //         AutoDakar [RO]
    //     </h2>
    //     <p>web design & development</p>`,
    //     'type': ['web', 'landscape'],
    //     'caption-text': `
    //     <h2 class="galleryitem-caption-title">
    //         UIUX, from Brand to Code
    //     </h2>	
    //     <p class="galleryitem-caption-text">
    //         Created the entire brand image, starting with the Logo, then moved into creating the UIUX for entire website, including the admin dashboards. Created from scratch an entire custom SCSS framework for the project.
    //     </p>
    //     <a href="https://www.autodakar.ro/" target="_blank">Visit site</a>`,
    //     'alt': "AutoDakar [RO]"
    // },
    {
        'category': 'category-web',
        'size': '1440-3138',
        'captionID': 'webLandingpage',
        'src': 'build/images/portfolio/webs/Landingpage.png',
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
        </p>`,
        'alt': "UX portfolio Idea"
    },


];

const codePenData = [
    {
        'category': 'category-web',
        'size': '420-274',
        'captionID': 'webCodePenGridList',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_grid_list.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
            I'm using JS to control the states of the cards, for creating an interesting animation.
            upon changing the view mode, the cards fade out smoothly then fade back in with the selected view mode.
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea Grid List Switch"
    },
    {
        'category': 'category-web',
        'size': '420-283',
        'captionID': 'webCodePenSVGJS',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_svg_circles.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
            Stroke animations were made with the power of SCSS functions and a little bit of trigonometry.
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea SVG Loader"
    },
    {
        'category': 'category-web',
        'size': '420-202',
        'captionID': 'webCodePenBlobs',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_blob.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
            Had an idea to "create" the looks of an AI assistant. Immagined the blobs randomly spinning and rotating, until a human interraction occurs, and the blobs react by moving or changing color. Currently it only floats.
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea Animated Blobs"
    },
    {
        'category': 'category-web',
        'size': '420-769',
        'captionID': 'webCodePenTransparentMenu',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_blur_menu.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea Blurry Transparent Menu"
    },
    // {
    //     'category': 'category-web',
    //     'size': '420-309',
    //     'captionID': 'webCodePenResponsiveTable',
    //     'iframe': true,
    //     'thumb': 'build/images/portfolio/webs/codepen_table.png',
    //     'src': 'https://codepen.io/sgtdangates/embed/bGZZWzo?default-tab=result&theme-id=dark',
    //     'project-text': `
    //         <h2>
    //             Responsive Tables
    //         </h2>
    //         <p>web development</p>`,
    //     'type': ['web', 'landscape'],
    //     'caption-text': `
    //     <h2 class="galleryitem-caption-title">
    //         From Table to Cards
    //     </h2>	
    //     <p class="galleryitem-caption-text">
    //         <span class="hint">For best experience open Codepens on a Desktop Browser</span>
    //         I'm using lists with items, instead of the classic table element. The with just plain CSS I switch the view from tabelar to cards on mobile devices.
    //     </p>`,
    //     'alt': "CodePen Portfolio Alexandru Gatea Responsive Table"
    // },
    {
        'category': 'category-web',
        'size': '420-327',
        'captionID': 'webCodePenFloatingButtons',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/fiddle-float.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
            Interesting animation for displaying multiple CTAs. The JS function can be adjusted to display content on either full circle or coarters/halves. 
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea Floating Buttons"
    },
    {
        'category': 'category-web',
        'size': '420-263',
        'captionID': 'webCodePenAnimatedMenuInOut',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_animated_menu.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea Animated Menu"
    },
    {
        'category': 'category-web',
        'size': '420-272',
        'captionID': 'webCodePenTriangleCarousel',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_carousel_triangle.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
            Interesting carousel arranged in a triangle. All slides are always visible, 2 in the front, one in the back. Slides are transparent and have depth-of-field, which gives the carousel an interesting effect.
        </p>`,
        'alt': "CodePen Portfolio Alexandru Gatea Triangle Carousel"
    },
    {
        'category': 'category-web',
        'size': '420-270',
        'captionID': 'webCodePenCSSSkeleton',
        'iframe': true,
        'thumb': 'build/images/portfolio/webs/codepen_skeleton.png',
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
            <span class="hint">For best experience open Codepens on a Desktop Browser</span>
            Useful for displaying the content of a page during page load.
        </p>`,
        'alt':  "CodePen Portfolio Alexandru Gatea CSS Skeleton"
    },
]
const mapsData = [
    {
        'category': 'category-maps',
        'size': '1440-810',
        'captionID': 'mapArt',
        'src': 'build/images/portfolio/maps/port_maps_3d_art.png',
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
        </p>`,
        'alt': "3D Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1440-810',
        'captionID': 'mapPaper',
        'src': 'build/images/portfolio/maps/port_maps_3d_paper.png',
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
        </p>`,
        'alt': "3D Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1080-1080',
        'captionID': 'mapBlender',
        'src': 'build/images/portfolio/maps/port_maps_blender.png',
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
        </p>`,
        'alt':  "3D Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1200-853',
        'captionID': 'mapRenderSun',
        'src': 'build/images/portfolio/maps/port_maps_day.png',
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
        </p>`,
        'alt':  "Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1200-853',
        'captionID': 'mapRenderMoon',
        'src': 'build/images/portfolio/maps/port_maps_night.png',
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
        </p>`,
        'alt':  "Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1440-868',
        'captionID': 'mapGradients',
        'src': 'build/images/portfolio/maps/port_maps_gradient.png',
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
        </p>`,
        'alt':  "Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1440-810',
        'captionID': 'mapStyle1',
        'src': 'build/images/portfolio/maps/port_maps_detroit1.png',
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
        </p>`,
        'alt':  "Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1440-810',
        'captionID': 'mapStyle2',
        'src': 'build/images/portfolio/maps/port_maps_detroit2.png',
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
        </p>`,
        'alt':  "Map Design"
    },
    {
        'category': 'category-maps',
        'size': '1440-810',
        'captionID': 'mapStyle3',
        'src': 'build/images/portfolio/maps/port_maps_detroit3.png',
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
        </p>`,
        'alt': "Map Design"
    }
];
const brandData = [
    {
        'category': 'category-brand',
        'size': '1440-791',
        'captionID': 'logoAtleticMed',
        'src': 'build/images/portfolio/brand/FunkByteTechLogo_print_color_h_db.png',
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
        </p>`,
        'alt':  "Atletic Med"
    },
    {
        'category': 'category-brand',
        'size': '1440-810',
        'captionID': 'logoAtleticMed',
        'src': 'build/images/portfolio/brand/AtleticMed_ColorForGrey.png',
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
        </p>`,
        'alt':  "Atletic Med"
    },
    {
        'category': 'category-brand',
        'size': '1196-1080',
        'captionID': 'logoCityScroller',
        'src': 'build/images/portfolio/brand/port_logo_city.png',
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
        </p>`,
        'alt':  "City Scroller"
    },
    // {
    //     'category': 'category-brand',
    //     'size': '1080-1080',
    //     'captionID': 'logoCoop',
    //     'src': 'build/images/portfolio/brand/port_logo_coop.png',
    //    'project-text': `
    //     <h2>
    //         Logo design
    //     </h2>
    //     <p>logo design</p>`,
    //     'type': ['logo', 'square'],
    //     'caption-text': `
    //     <h2 class="galleryitem-caption-title">
    //     </h2>	
    //     <p class="galleryitem-caption-text">
    //     </p>`,
    //     'alt':  "Cooperativa Agricola"
    // },
    // {
    //     'category': 'category-brand',
    //     'size': '1440-1080',
    //     'captionID': 'logoFlower',
    //     'src': 'build/images/portfolio/brand/port_logo_flower.png',
    //     'project-text': `
    //     <h2>
    //         Logo Design
    //     </h2>
    //     <p>logo design</p>`,
    //     'type': ['logo', 'landscape'],
    //     'caption-text': `
    //     <h2 class="galleryitem-caption-title">
    //     </h2>	
    //     <p class="galleryitem-caption-text">
    //     </p>`,
    //     'alt':  "Little Daisy Flower Shop"
    // },
    // {
    //     'category': 'category-brand',
    //     'size': '1440-1080',
    //     'captionID': 'logoGames',
    //     'src': 'build/images/portfolio/brand/port_logo_games.png',
    //    'project-text': `
    //     <h2>
    //         Brand design
    //     </h2>
    //     <p>logo design</p>`,
    //     'type': ['logo', 'landscape'],
    //     'caption-text': `
    //     <h2 class="galleryitem-caption-title">
    //     </h2>	
    //     <p class="galleryitem-caption-text">
    //     </p>`,
    //     'alt':  "Board Games Rental"
    // },
    {
        'category': 'category-brand',
        'size': '1440-1080',
        'captionID': 'logoKeytana',
        'src': 'build/images/portfolio/brand/port_logo_keytana.png',
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
        </p>`,
        'alt':  "Keytana"
    },

    {
        'category': 'category-brand',
        'size': '1080-1080',
        'captionID': 'logoOM',
        'src': 'build/images/portfolio/brand/port_logo_oman.png',
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
        </p>`,
        'alt':  "Original Man"
    },
    {
        'category': 'category-brand',
        'size': '1080-1080',
        'captionID': 'logoRecord',
        'src': 'build/images/portfolio/brand/port_logo_reco.png',
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
        </p>`,
        'alt':  "Movement Records"
    },
    // {
    //     'category': 'category-brand',
    //     'size': '1080-1080',
    //     'captionID': 'logoWanted',
    //     'src': 'build/images/portfolio/brand/port_logo_wanted.png',
    //    'project-text': `
    //     <h2>
    //         Brand design
    //     </h2>
    //     <p>logo design</p>`,
    //     'type': ['logo', 'square'],
    //     'caption-text': `
    //     <h2 class="galleryitem-caption-title">
    //     </h2>	
    //     <p class="galleryitem-caption-text">
    //     </p>`,
    //     'alt':  "Wanted Sneakers"
    // },
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
