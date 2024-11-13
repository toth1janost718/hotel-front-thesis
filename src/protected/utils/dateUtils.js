
export function getStartOfWeek(date) {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return startOfWeek;
}

export function getWeekDays(startDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        days.push(day);
    }
    return days;
}


export function formatDateRange(startDate, endDate) {
    const options = { month: 'long', day: 'numeric' };
    const start = startDate.toLocaleDateString('hu-HU', options);
    const end = endDate.toLocaleDateString('hu-HU', options);
    return `${start} - ${end}`;
}
