import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("machines")
class Machine {

    @PrimaryColumn({ type: "uuid" })
    readonly id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @Column({ type: "uuid" })
    sector_id: string;

    @Column()
    reports: string;

    @Column()
    status: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

export { Machine };