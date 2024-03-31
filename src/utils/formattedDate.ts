export const getFormattedDate = (date: string) => {
   return new Date(Date.parse(date)).toLocaleDateString();
};

export const getTimeFromDate = (date: string) => {
   const formattedDate = new Date(Date.parse(date) * 1000)

   return `${formattedDate.getHours()}:${formattedDate.getMinutes().toString().substring(-2)}`
}