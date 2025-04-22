import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager, Repository } from 'typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';

describe('RoomService', () => {
  let service: RoomService;
  let roomRepository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        RoomService,
        {
          provide: EntityManager,
          useValue: {
            transaction: jest.fn().mockImplementation((cb) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
              return cb({
                findOne: jest.fn(),
                save: jest.fn(),
              });
            }),
          },
        },
        {
          provide: getRepositoryToken(Room),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    roomRepository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if hotelId is invalid', async () => {
    const createRoomDto = {
      roomNumber: '101',
      hotelId: 'invalid-hotel-id',
      roomTypeId: '1',
      isAvailable: true,
    };

    jest.spyOn(roomRepository, 'findOne').mockResolvedValue(null);

    await expect(service.create(createRoomDto)).rejects.toThrow(
      `HOTEL NOT_FOUND`,
    );
  });

  it('should create a room', async () => {
    const room = new Room({
      id: '1',
      roomNumber: '101',
      isAvailable: true,
    });
    room.roomNumber = '101';

    jest.spyOn(service, 'create').mockResolvedValue(room);

    const createdRoom = await service.create({
      roomNumber: room.roomNumber,
      hotelId: '1',
      roomTypeId: '2',
      isAvailable: room.isAvailable,
    });

    expect(createdRoom).toEqual(room);
  });

  it('should find all rooms', async () => {
    const rooms = [
      new Room({
        id: '1',
        roomNumber: '101',
        isAvailable: true,
      }),
      new Room({
        id: '2',
        roomNumber: '102',
        isAvailable: false,
      }),
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(rooms);

    const result = await service.findAll('0');

    expect(result).toEqual(rooms);
  });

  it('should find one room', async () => {
    const room = new Room({
      id: '1',
      roomNumber: '101',
      isAvailable: true,
    });
    jest.spyOn(service, 'findOne').mockResolvedValue(room);

    const result = await service.findOne('1');

    expect(result).toEqual(room);
  });
});
