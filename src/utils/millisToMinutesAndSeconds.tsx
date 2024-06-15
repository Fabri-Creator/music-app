const millisToMinutesAndSeconds = (millis: number) => {
    const hours = Math.floor(millis / 3600000);
    const minutes = Math.floor((millis % 3600000) / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
export default millisToMinutesAndSeconds