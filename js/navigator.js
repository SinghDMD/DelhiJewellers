
function getPathFromHash() {
    const hashPath = window.location.hash.slice(1);

    if (!hashPath) {
        return '/';
    }

    if (hashPath.startsWith('/')) {
        return hashPath;
    } else {
        return '/' + hashPath;
    }
}

const router = (function ($) {


    const routes = {
        '/': {
            url: 'ajax/pages/home.html',
            js: false,
            css: false,
            visibility: {
                '#private-info': 'hide',
                '#public-greeting': 'show'
            }
        },
        '/home': {
            url: 'ajax/pages/home.html',
            js: false,
            visibility: {
                '#private-info': 'hide',
                '#public-greeting': 'show'
            }
        },
        '/about': {
            url: 'ajax/pages/about.html',
            css: [
                'assets/css/about.css?v=11012025'
            ]

        },

        '/resources': {
            url: 'ajax/pages/resources.html?v=11012025',
        },
        '/contact': {
            url: 'ajax/pages/contact.html',
            js: [
                'assets/js/contact.js?v=11012025'
            ],
            css: [
                'assets/css/contact.css?v=10262025'
            ]
        },

        default: {
            url: 'ajax/pages/home.html'
        }
    };

    const $contentContainer = $('#content-container');

    function applyVisibilityRules(rules) {
        $.each(rules, function (selector, action) {
            const $element = $contentContainer.find(selector);
            if ($element.length > 0) {
                if (action === 'hide') {
                    $element.hide();
                } else if (action === 'show') {
                    $element.show();
                }
            }
        });
    }

    function loadPageJS(jsArray) {

        $.each(jsArray, function (index, filePath) {
            $.getScript(filePath)
                .done(function (script, textStatus) {
                    //     console.log(`Successfully loaded script: ${filePath}`);
                })
                .fail(function (jqxhr, settings, exception) {
                    //    console.error(`Failed to load script: ${filePath}`, exception);
                });
        });
    }

    function loadPageCSS(cssArray) {

        $.each(cssArray, function (index, filePath) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = filePath;
            document.head.appendChild(linkElement);
        });
    }

    function load(path) {
        let routeConfig = routes[path];
        let urlToLoad;
        let cssToLoad;
        let visibilityRules = {};

        if (routeConfig) {
            urlToLoad = routeConfig.url;
            visibilityRules = routeConfig.visibility || {};

            // Check if 'js' property exists (i.e., not undefined or false)
            if (routeConfig.js) {
                loadPageJS(routeConfig.js);
            }
            if (routeConfig.css) {
                loadPageCSS(routeConfig.css);
            }

        } else {
            const fileName = path.slice(1);
            urlToLoad = `ajax/pages/${fileName}.html`;
            //  console.log(`Route not defined. Attempting fallback URL: ${urlToLoad}`);
        }

        $contentContainer.load(urlToLoad, function (response, status, xhr) {
            if (status === "error") {
                const errorMsg = (xhr.status === 404)
                    ? `<div class="text-center"><h1>404 Not Found</h1><p>Page file not found</p></div>`
                    : `<div class="text-center"><h1>Error Loading Page</h1><p>Status: ${xhr.status}, Could not load requested page.</p></div>`;
                $contentContainer.html(errorMsg);
            } else {
                if (routeConfig) {
                    applyVisibilityRules(visibilityRules);
                }
            }
        });
    }

    function navigate(path) {
        window.location.hash = path;
    }

    return {
        load: load,
        navigate: navigate
    };
})(jQuery);

$(document).ready(function () {

    router.load(getPathFromHash());

    $(window).on('hashchange', function () {
        router.load(getPathFromHash());
    });
});