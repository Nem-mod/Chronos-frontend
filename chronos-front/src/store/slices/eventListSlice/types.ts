import { Calendar } from '../calendarListSlice/types.ts';

export enum FrequencyEnum {
    DAILY = `DAILY`,
    WEEKLY = `WEEKLY`,
    MONTHLY = `MONTHLY`,
    YEARLY = `YEARLY`,
}

export enum PriorityEnum {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}


export type TaskSettings = {
    isCompleted: boolean
    priority: PriorityEnum

}

export type RecurrenceSettings = {
    interval: number
    isNeverStop: boolean
    frequency: FrequencyEnum
    count?: number
    until?: Date
    byHour?: number[]
    byDay?: number[]
    byMonth?: number[]
    additionalDates?: Date[]
    exceptionDates?: Date[]
}

export type Event = {
    calendar: (string | Calendar)
    name: string
    description?: string
    timezone: string
    isAllDay: boolean
    start?: Date | string
    end?: Date | string
    taskSettings?: TaskSettings
    recurrenceSettings?: RecurrenceSettings
    _id?: string
    color?: string

    //
    // "calendar": "65f98852a9860b27a10b4f13",
    // "name": "Fiftheenth event",
    // "isAllDay": true,
    // "timezone": "Europe/Kyiv",
    // "start": "2022-12-10",
    // "end": "2022-12-11",
    // "recurrenceSettings": {
    // "frequency": "DAILY",
    //     "interval": 2,
    //     "isNeverStop": false,
    //     "count": 5,
    //     "byDay": [1, 2]
}