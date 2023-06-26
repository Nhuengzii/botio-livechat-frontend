const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

const getFormattedDate = (timestamp: number): string => {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
  
    if (
      currentDate.getDate() === messageDate.getDate() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getFullYear() === messageDate.getFullYear()
    ) {
      return 'วันนี้';
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'Asia/Bangkok',
      };
      return messageDate.toLocaleDateString('th-TH', options);
    }
};



export { formatTimestamp, getFormattedDate }