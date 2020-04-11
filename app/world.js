import Matter, { Body, Engine, Render, Common, Runner, World, Bodies, Events } from 'matter-js';
import Player from './player';
import Sound from './sound';
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const AudioWorld = () => {
    const addAudio = (x,y, sound) => {
        new Sound(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'Nature');
        World.add( Bodies.circle(x, y, 20,  { label: "audio", isStatic: true, collisionFilter: { category: null } }) );
    };
    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        }
    });
    const player = new Player(Bodies.circle(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 20, { label: "player" }));
    new Sound(SCREEN_WIDTH / 2, 250, 'Fire');
    new Sound((SCREEN_WIDTH / 2) + 50, 130, 'Ambient');


    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);


    World.add(world, [
        player.getBody(),
        Bodies.circle(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 30, { isStatic: true, collisionFilter: { category: null } })
    ]);

    // add gyro control
    if (typeof window !== 'undefined') {
        var updateGravity = function(event) {
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

        window.addEventListener('deviceorientation', updateGravity);
    }

    Events.on(engine, 'beforeTick', event => {
        const { source: { world }} = event;
        const { bodies } = world;
        const { x: playerX, y: playerY } = player.getPosition();

        if (playerX >= SCREEN_WIDTH) {
            Body.setPosition(player.getBody(), { x: 0 , y: playerY });
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
    // Render.lookAt(render, {
    //     min: { x: 0, y: 0 },
    //     max: { x: 800, y: 600 }
    // });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            if (typeof window !== 'undefined') {
                window.removeEventListener('deviceorientation', updateGravity);
            }
        }
    };
};

AudioWorld();

