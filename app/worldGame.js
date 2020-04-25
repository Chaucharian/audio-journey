import Matter, { Body, Engine, Render, Common, Runner, World, Bodies, Events } from 'matter-js';
import Player from './player';
import Sound from './sound';
import { watcher } from './main';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const WorldGame = dispatcher => {

    const deviceValidation = () =>
        new Promise((resolve, reject) => {
            window.addEventListener('deviceorientation', event => {
                const { gamma, beta } = event;
                let gyroPresent = gamma || beta;
                const isMobile = (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true; })(navigator.userAgent || navigator.vendor || window.opera);

                if (isMobile) {
                    if (gyroPresent) {
                        resolve("PLAY");
                    } else {
                        reject("BETTER_DEVICE_NEEDED_BARAT");
                    }
                } else {
                    reject("MOBILE_NEEDED");
                }
            }, false);
        });

    const createWorld = () => {
        const randomRgba = () => {
            const o = Math.round, r = Math.random, s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
        }
        const addAudio = (x, y, sound) => {
            new Sound(x, y, sound);
            World.add(world, Bodies.circle(x, y, 20, {
                label: "audio",
                isStatic: true,
                collisionFilter: { category: null },
                render: { fillStyle: `${randomRgba()}` }
            }));
        };
        const updateGravity = event => {
            var orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0,
                gravity = engine.world.gravity;

            if (orientation === 0) {
                gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Common.clamp(event.beta, -90, 90) / 90;
            } else if (orientation === 180) {
                gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
            } else if (orientation === 90) {
                gravity.x = Common.clamp(event.beta, -90, 90) / 90;
                gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
            } else if (orientation === -90) {
                gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
                gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
            }
        };
        const loadListeners = (canvas, start, stop) => {
            window.addEventListener('deviceorientation', updateGravity, false);
            canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
                stop();
                dispatcher.next({
                    callback: callback => callback.then(data => {
                        start();
                        if (data !== 'close') {
                            addAudio(clientX, clientY, data);
                        }
                    }), action: "RECORD_AUDIO"
                });
            }, false);
            canvas.addEventListener('touchstart', ({ touches: [{ clientX, clientY }] }) => {
                stop();
                dispatcher.next({
                    callback: callback => callback.then(data => {
                        start();
                        if (data !== 'close') {
                            addAudio(clientX, clientY, data);
                        }
                    }), action: "RECORD_AUDIO"
                });
            }, false);

        }
        // create engine
        const engine = Engine.create(),
            world = engine.world;
        const runner = Runner.create();
        // create renderer
        const render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                wireframes: false
            }
        });
        const player = new Player(Bodies.circle(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 20, { label: "player" }));

        Render.run(render);
        Runner.run(runner, engine);

        World.add(world, player.getBody());

        Events.on(engine, 'beforeTick', event => {
            const { source: { world } } = event;
            const { bodies } = world;
            const { x: playerX, y: playerY } = player.getPosition();

            if (playerX >= SCREEN_WIDTH) {
                Body.setPosition(player.getBody(), { x: 0, y: playerY });
            } else if (playerX <= 0) {
                Body.setPosition(player.getBody(), { x: SCREEN_WIDTH, y: playerY });
            } else if (playerY >= SCREEN_HEIGHT) {
                Body.setPosition(player.getBody(), { x: playerX, y: 0 });
            } else if (playerY <= 0) {
                Body.setPosition(player.getBody(), { x: playerX, y: SCREEN_HEIGHT });
            }
            player.update();
        });
        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: SCREEN_WIDTH, y: SCREEN_HEIGHT }
        });

        const start = () => {
            Matter.Render.run(render);
            Matter.Runner.run(runner, engine);
            if (typeof window !== 'undefined') {
                window.addEventListener('deviceorientation', updateGravity);
            }
        }
        const stop = () => {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            if (typeof window !== 'undefined') {
                window.removeEventListener('deviceorientation', updateGravity);
            }
        }
        loadListeners(render.canvas, start, stop);

    }

    const init = () => {
        dispatcher.next({ action: "LOADING" });
        deviceValidation().then(action => dispatcher.next({ action })).catch(action => dispatcher.next({ action }));
        createWorld();
    }

    init();
};

export default WorldGame;
