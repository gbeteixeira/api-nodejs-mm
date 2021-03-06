import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from "uuid";

import { classToPlain, Expose } from "class-transformer";

@Entity("sectors")
class Sector {

    @PrimaryColumn({ type: "uuid" })
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Sector };