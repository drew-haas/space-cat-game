var main = (function() {
    "use strict";

    // Global Vars
    var windowW = $(window).width();
    var windowH = $(window).height();
    var timer = 0;
    var numOfCats = 30;
    var score = 0;
    var catSources = [
        './dist/media/cats/cat-1.png',
        './dist/media/cats/cat-2.png',
        './dist/media/cats/cat-3.png',
        './dist/media/cats/cat-4.png',
        './dist/media/cats/cat-5.png',
        './dist/media/cats/cat-6.png',
        './dist/media/cats/cat-7.png'
    ];

    // get random number between two numbers
    function getRandom(lower, upper){
        var randomNumber = Math.round(Math.random()*(upper - lower) + lower);
        return randomNumber;
    }

    // start the game!
    function start() {
        // remove start button
        $('#start').hide();

        // TODO: start timer

        // append cats
        appendCats();

        // init explosion sprite
        $('.exp-img').each(function() {
            $(this).animateSprite({
                columns: 4,
                autoplay: false,
                loop: false,
                fps: 40,
                animations: {
                    explode: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
                },
                complete: function(){
                    // use complete only when you set animations with 'loop: false'
                    console.log('explosion end');
                }
            });
        });

        // on click of cat
        // play explosion gif
        // increase score
        $('.cat').click(function() {
            if (!$(this).hasClass('exploded')) {
                score += 1;
                var index = $(this).data('index');

                $('#score').html(score + '/' + numOfCats);
                $(this).addClass('exploded');

                // sprite animation
                setTimeout(function() {
                    // TODO: figure out why this isn't working
                    $('.cat-' + index + '.exp-img').animateSprite('play', 'explode');
                });
            }
        });
    }

    // append cats continuously until time has ended
    function appendCats() {
        for (var i = 0; i < numOfCats; i++) {
            // animation variables
            var time = Math.random()*(12 - 2) + 2;
            var yStart = getRandom(10, windowH);
            var yFOne = yStart - 30;
            var yFTwo = yStart + 30;
            var yFinish = getRandom(yFOne, yFTwo);
            var delay = getRandom(0, 10);

            // cat div
            var catSrc = catSources[getRandom(0, catSources.length - 1)];
            var catDiv = '<div class="cat cat-' + i + '" data-index="' + i + '"><img class="cat-img" src="' + catSrc + '"><div class="exp-img"></div></div>';
            $('.main-container').append(catDiv);

            // create animation
            // TODO: create these animations or cats on a random timer vs all at once
            TweenMax.set($('.cat-' + i), {x: -200, y: yStart});
            TweenMax.to($('.cat-' + i), time, {delay: delay, x: windowW, y: yFinish});
        }
    }

	// when time ends finish game

    // Set Up Game
    function initGame() {
        $('#start').click(function(){start()});
    }

    // Init
    window.onload = initGame;
    
  })();