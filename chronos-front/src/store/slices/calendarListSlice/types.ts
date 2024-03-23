export type Calendar = {
    _id: string,
    name: string,
    description: string,
    timezone: string,
    users: {
        owners: [],
        guests: []
    }
}

export type RemindSettings = {
    secondsBefore: number[]
}

export type VisibilitySettings = {
    isVisible: boolean
}

export type CalendarEntry = {
    _id: string
    calendar: Calendar
    remindSettings: RemindSettings
    visibilitySettings: VisibilitySettings
}
