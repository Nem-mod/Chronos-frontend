export type CalendarMembers = {
    owners: [],
    guests: []

}
export type Calendar = {
    _id: string,
    name: string,
    description: string,
    timezone: string,
    users: CalendarMembers
}

export type RemindSettings = {
    secondsBefore: number[]
}

export type VisibilitySettings = {
    isVisible: boolean,
    color: string
}

export type CalendarEntry = {
    _id: string
    calendar: Calendar
    remindSettings: RemindSettings
    visibilitySettings: VisibilitySettings
}
