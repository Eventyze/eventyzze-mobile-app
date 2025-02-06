export const formatDate = (date:any) => {
const parts = date.split(" ");
const formattedDate = `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
return formattedDate
}