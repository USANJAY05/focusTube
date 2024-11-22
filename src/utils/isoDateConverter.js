function convertDate(isoDate) {
    // Create a Date object from the ISO date string
    const date = new Date(isoDate);
  
    // Get day, month, year, hours, and minutes
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Zero-padding minutes
  
    // Return formatted date string
    return `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
  }
export default convertDate