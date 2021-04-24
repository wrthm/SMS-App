const convertDaysToArray = (raw_days: number): string[] => {
    const daysLookup = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun']
    const daysArray: string[] = []
    for (let i = 0; i < daysLookup.length; ++i) {
        if (raw_days >> i & 1) {
            daysArray.push(daysLookup[i])
        }
    }
    return daysArray
}

export { convertDaysToArray }