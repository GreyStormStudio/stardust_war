class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    //#region 标准方法
    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y)
    }

    multiply(s: number): Vector2 {
        return new Vector2(this.x * s, this.y * s)
    }

    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    radian(): number {
        return Math.atan2(this.y, this.x)
    }

    normalize(): Vector2 {
        const len = this.length()
        if (len < 1e-7) {
            return new Vector2(0, 0)
        }
        return new Vector2(this.x / len, this.y / len)
    }
    //#endregion
    // 将 Vector2 实例转换为可序列化的对象
    toSerializable() {
        return { x: this.x, y: this.y };
    }
    // 使用可序列化的对象来创建 Vector2 实例
    static fromSerializable(data: { x: number, y: number }) {
        return new Vector2(data.x, data.y);
    }
}
class RigidBody {
    mass: number;
    airFriction: number;
    thrust: number;
    label: string;

    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;

    angle: number;
    angularVelcity: number;
    angularAcceleraion: number;

    forces: Vector2[];
    torque: number;
    constructor(position: Vector2, mass: number, label: string) {
        this.mass = mass;
        this.airFriction = 0;
        this.thrust = 40000;
        this.label = label;
        this.position = position;
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.angle = 0;
        this.angularVelcity = 0;
        this.angularAcceleraion = 0;
        this.forces = [];
        this.torque = 0;
    }
    //#region 标准方法
    applyforce(magnitude: number, angle: number): void {
        // 计算推力方向
        const forceDirection = new Vector2(Math.cos(angle), Math.sin(angle)).normalize();
        // 创建推力向量
        const force = forceDirection.multiply(magnitude);
        // 应用推力
        this.forces.push(force);
    }

    applytorque(torque: number): void {
        // 应用角力矩
        this.torque += torque;
    }

    update(deltaTime: number): void {
        this.acceleration = new Vector2(0, 0)
        const dragForce = -this.airFriction * this.velocity.length() * this.velocity.length()
        this.applyforce(dragForce, this.velocity.radian());//应用空气阻力,方向为当前速度方向+π
        for (const force of this.forces) {
            this.acceleration = this.acceleration.add(force.multiply(1 / this.mass))
        }
        this.velocity = this.velocity.add(this.acceleration.multiply(deltaTime));
        this.position = this.position.add(this.velocity.multiply(deltaTime));
        this.forces = [];

        this.angularAcceleraion = this.torque / this.mass;
        this.angularVelcity += this.angularAcceleraion * deltaTime;
        this.angle = (this.angle + this.angularVelcity * deltaTime) % 360;
        if (this.angle < 0) {
            this.angle += 360;
        }//限制角度
        this.torque = 0;
    }
    //#endregion
    // 将 RigidBody 实例转换为可序列化的对象
    toSerializable() {
        return {
            mass: this.mass,
            airFriction: this.airFriction,
            thrust: this.thrust,
            label: this.label,
            position: this.position.toSerializable(),
            velocity: this.velocity.toSerializable(),
            acceleration: this.acceleration.toSerializable(),
            angle: this.angle,
            angularVelcity: this.angularVelcity,
            angularAcceleraion: this.angularAcceleraion,
            forces: [],
            torque: 0
        };
    }

    // 使用可序列化的对象来创建 RigidBody 实例
    static fromSerializable(data: any) {
        const body = new RigidBody(new Vector2(0, 0), data.mass, data.label);
        body.airFriction = 1;
        body.thrust = data.thrust;
        body.position = Vector2.fromSerializable(data.position);
        body.velocity = Vector2.fromSerializable(data.velocity);
        body.acceleration = Vector2.fromSerializable(data.acceleration);
        body.angle = data.angle;
        body.angularVelcity = data.angularVelcity;
        body.angularAcceleraion = data.angularAcceleraion;
        body.forces = [];
        body.torque = 0;
        return body;
    }
}

class PhysicsEngine {
    rigidBodies: Map<string, RigidBody>;
    airFriction: number;
    constructor(airFriction: number) {
        this.rigidBodies = new Map<string, RigidBody>();
        this.airFriction = airFriction;
    }

    update(deltaTime: number) {
        for (const body of this.rigidBodies.values()) {
            body.update(deltaTime)
        }
    }

    getRigidBodyByLabel(label: string): RigidBody | null {
        return this.rigidBodies.get(label) || null;
    }

    getRigidBodyInArea(pos1: Vector2, pos2: Vector2) {
        const result: RigidBody[] = [];
        for (const body of this.rigidBodies.values()) {
            if (body.position.x > pos1.x && body.position.x < pos2.x && body.position.y > pos1.y && body.position.y < pos2.y) {
                result.push(body);
            }
        }
        return result;
    }

    addrigidbody(rigidbody: RigidBody) {
        rigidbody.airFriction = this.airFriction
        this.rigidBodies.set(rigidbody.label, rigidbody);
    }

    exportAllBodies(): Record<string, any> {
        const bodiesExport: Record<string, any> = {};
        for (const [label, body] of this.rigidBodies) {
            bodiesExport[label] = body.toSerializable();
        }
        return bodiesExport;
    }

    importBodies(bodiesExport: Record<string, any>): void {
        for (const label in bodiesExport) {
            if (bodiesExport.hasOwnProperty(label)) {
                const data = bodiesExport[label];
                const rigidbody = RigidBody.fromSerializable(data);
                this.addrigidbody(rigidbody);
            }
        }
    }
}

const Engine = new PhysicsEngine(1)

export {
    Vector2,
    RigidBody,
    Engine
}