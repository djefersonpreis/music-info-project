import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { Singer } from '../../singers/entities/singer.entity';
import { Band } from '../../bands/entities/band.entity';
import { Music } from 'src/musics/entities/music.entity';

@Entity()
export class Album extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 400 })
    image_url: string;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    release_date: string;

    @OneToOne(() => Singer)
    @JoinColumn()
    public singer: Singer;

    @OneToOne(() => Band)
    @JoinColumn()
    public band: Band;

    @ManyToMany(() => Music)
    @JoinTable()
    Music: Music[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}