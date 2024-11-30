import * as Matter from 'matter-js'
const { Engine, Render, Runner, Composite, Bodies } = Matter
const engine = Engine.create({ gravity: { scale: 0 } })//重力为0,模拟太空环境
function updatePhysic(detal: number) {
    Engine.update(engine, detal);
    const state = {
        bodies: engine.world.bodies.map(body => ({
            id: body.id,
            position: body.position,
            angle: body.angle
        }))
    }
}