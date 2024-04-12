export const getFormattedDate = (date: string) => {
   return new Date(Date.parse(date)).toLocaleDateString();
};

export const getTimeFromDate = (date: string) => {
   const formattedDate = new Date(Date.parse(date))
   const hours = ("0" + formattedDate.getHours()).slice(-2)
   const minutes = ("0" + formattedDate.getMinutes()).slice(-2)

   return `${hours}:${minutes}`
}