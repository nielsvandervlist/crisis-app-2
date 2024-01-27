export function uploadTime(date) {
    let today = new Date()
    let uploaded = new Date(date)

    today = today.getTime()
    uploaded = uploaded.getTime()

    let uploadedSince = today - uploaded

    const seconds = Math.floor(uploadedSince / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (hours <= 1) {
        return `${minutes} ${minutes === 1 ? 'minuut' : 'minuten'} geleden`
    }
    if (days < 1) {
        return hours + ' uur geleden'
    }

    return `${days} ${days === 1 ? 'dag' : 'dagen'} geleden`
}

export function uppercaseLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
