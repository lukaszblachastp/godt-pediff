module.exports = {
    viewports: [
        { width: 1280, height: 1024 },
        { width: 768, height: 1024 },
        { width: 480, height: 320 }
    ],

    environments: {
        current: 'http://www.godt.no/',
        candidate: 'http://www.testprod.godt.vgnett.no/'
    },

    css: {
        'blockquote': 'display: none;',
        '.quote-container': 'display: none!important;',
        '.ingredients-in-season-slideshow-container .slideshow' : 'display: none;',
        '.search-form .search-input::-webkit-input-placeholder' : 'color: #fff;',
        '#content .video-data iframe' : 'visibility: hidden;',
        '.user-bar': 'visibility: hidden!important',
        '.article-qr-code': 'display: none!important;',
        '.popular-recipes-container .data-list > li': 'display:none!important;',
        '.article-data .share-list': 'display:none!important;',
        '.restaurants-data .map': 'display:none!important',
        '#advert-top, #advert-bottom,  #advert-left, #advert-right, #advert-integration, #advert-net, #advert-super': 'display: none !important;'
    },

    pediff: {
        defaultTimeout: 15000,
        verbose: true,
        screenshotRoot: './img/',
        mismatchTolerance: 0.01,

        // Resemble.js settings
        outputSettings: {
            errorColor: { red: 255, green: 0, blue: 255 },
            // flat | movement | flatDifferenceIntensity | movementDifferenceIntensity
            errorType: 'flatDifferenceIntensity',
            transparency: 1,
            largeImageThreshold: 0
        }
    },

    output: {
        junit: true,
        json: true
    }
};
