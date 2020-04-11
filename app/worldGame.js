import Matter, { Body, Engine, Render, Common, Runner, World, Bodies, Events } from 'matter-js';
import Player from './player';
import Sound from './sound';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const WorldGame = () => {

    const randomRgba = () => {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    }
    const addAudio = (x, y, sound) => {
        new Sound(x, y, 'Nature');
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
    const loadListeners = () => {
        window.addEventListener('deviceorientation', updateGravity, false);
        window.addEventListener('mousedown', ({ clientX, clientY }) => {
            addAudio(clientX, clientY);
        }, false);
        // window.addEventListener('mouseup', updateGravity, false);
    }
    loadListeners();
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
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

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);
    // add player
    World.add(world, player.getBody() );

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

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        start: function () {
            Matter.Render.run(render);
            Matter.Runner.run(runner, engine);
            if (typeof window !== 'undefined') {
                window.addEventListener('deviceorientation', updateGravity);
            }
        },
        stop: function () {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            if (typeof window !== 'undefined') {
                window.removeEventListener('deviceorientation', updateGravity);
            }
        }
    };
};

export default WorldGame;
