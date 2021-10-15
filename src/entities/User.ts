import { Exclude } from "class-transformer";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import { v4 as uuid } from "uuid";
import { Sector } from "./Sector";

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: "uuid" })
    sector_id: string;

    @Column()
    admin: boolean;

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

export { User };
