var myearth;
var sprites = [];

$(document).ready(function () {

    // toggle mobile menu
    $('[data-toggle="toggle-nav"]').on('click', function () {
        $(this).closest('nav').find($(this).attr('data-target')).toggleClass('hidden');
        return false;
    });

    // feather icons
    feather.replace();

    // smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]');



    myearth = new Earth( 'myearth', {
        location : { lat: 20, lng : 20 },
        light: 'none',
        mapImage: './assets/hologram/hologram-map.svg',
        transparent: true,
        draggable: false,

        autoRotate : true,
        autoRotateSpeed: 0.25,
        autoRotateDelay: 100,
        autoRotateStart: 2000,
    } );


    myearth.addEventListener( "ready", function() {

        const line = { color : '#009CFF', opacity: 0.35, hairline: true, offset: -0.5};
        for ( let i in connections ) {
            line.locations = [ { lat: connections[i][0], lng: connections[i][1] }, { lat: connections[i][2], lng: connections[i][3] } ];
            this.addLine( line );
        }
        for ( var i=0; i < 8; i++ ) {
            sprites[i] = this.addSprite( {
                image: './assets/hologram/hologram-shine.svg',
                scale: 0.01,
                offset: -0.5,
                opacity: 0.5
            } );
            pulse( i );
        }

        const tooltip_opener = this.addOverlay( {
            content: '<div class="fs-s3 sm-fs-s1 md-fs-m1 lg-fs-m3">Developers & Scientists</div>',
            location : {lat: 48.7666, lng: 20.4922},
            depthScale: 0.25,
            className : 'tooltip',
            occlude: false
        } );

        const tooltip_opener2 = this.addOverlay( {
            content: '<div class="fs-s3 sm-fs-s1 md-fs-m1 lg-fs-m3">End User</div>',
            location : {lat: -28.6331, lng: 24.8271},
            depthScale: 0.25,
            className : 'tooltip',
            occlude: false
        } );

        const tooltip_opener3 = this.addOverlay( {
            content: '<div class="fs-s3 sm-fs-s1 md-fs-m1 lg-fs-m3">Data miners & Crypto Farm</div>',
            location : {lat: -7.8816, lng: -36.3822},
            depthScale: 0.25,
            className : 'tooltip',
            occlude: false
        } );

        const tooltip_opener4 = this.addOverlay( {
            content: '<div class="fs-s3 sm-fs-s1 md-fs-m1 lg-fs-m3">EO service provider</div>',
            location : {lat: 27.4501, lng: 39.4982},
            depthScale: 0.25,
            className : 'tooltip',
            occlude: false
        } );

        tooltip_opener.element.querySelector('div').addEventListener( 'click', rotateEarthToMarker.bind(tooltip_opener));
        tooltip_opener2.element.querySelector('div').addEventListener( 'click', rotateEarthToMarker.bind(tooltip_opener2));
        tooltip_opener3.element.querySelector('div').addEventListener( 'click', rotateEarthToMarker.bind(tooltip_opener3));
        tooltip_opener4.element.querySelector('div').addEventListener( 'click', rotateEarthToMarker.bind(tooltip_opener4));

        var stars = [];
        var star_count = 1000;
        for ( var i=0; i < star_count; i++ ) {
            stars.push( {
                location : { lat: getRandomInt(-60,60), lng: getRandomInt(-180,180) },
                offset: getRandomInt(40,60),
                scale: 1,
                opacity: getRandomInt(20,80)/100,
                color: 'rgb('+ getRandomInt(180,255) +','+ getRandomInt(180,255) +','+ getRandomInt(180,255) +')',
            } );
        }
        var mypoints = myearth.addPoints( {
            points: stars,
            scale: 0.5 + window.innerWidth / 2000
        } );
    } );
} );

function rotateEarthToMarker() {
    myearth.goTo( this.location, { relativeDuration: 100, approachAngle: 12, end: function(){console.log("ROUTE")} } )
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function pulse( index ) {
    var random_location = connections[ getRandomInt(0, connections.length-1) ];
    sprites[index].location = { lat: random_location[0] , lng: random_location[1] };

    sprites[index].animate( 'scale', 0.5, { duration: 320, complete : function(){
            this.animate( 'scale', 0.01, { duration: 320, complete : function(){
                    setTimeout( function(){ pulse( index ); }, getRandomInt(100, 400) );
                } });
        } });
}



// locations conntected by lines and places where hologram shines appear

    var connections = [
        [59.651901245117,17.918600082397,	41.8002778,12.2388889],
        [59.651901245117,17.918600082397,	51.4706,-0.461941],

        [13.681099891662598,100.74700164794922,	-6.1255698204,106.65599823],
        [13.681099891662598,100.74700164794922,	28.566499710083008,77.10310363769531],

        [30.12190055847168,31.40559959411621, -1.31923997402,36.9277992249],
        [30.12190055847168,31.40559959411621, 25.2527999878,55.3643989563],
        [30.12190055847168,31.40559959411621, 41.8002778,12.2388889],

        [28.566499710083008,77.10310363769531,	7.180759906768799,79.88410186767578],
        [28.566499710083008,77.10310363769531,	40.080101013183594,116.58499908447266],
        [28.566499710083008,77.10310363769531,	25.2527999878,55.3643989563],

        [-33.9648017883,18.6016998291, -1.31923997402,36.9277992249],

        [-1.31923997402,36.9277992249, 25.2527999878,55.3643989563],

        [41.8002778,12.2388889, 51.4706,-0.461941],
        [41.8002778,12.2388889, 40.471926,-3.56264],

        [19.4363,-99.072098,	25.79319953918457,-80.29060363769531],
        [19.4363,-99.072098,	33.94250107,-118.4079971],
        [19.4363,-99.072098,	-12.0219,-77.114304],

        [-12.0219,-77.114304,	-33.393001556396484,-70.78579711914062],
        [-12.0219,-77.114304, -34.8222,-58.5358],
        [-12.0219,-77.114304, -22.910499572799996,-43.1631011963],

        [-34.8222,-58.5358, -33.393001556396484,-70.78579711914062],
        [-34.8222,-58.5358, -22.910499572799996,-43.1631011963],

        [22.3089008331,113.915000916, 13.681099891662598,100.74700164794922],
        [22.3089008331,113.915000916, 40.080101013183594,116.58499908447266],
        [22.3089008331,113.915000916, 31.143400192260742,121.80500030517578],

        [35.552299,139.779999, 40.080101013183594,116.58499908447266],
        [35.552299,139.779999, 31.143400192260742,121.80500030517578],

        [33.94250107,-118.4079971,	40.63980103,-73.77890015],
        [33.94250107,-118.4079971,	25.79319953918457,-80.29060363769531],
        [33.94250107,-118.4079971,	49.193901062,-123.183998108],

        [40.63980103,-73.77890015, 25.79319953918457,-80.29060363769531],
        [40.63980103,-73.77890015, 51.4706,-0.461941],

        [51.4706,-0.461941, 40.471926,-3.56264],

        [40.080101013183594,116.58499908447266,	31.143400192260742,121.80500030517578],

        [-33.94609832763672,151.177001953125,	-41.3272018433,174.804992676],
        [-33.94609832763672,151.177001953125,	-6.1255698204,106.65599823],

        [55.5914993286,37.2615013123, 59.651901245117,17.918600082397],
        [55.5914993286,37.2615013123, 41.8002778,12.2388889],
        [55.5914993286,37.2615013123, 40.080101013183594,116.58499908447266],
        [55.5914993286,37.2615013123, 25.2527999878,55.3643989563],
    ];