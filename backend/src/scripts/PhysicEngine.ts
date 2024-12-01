import * as Matter from 'matter-js';
const { Engine, Render, Runner, Composite, Bodies, Body, Events } = Matter;

// 初始化物理引擎
function initPhysics() {
    const engine = Engine.create({ gravity: { scale: 0 }, enableSleeping: true });
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false
        }
    });

    // 添加渲染器的 canvas 元素到页面中
    Render.run(render);

    // 使用 Runner 启动物理引擎的迭代
    const runner = Runner.create();
    Runner.run(runner, engine);

    return { engine, render, runner };
}

// 更新物理引擎并输出改变的数据
function updatePhysic(delta: number, engine: Matter.Engine) {
    Engine.update(engine, delta);

    // 收集需要发送给客户端的数据
    const changedBodies:any[] = [];

    // 检查每个物体，如果它改变了位置或者角度，则收集它的数据
    Composite.allBodies(engine.world).forEach(body => {
        if (!body.isSleeping) {//如果不处于休眠状态
            changedBodies.push({
                id: body.id, //获取id
                position: body.position,
                angle: body.angle
            });
        }
    });

    // 输出改变的数据
    return changedBodies;
}

// 初始化物理引擎
const { engine } = initPhysics();

// 假设这是一个游戏循环，每帧调用 updatePhysic
function gameLoop(delta: number) {
    const changedData = updatePhysic(delta, engine);
    // 这里可以将 changedData 发送给客户端
    console.log(changedData);
}
const delta = 16.666; 
// 示例：每帧调用 gameLoop，这里使用 setInterval 模拟，实际应用中应该使用 requestAnimationFrames
setInterval(() => {
    gameLoop(delta);
}, delta);
