import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';
import { Room } from '../room/entities/room.entity';
import { isToday } from 'date-fns';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly entityManager: EntityManager) {}
  /**
   * This method is called at 2PM to make Rooms available.
   * It checks for available rooms in the hotel.
   */

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async handleCronAvailableRooms() {
    // Logic to check available rooms

    const response = await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const unAvailableRooms = await transactionalEntityManager.find(Room, {
          where: { isAvailable: false },
          relations: ['bookings'],
        });

        const rooms = unAvailableRooms.filter((room) => {
          const bookings = room.bookings;
          const isRoomAvailable = bookings.every((booking) => {
            const bookingCheckOutDate = new Date(booking.checkOutDate);

            return (
              isToday(bookingCheckOutDate) &&
              booking.id === room.activeBookingId
            );
          });
          return isRoomAvailable;
        });
        for (const room of rooms) {
          room.isAvailable = true;
          room.activeBookingId = null;
          await transactionalEntityManager.save(Room, room);
        }

        return rooms;
      },
    );
    // Your logic to check available rooms goes here
    // For example, you can query the database for available rooms

    this.logger.debug('Checking available rooms...', { response });

    return response;
  }

  @Cron(CronExpression.EVERY_DAY_AT_3PM)
  async handleCronUnAvailableRooms() {
    // Logic to check un-available rooms and assign them with active booking

    const response = await this.entityManager.transaction(
      async (transactionalEntityManager) => {
        const availableRooms = await transactionalEntityManager.find(Room, {
          where: { isAvailable: true },
          relations: ['bookings'],
        });

        const rooms = availableRooms.filter((room) => {
          const bookings = room.bookings;
          const isRoomAvailable = bookings.some((booking) => {
            const bookingCheckInDate = new Date(booking.checkInDate);

            return isToday(bookingCheckInDate);
          });
          return isRoomAvailable;
        });
        for (const room of rooms) {
          room.isAvailable = false;
          room.activeBookingId = room.bookings[0].id;
          await transactionalEntityManager.save(Room, room);
        }

        return rooms;
      },
    );

    this.logger.debug('Checking rooms assigned...', { response });

    return response;
  }
}
