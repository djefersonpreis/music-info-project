import { Band } from 'src/bands/entities/band.entity';
import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

@Entity()
export class Music extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 400 })
    image_url: string;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    release_date: string;

    @ManyToMany(() => Band)
    @JoinTable()
    bands: Band[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}