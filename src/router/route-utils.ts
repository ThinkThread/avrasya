import Router from ".";

export function matcher(router: Router, method: string, url: string) {
    const routes = router.routes[method];

    if (!routes) {
        return null;
    }

    for (const route in routes) {
        if (matchRoute(route, url)) {
            return routes[route];
        }
    }

    return null;
}

export function matchRoute(route: string, url: string) {
    const routeSegments = route.split('/');
    const urlSegments = url.split('/');

    if (routeSegments.length !== urlSegments.length) {
        return false;
    }

    for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i] !== urlSegments[i] && !routeSegments[i].startsWith(':')) {
            return false;
        }
    }

    return true;
}
