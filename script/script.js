import Game from "./Game.js";


window.addEventListener('load', function () {
    // canvas setup

    WebFont.load({
        google: {
            families: ['Bangers']
        },
        active: async function () {
            await (() => {
                const a = document.querySelector(".loading");
                a.style.display = "none"
            })();

            const canvas = document.getElementById('canvas1');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const game = new Game(canvas.width, canvas.height);
            let lastTime = 0;

            window.addEventListener("resize", function () {
                canvas.width = window.innerWidth;
                // this.width = window.innerWidth;
            });


            // animation loop
            function animate(timeStamp) {
                const deltaTime = timeStamp - lastTime;
                lastTime = timeStamp;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                game.draw(ctx);
                game.update(deltaTime);
                if (
                    game.pause === false &&
                    game.start
                ) {
                    game.id = requestAnimationFrame(animate)
                }
            }
            animate(0);
            game.input.inputevents(animate)
        }
    });


});